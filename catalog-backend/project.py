#!/usr/bin/python3
from flask import Flask, jsonify, request, g
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from modules import Base, User, Category, Item
from flask.ext.httpauth import HTTPBasicAuth
import json

app = Flask(__name__)
auth = HTTPBasicAuth()

engine = create_engine('postgresql:///catalog')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/', methods=['GET'])
@app.route('/catalog/',  methods=['GET'])
def main():
    categories = session.query(Category).all()
    if len(categories):
        return jsonify([category.serialize for category in categories])
    else:
         return (jsonify({'data':'No categories found','error':'204'}), 204)


@app.route('/login', methods=['POST'])
def login(username_or_token, password):
    user_id = User.verify_auth_token(username_or_token)
    if user_id:
        user = session.query(User).filter_by(id = user_id).first()
        if not user:
            return False
    else:
        user = session.query(User).fillter_by(name = username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@app.route('/user', methods = ['POST'])
def new_user():
    name = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    if name is None or password is None or email is None:
        return (jsonify({'message':'Missing values','error':'400'}), 400)
    
    existing_user = session.query(User).filter_by(name = name).first()
    existing_email = session.query(User).filter_by(email = email).first()
    if existing_user is not None or existing_email is not None:
        return (jsonify({'message':'user already exists'}), 200)
    
    user = User(name = name, email = email)
    user.hash_password(password)
    session.add(user)
    session.commit()
    return (jsonify({'message':'user created successfully'}), 200)

@app.route('/catalog/<category>/items/', methods=['GET'])
def category(category):
    items = session.query(Item).filter_by(category_id = category).all()
    if len(items):
        return jsonify([item.serialize for item in items])
    else:
         return (jsonify({'data':'No items found in this category','error':'204'}), 204)

@app.route('/catalog/<category>/<item>/', methods=['GET'])
def item(category, item):
    item = session.query(Item).filter_by(category_id = category, id = item).first()
    if item:
        return jsonify([item.serialize])
    else:
         return (jsonify({'data':'No item found with this id','error':'204'}), 204)
    

@app.route('/catalog/<category>/create/', methods=['POST'])
def createItem(category):
    try:
        request_body = json.loads(request.data)
        item = Item(name = request_body.get('name'), 
                    description = request_body.get('description'),
                    price = request_body.get('price'),
                    rating = request_body.get('rating'),
                    url = request_body.get('url'),
                    category_id = request_body.get('category_id'))
        session.add(item)
        session.commit()
        return  (jsonify({'data':'Item has been created'}), 200)
    except SQLAlchemyError as error:
       return (jsonify({'data':'Can\'t create add this item',
            'error': error,
            'status-code': '202'
        }), 202)

@app.route('/catalog/<category>/<item>/', methods=['PUT'])
def editItem(category, item):
    item = session.query(Item).filter_by(category_id = category, id = item).one()
    
    id = request.args.get('id')
    name = request.args.get('name')
    description = request.args.get('description')
    price = request.args.get('price')
    rating = request.args.get('rating')
    url = request.args.get('url')
    category_id = request.args.get('category_id')

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
    if url:
        item.url = url
    if category_id:
        item.category_id = category_id
        
    session.commit()
    if item:
        return (jsonify({'data':'Item has been successfully updated'}), 200)
    else:
         return (jsonify({'data':'No item found with this id','error':'204'}), 204)
    
@app.route('/catalog/<category>/<item>/', methods=['DELETE'])
def deleteItem(category, item):
    item = session.query(Item).filter_by(category_id = category, id = item).delete()
    session.commit()
    print(item)
    if item:
        return jsonify((jsonify({'data':'Item has been successfully deleted'}), 200))
    else:
         return (jsonify({'data':'No item found with this id','error':'204'}), 204)    


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
