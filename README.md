# Item Catalog Application

This project is a web application that populates categories and their items, as well as provide a user authentication system. Users will have the ability to post, edit and delete their own items.

## Technologies used

* React (frontend)
* Flask (backend)
* Redis (for rate limiting users requests)
* OAuth and JWT authentication (OAuth2 is implemented using Google API)
* Postgresql

## Getting Startedcd

### Prerequisites

* Virtualization software such as VirtualBox, VMware, etc.
* Vagrant

### Installing

* Clone the repo `git clone https://github.com/MohammadA7/catalog.git`
* Cd to project directory `cd catalog`
* Run `vagrant up` (it will take a lot of time)
* Then run `vagrant ssh` (you will be inside the VM now)
* Cd to `/vagrant/catalog-backend`
* If you want to generate fake data run `python faker.py`

**Note that before you can run the backend you have to provide the client_secret.json for google OAuth**

### Using Google OAuth Login

To get the Google login working there are a few additional steps:

* Go to Google Dev Console
* Sign up or login if prompted
* Go to credentials
* Select create crendentials > OAuth Client ID
* Select web application
* Enter name item catalog
* Authorized javaScript origins = ['http://localhost:5000', 'http://localhost:8000']
* Authorized redirect URIs = 'http://localhost:8000/'
* Select create
* Copy the Client ID and paste it into the .env.example as REACT_APP_GOOGLE_CLINET_ID variable then rename the file to .env
* On the console select download json
* Rename JSON file to exactly `client_secret.json`
* Place JSON file in catalog-backend directory

* Then run the backend using `python project.py`
* in another shell ssh again then cd `vagrant/catalog-frontend`
* Run the frontend `serve -s build -p 8000`

Now you can access frontend on <http://localhost:8000>
