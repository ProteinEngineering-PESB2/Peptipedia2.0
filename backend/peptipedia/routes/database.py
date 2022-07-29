"""Phisicochemical functions"""
import configparser

from flask import Blueprint

from peptipedia.modules.database import database

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

database_blueprint = Blueprint("database_blueprint", __name__)

db = database(config)


@database_blueprint.route("/get_general_act_statistic/", methods=["GET"])
def api_get_general_act_statistic():
    res = db.get_general_act_statistic()
    return res


@database_blueprint.route("/get_db_statistics/", methods=["GET"])
def api_get_db_statistics():
    res = db.get_db_statistics()
    return res


@database_blueprint.route("/get_all_act_statistics/", methods=["GET"])
def api_get_all_act_statistics():
    res = db.get_all_act_statistics()
    return res


@database_blueprint.route("/get_specific_act_statistics/<idactivity>", methods=["GET"])
def api_get_specific_act_statistics(idactivity):
    res = db.get_specific_act_statistics(idactivity)
    return res


@database_blueprint.route("/get_tree/", methods=["GET"])
def api_get_tree():
    res = db.get_tree()
    return res
