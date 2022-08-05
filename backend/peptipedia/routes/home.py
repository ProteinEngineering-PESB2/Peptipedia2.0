"""Home routes"""
import configparser

from flask import Blueprint

from peptipedia.modules.database import Database

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

db = Database(config)

home_blueprint = Blueprint("home_blueprint", __name__)


@home_blueprint.route("/get_general_counts/", methods=["GET"])
def get_general_counts():
    """Get count of peptides, activities, databases and last update"""
    res = db.get_general_counts()
    return res


@home_blueprint.route("/get_peptides_by_database/", methods=["GET"])
def get_peptides_by_database():
    """Gets count of peptides by database"""
    res = db.get_peptides_by_database()
    return res


@home_blueprint.route("/get_peptides_by_activity/", methods=["GET"])
def get_peptides_by_activity():
    """Gets count of peptides by activity"""
    res = db.get_peptides_by_activity()
    return res
