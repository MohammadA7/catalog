import os, sys

sys.path.insert(0, '/var/www/catalog-backend')

def application(environ, start_response):
	from project import app as _application
	return _application(environ, start_response)
