#!/usr/bin/python3
from flask import Flask, jsonify, request, g, make_response
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from modules import Base, User, Category, Item
from flask_httpauth import HTTPBasicAuth
from oauth2client.client import flow_from_clientsecrets, FlowExchangeError
from ratelimit import get_view_rate_limit, on_over_limit, ratelimit
from flask_cors import CORS
import json
import string
import httplib2
import random

app = Flask(__name__)
CORS(app)
auth = HTTPBasicAuth()
engine = create_engine('postgresql:///catalog')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()
CLIENT_ID = json.loads(open('client_secret.json', 'r').read())['web']
['client_id']


@app.after_request
def inject_x_rate_headers(response):
    limit = get_view_rate_limit()
    if limit and limit.send_x_headers:
        h = response.headers
        h.add('X-RateLimit-Remaining', str(limit.remaining))
        h.add('X-RateLimit-Limit', str(limit.limit))
        h.add('X-RateLimit-Reset', str(limit.reset))
    return response


@app.route('/', methods=['GET'])
@app.route('/catalog/',  methods=['GET'])
@ratelimit(limit=120, per=60 * 1)
def catalogs():
    categories = session.query(Category).all()
    if len(categories):
        return jsonify([category.serialize for category in categories])
    else:
        return (jsonify({'data': 'No categories found', 'error': '204'}), 204)


@app.route('/catalog/items/', methods=['GET'])
@ratelimit(limit=120, per=60 * 1)
def getItems():
    items = session.query(Item).order_by(Item.time_created.desc()).limit(20)
    if items:
        return jsonify([item.serialize for item in items])
    else:
        return (jsonify({'data': 'No items found',
                         'error': '204'}), 204)


@app.route('/gconnect')
@ratelimit(limit=120, per=60 * 1)
def login_with_google():
    # STEP 1 - Parse the auth code
    auth_code = request.json.get('auth_code')

    print("Step 1 - Complete, received auth code %s" % auth_code)
    # STEP 2 - Exchange for a token

    try:
        oauth_flow = flow_from_clientsecrets('client_secret.json', scope='')
        oauth_flow.redirect_uri = 'postmessage'
        credentials = oauth_flow.step2_echange(auth_code)

    except FlowExchangeError:
        return (jsonify({'data': 'Failed to upgrade the authorization code.', 'error': 401}), 401)

    access_token = credentials.access_token
    url = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={}'.format(
        access_token)
    http = httplib2.Http()
    result = json.loads(http.request(url, 'GET')[1])

    if result.get('error'):
        response = make_response(json.dumps(result.get('error')), 500)
        response.headers['Content-Type'] = 'application/json'

    # Verify that the access token is used for the intended user.
    gplus_id = credentials.id_token['sub']
    if result['user_id'] != gplus_id:
        response = make_response(json.dumps(
            "Token's user ID doesn't match given user ID."), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    # Verify that the access token is valid for this app.
    if result['issued_to'] != CLIENT_ID:
        response = make_response(json.dumps(
            "Token's client ID does not match app's."), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    stored_credentials = login_session.get('credentials')
    stored_gplus_id = login_session.get('gplus_id')
    if stored_credentials is not None and gplus_id == stored_gplus_id:
        response = make_response(json.dumps(
            'Current user is already connected.'), 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    print("Step 2 Complete! Access Token : %s " % credentials.access_token)

    # STEP 3 - Find User or make a new one
    http = httplib2.Http()
    userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
    params = {'access_token': credentials.access_token, 'alt': 'json'}
    answer = requests.get(userinfo_url, params=params)

    data = answer.json()

    name = data['name']
    picture = data['picture']
    email = data['email']

    user = session.query(User).filter_by(email=email).first()
    if not user:
        user = User(name=name, email=email)
        session.add(user)
        session.commit()

    # STEP 4 - Make token
    token = user.generate_auth_token(600)

    # STEP 5 - Send back token to the client
    return jsonify({'token': token.decode('ascii')})


@auth.verify_password
def verify_password(username_or_token, password):
    user_id = User.verify_auth_token(username_or_token)
    if user_id:
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return False
    else:
        user = session.query(User).filter_by(name=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@app.route('/token')
@ratelimit(limit=120, per=60 * 1)
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify({'token': token.decode('ascii')})


@app.route('/register', methods=['POST'])
@ratelimit(limit=120, per=60 * 1)
def new_user():
    name = request.json.get('username').lower()
    password = request.json.get('password')
    email = request.json.get('email').lower()
    if name is None or password is None or email is None:
        return (jsonify({'data': 'Missing values', 'error': '400'}), 400)

    existing_user = session.query(User).filter_by(name=name).first()
    existing_email = session.query(User).filter_by(email=email).first()
    if existing_user is not None or existing_email is not None:
        return (jsonify({'data': 'user already exists'}), 200)

    user = User(name=name, email=email)
    user.hash_password(password)
    session.add(user)
    session.commit()
    return (jsonify({'data': 'user created successfully'}), 200)


@app.route('/catalog/<category>/items/', methods=['GET'])
@ratelimit(limit=120, per=60 * 1)
def getItemsWithCategoryID(category):
    items = session.query(Item).filter_by(category_id=category).all()
    if items:
        return jsonify([item.serialize for item in items])
    else:
        return (jsonify({'data': 'No items found in this category',
                         'error': '204'}), 204)


@app.route('/catalog/<category>/<item>/', methods=['GET'])
@ratelimit(limit=120, per=60 * 1)
def item(category, item):
    item = session.query(Item).filter_by(category_id=category, id=item).first()
    if item:
        return jsonify([item.serialize])
    else:
        return (jsonify({'data': 'No item found with this id',
                         'error': '204'}), 204)


@app.route('/catalog/<category>/create/', methods=['POST'])
@ratelimit(limit=120, per=60 * 1)
@auth.login_required
def createItem(category):
    try:
        name = request.json.get('name')
        description = request.json.get('description')
        price = int(request.json.get('price')) * 100
        rating = request.json.get('rating')
        image_path = request.json.get('image_path')
        category_id = category
        item = Item(name=name,
                    description=description,
                    price=price,
                    rating=rating,
                    image_path=image_path,
                    category_id=category_id,
                    user_id=g.user.id)
        session.add(item)
        session.commit()
        return (jsonify({'data': 'Item has been created'}), 200)
    except SQLAlchemyError as error:
        return (jsonify({'data': 'Can\'t create add this item',
                         'error': error,
                         'status-code': '202'
                         }), 202)


@app.route('/catalog/<category>/<item>/', methods=['PUT'])
@ratelimit(limit=120, per=60 * 1)
@auth.login_required
def editItem(category, item):
    item = session.query(Item).filter_by(category_id=category, id=item).one()

    if item:
        if g.user.id == item.user.id:
            id = item
            name = request.json.get('name')
            description = request.json.get('description')
            price = request.json.get('price')
            rating = request.json.get('rating')
            image_path = request.json.get('image_path')
            category_id = category

            if id:
                item.id = id
            if name:
                item.name = name
            if description:
                item.description = description
            if price:
                item.price = price
            if rating:
                item.rating = rating
            if image_path:
                item.image_path = image_path
            if category_id:
                item.category_id = category_id

            session.commit()
            return (jsonify({'data': 'Item has been successfully updated'}),
                    200)
        else:
            return (jsonify({'data': 'Unauthorized access'}), 401)
    else:
        return (jsonify({'data': 'No item found with this id',
                         'error': '204'}), 204)


@app.route('/catalog/<category>/<item>/', methods=['DELETE'])
@ratelimit(limit=120, per=60 * 1)
@auth.login_required
def deleteItem(category, item):
    item = session.query(Item).filter_by(category_id=category, id=item).one()

    if item:
        if g.user.id == item.user.id:
            item.delete()
            session.commit()
            return (jsonify({'data': 'Item has been successfully deleted'}),
                    200)
        else:
            return (jsonify({'data': 'Unauthorized access'}), 401)
    else:
        return (jsonify({'data': 'No item found with this id',
                         'error': '204'}), 204)


if __name__ == '__main__':
    app.debug = True
    app.config['SECRET_KEY'] = ''.join(random.choice(
        string.ascii_uppercase + string.digits) for x in xrange(32))
    app.run(host='0.0.0.0', port=5000)
