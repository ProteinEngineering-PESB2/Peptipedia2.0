"""Phisicochemical functions"""
import configparser

from flask import Blueprint, request

from peptipedia.modules.database import database
from peptipedia.modules.search import search
from peptipedia.modules.utils import Interface

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

search_blueprint = Blueprint("search_blueprint", __name__)

db = database(config)


@search_blueprint.route("/count/", methods=["POST"])
def api_count():
    search_obj = search(request.json)
    res = search_obj.verify_query()
    if res["status"] == "error":
        return res
    where, limit, offset = search_obj.parse_search()
    result = db.count_peptides(where)
    return result


@search_blueprint.route("/search/", methods=["POST"])
def api_search():
    search_obj = search(request.json)
    where, limit, offset = search_obj.parse_search()
    result = db.select_peptides(where, limit, offset)
    return result


@search_blueprint.route("/database_list/", methods=["GET"])
def api_db_list():
    result = db.get_all_databases()
    return {"result": result}


@search_blueprint.route("/activity_list/", methods=["GET"])
def api_activity_list():
    result = db.get_all_activities()
    return {"result": result}


@search_blueprint.route("/gene_ontology_list/<sub_string>", methods=["GET"])
@search_blueprint.route("/gene_ontology_list/", methods=["GET"])
def api_go_list(sub_string=None):
    result = db.get_all_gene_ontology(sub_string, config["select"]["limit"])
    return {"result": result}


@search_blueprint.route("/pfam_list/<sub_string>", methods=["GET"])
@search_blueprint.route("/pfam_list/", methods=["GET"])
def api_pfam_list(sub_string=None):
    result = db.get_all_pfam(sub_string, config["select"]["limit"])
    return {"result": result}


@search_blueprint.route("/taxonomy_list/<sub_string>", methods=["GET"])
@search_blueprint.route("/taxonomy_list/", methods=["GET"])
def api_taxonomy_list(sub_string=None):
    result = db.get_all_taxonomy(sub_string, config["select"]["limit"])
    return {"result": result}


@search_blueprint.route("/min_max_parameters/", methods=["GET"])
def api_min_max_parameters():
    result = db.get_min_max_parameters()
    return {"result": result}
