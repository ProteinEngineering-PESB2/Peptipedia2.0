"""Machine learning routes"""
import configparser

from flask import Blueprint, request

from peptipedia.modules.clustering_process import Clustering
from peptipedia.modules.encoding import Encoding

# from peptipedia.modules.alignment_clustering import alignment_clustering
from peptipedia.modules.pca_process import PCA
from peptipedia.modules.supervised_learning import SupervisedLearning
from peptipedia.modules.utils import Interface

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

machine_learning_blueprint = Blueprint("machine_learning_blueprint", __name__)


@machine_learning_blueprint.route("/encoding/", methods=["POST"])
def apply_encoding():
    """Encode a fasta file or text"""
    data, options, is_file = Interface(request).parse_with_options()
    code = Encoding(data, options, is_file, config)
    check = code.check
    if check["status"] == "error":
        return check
    result = code.process()
    return {"result": result}


@machine_learning_blueprint.route("/clustering/", methods=["POST"])
def api_clustering():
    """It performs clustering from a fasta file or text"""
    data, options, is_file = Interface(request).parse_with_options()
    clustering_object = Clustering(data, options, is_file, config)
    check = clustering_object.check
    if check["status"] == "error":
        return check
    result = clustering_object.process_by_options()
    return {"result": result}


@machine_learning_blueprint.route("/pca/", methods=["POST"])
def api_pca():
    """It performs a PCA from a stored dataframe"""
    pca = PCA(request.json["params"], config["folders"]["static_folder"])
    result, path = pca.apply_pca()
    return {"result": result, "path": path}


@machine_learning_blueprint.route("/supervised_learning/", methods=["POST"])
def api_supervised_learning():
    """It performs a Supervised learning from a csv file"""
    data, options, is_file = Interface(request).parse_with_options()
    sl_obj = SupervisedLearning(data, options, is_file, config)
    check = sl_obj.check
    if check["status"] == "error":
        return check
    result = sl_obj.run()
    job_path = sl_obj.job_path
    return {"result": result, "job_path": job_path}
