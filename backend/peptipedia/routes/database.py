"""Database routes"""
from flask import Blueprint
from sqlalchemy.orm import Session
from peptipedia.modules.database import Database

database_blueprint = Blueprint("database_blueprint", __name__)

db = Database()
session = Session()

@database_blueprint.route("/get_general_statistics/", methods=["GET"])
def api_get_general_statistics():
    return db.get_general_statistics()


@database_blueprint.route("/get_general_act_statistic/", methods=["GET"])
def api_get_general_act_statistic():
    """Get general activities count"""
    try:
        res = db.get_general_act_statistic()
        return res
    except Exception as e:
        print(e)
        session.rollback()

@database_blueprint.route("/get_db_statistics/", methods=["GET"])
def api_get_db_statistics():
    """Get the count of registers in every database"""
    try:
        res = db.get_db_statistics()
        return res
    except:
        session.rollback()
        return {"None": None}


@database_blueprint.route("/get_all_act_statistics/", methods=["GET"])
def api_get_all_act_statistics():
    """Get the count of registers in every activity"""
    try:
        res = db.get_all_act_statistics()
        return res
    except:
        session.rollback()
        return {"None": None}


@database_blueprint.route("/get_specific_act_statistics/<idactivity>", methods=["GET"])
def api_get_specific_act_statistics(idactivity):
    """Get the properties of every activity"""
    try:
        res = db.get_specific_act_statistics(idactivity)
        return res
    except:
        session.rollback()
        return {"None": None}


@database_blueprint.route("/get_tree/", methods=["GET"])
def api_get_tree():
    """Get tree (unused)"""
    try:
        res = db.get_tree()
        return res
    except:
        session.rollback()
        return {"None": None}
