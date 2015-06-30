#!/usr/bin/env python

from bottle import route, run, template, static_file
from optparse import OptionParser

@route('/')
def index():
    return static_file("index.html", root=".")

@route('/js/<name>')
def js(name):
    return static_file(name, root="js/")

@route("/css/<name>")
def css(name):
    return static_file(name, root="css/")

if __name__ == '__main__':
    parser = OptionParser()
    parser.add_option("-p", "--port", action="store", type=int, 
            default=9001, help="The port to run the server on")
    opts, args = parser.parse_args()
    run(host="localhost", port=opts.port)
