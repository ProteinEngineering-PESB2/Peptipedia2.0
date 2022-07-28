import configparser
from flask import request, Blueprint
from modules.database import database
##Reads config file and asign folder names. 
config = configparser.ConfigParser()
config.read("config.ini")

db = database(config)

home_blueprint = Blueprint('home_blueprint', __name__)

@home_blueprint.route('/get_general_counts/', methods=['GET'])
def get_general_counts():
    res = db.get_general_counts()
    return res
@home_blueprint.route('/get_peptides_by_database/', methods=['GET'])
def get_peptides_by_database():
    res = db.get_peptides_by_database()
    return res

@home_blueprint.route('/get_peptides_by_activity/', methods=['GET'])
def get_peptides_by_activity():
    res = db.get_peptides_by_activity()
    return res