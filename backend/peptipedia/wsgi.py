"""Wsgi"""
import os

from flask import Flask
from flask_cors import CORS

from peptipedia.blueprint import api_blueprint
from peptipedia.modules.utils import Folders

f = Folders("config.ini")
f.create_folders()

app = Flask(
    __name__,
    static_url_path="/files",
    static_folder=os.path.realpath(f.get_static_folder()),
)
# Cors
CORS(app)

app.register_blueprint(api_blueprint, url_prefix="/api")

if __name__ == "__main__":
    app.run()
