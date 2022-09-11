"""Model using routes"""
import configparser

from flask import Blueprint, request
from peptipedia.modules.activity_prediction import ActivityPrediction
from peptipedia.modules.utils import Interface
from peptipedia.modules.database import Database

config = configparser.ConfigParser()
config.read("config.ini")
models_blueprint = Blueprint("models_blueprint", __name__)

db = Database(config)

@models_blueprint.route("/activity_prediction/", methods=["POST"])
def apply_activity_prediction():
    """Encode a fasta file or text"""
    data, options, is_file = Interface(request).parse_with_options()
    act_pred = ActivityPrediction(data, options, is_file, config, db)
    check = act_pred.check
    if check["status"] == "error":
        return check
    return act_pred.run_process()
    