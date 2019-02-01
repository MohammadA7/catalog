import fake
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from modules import User, Base, Category, Item
import random

engine = create_engine('postgresql:///catalog')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()
users = []

for _ in range(3):
    user = User(
        name=fake.name(),
        email=fake.email())
    user.hash_password("letmein")
    session.add(user)
    session.commit()
    users.append(user)

images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    "http://flask.pocoo.org/docs/1.0/_static/flask.png",
    "https://redislabs.com/wp-content/themes/redislabs/assets/images/redis-logo-stack.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png"
]
for _ in range(10):
    category = Category(name=fake.company())
    session.add(category)
    session.commit()
    for _ in range(100):
        item = Item(
            name=fake.name(),
            description=fake.text(),
            image_path=images[random.randint(0, len(images)-1)],
            price=random.randint(0, 99999),
            rating=random.uniform(0, 5.0),
            category=category,
            user_id=users[random.randint(0, 2)].id)
        session.add(item)
        session.commit()
