from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
 
from modules import User, Base, Category, Item

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



#Menu for UrbanBurger
category1 = Category(name = "web development")

session.add(category1)
session.commit()

item1 = Item(name = "The Complete Web Developer Course 2.0", 
    description = "Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python, MySQL & more!", 
    url = "https://www.udemy.com/the-complete-web-developer-course-2/", price = "3299", rating = "4.5", category = category1)

session.add(item1)
session.commit()


item2 = Item(name = "Fullstack Advanced React and GraphQL", 
    description = "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.", 
    url = "https://advancedreact.com/", price = "8900",rating = "0", category = category1)

session.add(item2)
session.commit()

item3 = Item(name = "JavaScript: Understanding the Weird Parts", 
    description = "An advanced JavaScript course for everyone! Scope, closures, prototypes, 'this', build your own framework, and more.", 
    url = "https://www.udemy.com/understand-javascript/", price = "2899", rating = "4.7", category = category1)

session.add(item3)
session.commit()


item4 = Item(name = "The Complete Web Developer Course 2.0", 
    description = "Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python, MySQL & more!", 
    url = "https://www.udemy.com/the-complete-web-developer-course-2/", price = "3299", rating = "4.5", category = category1)

session.add(item4)
session.commit()


item5 = Item(name = "Fullstack Advanced React and GraphQL", 
    description = "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.", 
    url = "https://advancedreact.com/", price = "8900",rating = "0", category = category1)

session.add(item5)
session.commit()


item6 = Item(name = "JavaScript: Understanding the Weird Parts", 
    description = "An advanced JavaScript course for everyone! Scope, closures, prototypes, 'this', build your own framework, and more.", 
    url = "https://www.udemy.com/understand-javascript/", price = "2899", rating = "4.7", category = category1)

session.add(item6)
session.commit()


item7 = Item(name = "The Complete Web Developer Course 2.0", 
    description = "Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python, MySQL & more!", 
    url = "https://www.udemy.com/the-complete-web-developer-course-2/", price = "3299", rating = "4.5", category = category1)

session.add(item7)
session.commit()



#Menu for UrbanBurger
category2 = Category(name = "web development 2")

session.add(category2)
session.commit()

item1 = Item(name = "The Complete Web Developer Course 2.0", 
    description = "Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python, MySQL & more!", 
    url = "https://www.udemy.com/the-complete-web-developer-course-2/", price = "3299", rating = "4.5", category = category2)

session.add(item1)
session.commit()


item2 = Item(name = "Fullstack Advanced React and GraphQL", 
    description = "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.", 
    url = "https://advancedreact.com/", price = "8900",rating = "0", category = category2)

session.add(item2)
session.commit()

item3 = Item(name = "JavaScript: Understanding the Weird Parts", 
    description = "An advanced JavaScript course for everyone! Scope, closures, prototypes, 'this', build your own framework, and more.", 
    url = "https://www.udemy.com/understand-javascript/", price = "2899", rating = "4.7", category = category2)

session.add(item3)
session.commit()


item4 = Item(name = "The Complete Web Developer Course 2.0", 
    description = "Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python, MySQL & more!", 
    url = "https://www.udemy.com/the-complete-web-developer-course-2/", price = "3299", rating = "4.5", category = category2)

session.add(item4)
session.commit()


item5 = Item(name = "Fullstack Advanced React and GraphQL", 
    description = "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.", 
    url = "https://advancedreact.com/", price = "8900",rating = "0", category = category2)

session.add(item5)
session.commit()


item6 = Item(name = "JavaScript: Understanding the Weird Parts", 
    description = "An advanced JavaScript course for everyone! Scope, closures, prototypes, 'this', build your own framework, and more.", 
    url = "https://www.udemy.com/understand-javascript/", price = "2899", rating = "4.7", category = category2)

session.add(item6)
session.commit()


item7 = Item(name = "The Complete Web Developer Course 2.0", 
    description = "Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python, MySQL & more!", 
    url = "https://www.udemy.com/the-complete-web-developer-course-2/", price = "3299", rating = "4.5", category = category2)

session.add(item7)
session.commit()


print("added items!")

