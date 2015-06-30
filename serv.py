#!/usr/bin/env python

from bottle import route, run, template, static_file

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
    run(host="localhost", port=9001)
