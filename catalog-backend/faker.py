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
    "https://yt3.ggpht.com/a-/AAuE7mANQu0Jqo92dvIUUTie-5QqGlTKYK7M15bxwg=s900-mo-c-c0xffffffff-rj-k-no",
    "https://reason.org/wp-content/uploads/2018/01/guybentley.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Official_portrait_of_Mr_John_Whittingdale_crop_2.jpg/1200px-Official_portrait_of_Mr_John_Whittingdale_crop_2.jpg"]

for _ in range(10):
    category = Category(name=fake.company())
    session.add(category)
    session.commit()
    for _ in range(100):
        item = Item(
            name=fake.name(),
            description=fake.text(),
            image_path=images[random.randint(0, 2)],
            price=random.randint(0, 99999),
            rating=random.uniform(0, 5.0),
            category=category,
            user_id=users[random.randint(0, 2)].id)
        session.add(item)
        session.commit()
