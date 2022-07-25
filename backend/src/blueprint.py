"""Blueprints"""
from flask import Blueprint
from routes.bioinformatic_tools import bioinfo_tools_blueprint
from routes.statistic_tools import statistic_tools_blueprint
from routes.machine_learning_tools import machine_learning_blueprint
from routes.advanced_search import search_blueprint
from routes.tools import tools_blueprint
from routes.profile import profile_blueprint
from routes.database import database_blueprint


api_blueprint = Blueprint('api', __name__)

api_blueprint.register_blueprint(bioinfo_tools_blueprint)
api_blueprint.register_blueprint(statistic_tools_blueprint)
api_blueprint.register_blueprint(machine_learning_blueprint)
api_blueprint.register_blueprint(search_blueprint)
api_blueprint.register_blueprint(tools_blueprint)
api_blueprint.register_blueprint(profile_blueprint)
api_blueprint.register_blueprint(database_blueprint)