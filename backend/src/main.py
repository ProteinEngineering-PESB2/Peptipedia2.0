from modules.alignment_module import alignment
from modules.msa_module import multiple_sequence_alignment
from modules.phisicochemical_module import modlamp_descriptor
from modules.characterizator import gene_ontology
from modules.encoding import encoding
from modules.pfam_domain import pfam
from modules.frequency_analysis import frequency_analysis
from modules.clustering_process import unsupervised_algorithms
from modules.pca_process import pca_process
from modules.database import database

from flask import Flask, request
from flask_cors import CORS

import os
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

static_folder = config["folders"]["static_folder"]
temp_folder =  config["folders"]["temp_folder"]
alignments = config["folders"]["alignments_folder"]
path_aa_index = config["folders"]["path_aa_index"]
server = Flask(__name__, static_folder=static_folder)
CORS(server)

try:
    os.mkdir(temp_folder)
except Exception as e:
    print(e)
try:
    os.mkdir(static_folder)
except Exception as e:
    print(e)
try:
    os.mkdir(static_folder+"/alignments/")
except Exception as e:
    print(e)

@server.route('/api/alignment/', methods=["POST"])
def api_alignment():
    post_data = request.json
    post_file = request.files
    is_json = False
    is_file = False
    if(post_data != None):
        data = post_data["data"]
        is_json = True
    elif(post_file != None):
        data = post_file["file"]
        is_file = True

    align = alignment(data, temp_folder, static_folder, is_file, is_json, int(config["blast"]["max_sequences"]), int(config["blast"]["min_sequences"]))
    check = align.get_check()
    if(check["status"] == "error"):
        return check
    result = align.execute_blastp()
    return {"path": result.replace("./", "/")}

@server.route('/api/msa/', methods=["POST"])
def api_msa():
    post_data = request.json
    post_file = request.files
    is_json = False
    is_file = False
    if(post_data != None):
        data = post_data["data"]
        is_json = True
    elif(post_file != None):
        data = post_file["file"]
        is_file = True

    msa = multiple_sequence_alignment(data, temp_folder, is_file, is_json, int(config["msa"]["max_sequences"]), int(config["msa"]["min_sequences"]))
    check = msa.get_check()
    if(check["status"] == "error"):
        return check
    result = msa.execute_clustalo()
    return {"result": result}

@server.route('/api/phisicochemical/', methods=["POST"])
def api_phisicochemical():
    if(request.json != None):
        post_data = request.json
        is_json = True
        is_file = False
        data = post_data["data"]
        options = post_data["options"]
    else:
        is_json = False
        is_file = True
        file = request.files
        data = file["file"]
        options = eval(file["options"].read().decode("utf-8"))

    modlamp = modlamp_descriptor(data, options, temp_folder, is_file, is_json, int(config["physicochemical"]["max_sequences"]), int(config["physicochemical"]["min_sequences"]))
    check = modlamp.get_check()
    if(check["status"] == "error"):
        return check
    result = modlamp.execute_modlamp()
    return {"result": result}

@server.route('/api/gene_ontology/', methods=["POST"])
def api_gene_ontology():
    if(request.json != None):
        post_data = request.json
        is_json = True
        is_file = False
        data = post_data["data"]
        options = post_data["options"]
    else:
        is_json = False
        is_file = True
        file = request.files
        data = file["file"]
        options = eval(file["options"].read().decode("utf-8"))

    go = gene_ontology(data, options, temp_folder, is_file, is_json, int(config["gene_ontology"]["max_sequences"]), int(config["gene_ontology"]["min_sequences"]))
    check = go.get_check()
    if(check["status"] == "error"):
        return check
    result = go.process()
    go.delete_file()
    return {"result": result}

@server.route('/api/pfam/', methods=["POST"])
def api_pfam():
    post_data = request.json
    post_file = request.files
    is_json = False
    is_file = False
    if(post_data != None):
        data = post_data["data"]
        is_json = True
    elif(post_file != None):
        data = post_file["file"]
        is_file = True

    pf = pfam(data, temp_folder, is_file, is_json, int(config["pfam"]["max_sequences"]), int(config["pfam"]["min_sequences"]))
    check = pf.get_check()
    if(check["status"] == "error"):
        return check
    result = pf.process()
    return {"result": result}

@server.route('/api/encoding/', methods=["POST"])
def api_encoding():
    if(request.json != None):
        post_data = request.json
        is_json = True
        is_file = False
        data = post_data["data"]
        options = post_data["options"]
    else:
        is_json = False
        is_file = True
        file = request.files
        data = file["file"]
        options = eval(file["options"].read().decode("utf-8"))

    code = encoding(data, options, static_folder, temp_folder, is_file, is_json, int(config["encoding"]["max_sequences"]), int(config["clustering"]["min_sequences"]), path_aa_index)
    check = code.get_check()
    if(check["status"] == "error"):
        return check
    result = code.process()
    return {"result": result}

@server.route('/api/frequency/', methods=["POST"])
def api_frequency():
    if(request.json != None):
        post_data = request.json
        is_json = True
        is_file = False
        data = post_data["data"]
    else:
        is_json = False
        is_file = True
        file = request.files
        data = file["file"]

    frequency_object = frequency_analysis(data, temp_folder, is_file, is_json, int(config["frequency"]["max_sequences"]), int(config["frequency"]["min_sequences"]))
    check = frequency_object.get_check()
    if(check["status"] == "error"):
        return check
    result = frequency_object.exec_process()
    return {"result": result}

@server.route('/api/clustering/', methods=["POST"])
def api_clustering():
    if(request.json != None):
        post_data = request.json
        is_json = True
        is_file = False
        data = post_data["data"]
        options = post_data["options"]
    else:
        is_json = False
        is_file = True
        file = request.files
        data = file["file"]
        options = eval(file["options"].read().decode("utf-8"))
    clustering_object = unsupervised_algorithms(data, options, static_folder, temp_folder, is_file, is_json, int(config["clustering"]["max_sequences"]), int(config["clustering"]["min_sequences"]), path_aa_index)

    check = clustering_object.get_check()
    if(check["status"] == "error"):
        return check
    result = clustering_object.process_by_options()
    return {"result": result}

@server.route('/api/pca/', methods=["POST"])
def api_pca():
    if(request.json != None):
        post_data = request.json
    params = post_data["params"]
    pca = pca_process(params, static_folder, temp_folder)
    result = pca.apply_pca()
    return {"result": result}

@server.route('/api/search/', methods=["POST"])
def api_search():
    db = database()
    result = db.select_peptides(min_length = 40, max_length = 110)
    return {"result": result}

if __name__ == '__main__':
    server.run(host='0.0.0.0', port=8001, debug=True)
