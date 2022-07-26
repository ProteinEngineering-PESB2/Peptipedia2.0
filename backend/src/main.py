"""main module"""
from flask import Flask
from flask_cors import CORS
from blueprint import api_blueprint
from modules.utils import folders
import os

f = folders("config.ini")
f.create_folders()

app = Flask(__name__, static_folder = os.path.realpath(f.get_static_folder()))
#Cors
CORS(app)

app.register_blueprint(api_blueprint, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port = 8001)