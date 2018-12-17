#!/usr/bin/python3
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from modules import Base, User, Category

app = Flask(__name__)

engine = create_engine('postgresql:///catalog')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/', methods=['GET'])
@app.route('/catalog/',  methods=['GET'])
def main():
    categories = session.query(Category).all()
    if categories:
        return jsonify([category.serialize for category in categories])
    else:
         return jsonify([category.serialize for category in categories])
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return "login"
    else:
        return "Login form"


@app.route('/catalog/<category>/items/')
def category(category):
    return "This is the page for the category {}".format(category)


@app.route('/catalog/<category>/<item>/')
def item(category, item):
    return "This is the page for the item {} in the category {}".format(item, category)

@app.route('/catalog/<category>/create/')
def createItem(category):
    return "This is the page for creating item in the category {}".format(category)

@app.route('/catalog/<category>/<item>/edit/')
def editItem(category, item):
    return "This is the page for editing item {} in the category {}".format(item, category)

@app.route('/catalog/<category>/<item>/delete/')
def deleteItem(category, item):
    return "This is the page for delete item {} in the category {}".format(item, category)


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
