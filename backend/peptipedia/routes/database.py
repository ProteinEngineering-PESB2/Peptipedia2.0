"""Database routes"""
import configparser

from flask import Blueprint
from sqlalchemy.orm import Session
from peptipedia.modules.database import Database

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

database_blueprint = Blueprint("database_blueprint", __name__)

db = Database(config)

@database_blueprint.route("/get_general_act_statistic/", methods=["GET"])
def api_get_general_act_statistic():
    """Get general activities count"""
    try:
        res = db.get_general_act_statistic()
    except:
        Session.rollback()
    return res


@database_blueprint.route("/get_db_statistics/", methods=["GET"])
def api_get_db_statistics():
    """Get the count of registers in every database"""
    try:
        res = db.get_db_statistics()
    except:
        Session.rollback()
    return res


@database_blueprint.route("/get_all_act_statistics/", methods=["GET"])
def api_get_all_act_statistics():
    """Get the count of registers in every activity"""
    try:
        res = db.get_all_act_statistics()
    except:
        Session.rollback()
    return res


@database_blueprint.route("/get_specific_act_statistics/<idactivity>", methods=["GET"])
def api_get_specific_act_statistics(idactivity):
    """Get the properties of every activity"""
    try:
        res = db.get_specific_act_statistics(idactivity)
    except:
        Session.rollback()
    return res


@database_blueprint.route("/get_tree/", methods=["GET"])
def api_get_tree():
    """Get tree (unused)"""
    try:
        res = db.get_tree()
    except:
        Session.rollback()
    return res
