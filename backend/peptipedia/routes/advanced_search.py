"""Advanced search routes"""
import configparser

from flask import Blueprint, request

from peptipedia.modules.database import Database
from peptipedia.modules.search import search
from sqlalchemy.orm import Session
##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

search_blueprint = Blueprint("search_blueprint", __name__)

db = Database(config)


@search_blueprint.route("/count/", methods=["POST"])
def api_count():
    """Counts the number of elements from a database query"""
    try:
        search_obj = search(request.json)
        res = search_obj.verify_query()
        if res["status"] == "error":
            return res
        where = search_obj.parse_search()[0]
        result = db.count_peptides(where)
    except:
        Session.rollback()
    return result


@search_blueprint.route("/search/", methods=["POST"])
def api_search():
    """Get the number of elements from a database query"""
    try:
        search_obj = search(request.json)
        where, limit, offset = search_obj.parse_search()
        result = db.select_peptides(where, limit, offset)
    except:
        Session.rollback()
    return result


@search_blueprint.route("/database_list/", methods=["GET"])
def api_db_list():
    """Get all the database names in peptipedia database"""
    try:
        result = db.get_all_databases()
    except:
        Session.rollback()
    return {"result": result}


@search_blueprint.route("/activity_list/", methods=["GET"])
def api_activity_list():
    """Gets all the activities in peptipedia database"""
    try:
        result = db.get_all_activities()
    except:
        Session.rollback()
    return {"result": result}


@search_blueprint.route("/gene_ontology_list/<sub_string>", methods=["GET"])
@search_blueprint.route("/gene_ontology_list/", methods=["GET"])
def api_go_list(sub_string=None):
    """Gets a list of gene ontology elements of 'limit' size"""
    try:
        result = db.get_all_gene_ontology(sub_string)
    except:
        Session.rollback()
    return {"result": result}


@search_blueprint.route("/pfam_list/<sub_string>", methods=["GET"])
@search_blueprint.route("/pfam_list/", methods=["GET"])
def api_pfam_list(sub_string=None):
    """Gets a list of pfam elements of 'limit' size"""
    try:
        result = db.get_all_pfam(sub_string)
    except:
        Session.rollback()
    return {"result": result}


@search_blueprint.route("/min_max_parameters/", methods=["GET"])
def api_min_max_parameters():
    """Gets the quantitative parameters for selects"""
    try:
        result = db.get_min_max_parameters()
    except:
        Session.rollback()
    return {"result": result}
