#!/home1/asquared/public_html/emojicanvas/emojicanvasenv/bin/python

from flup.server.fcgi import WSGIServer
from app import app as application

WSGIServer(application).run()