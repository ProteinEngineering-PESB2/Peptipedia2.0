"""Phisicochemical functions"""
from flask import request, Blueprint
from modules.encoding import encoding
from modules.clustering_process import unsupervised_algorithms
from modules.pca_process import pca_process
from modules.supervised_learning import supervised_algorithms, use_model
import configparser
from modules.utils import interface

##Reads config file and asign folder names. 
config = configparser.ConfigParser()
config.read("config.ini")

machine_learning_blueprint = Blueprint('machine_learning_blueprint', __name__)

@machine_learning_blueprint.route('/encoding/', methods=['POST'])
def apply_encoding():
    data, options, is_json, is_file = interface.parse_information_with_options(request)
    code = encoding(data, options, is_file, is_json, config)
    check = code.check
    if(check["status"] == "error"):
        return check
    result = code.process()
    return {"result": result}

###Clustering###
@machine_learning_blueprint.route('/clustering/', methods=["POST"])
def api_clustering():
    data, options, is_json, is_file = interface.parse_information_with_options(request)
    clustering_object = unsupervised_algorithms(data, options, is_file, is_json, config)
    check = clustering_object.check
    if(check["status"] == "error"):
        return check
    result = clustering_object.process_by_options()
    return {"result": result}

@machine_learning_blueprint.route('/pca/', methods=["POST"])
def api_pca():
    pca = pca_process(request.json["params"], config["folders"]["static_folder"])
    result, path = pca.apply_pca()
    return {"result": result, "path": path}


###Supervised learning###
@machine_learning_blueprint.route('/supervised_learning/', methods=["POST"])
def api_supervised_learning():
    data, options, is_json, is_file = interface.parse_information_with_options(request)
    sl = supervised_algorithms(data, options, is_file, is_json, config)
    check = sl.check
    if(check["status"] == "error"):
        return check
    result = sl.run()
    job_path = sl.job_path
    return {"result": result, "job_path": job_path}

@machine_learning_blueprint.route('/use_model/', methods=["POST"])
def api_use_model():
    data, options, is_json, is_file = interface.parse_information_with_options(request)
    use = use_model(data, options, is_file, is_json, config)
    check = use.check
    if(check["status"] == "error"):
        return check
    prediction = use.get_prediction()
    return {"result": prediction}