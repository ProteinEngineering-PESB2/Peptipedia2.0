from modules.alignment_module import alignment
from modules.msa_module import multiple_sequence_alignment
from modules.phisicochemical_module import modlamp_descriptor
from modules.characterizator import gene_ontology
from modules.codifications import codification
from modules.pfam_domain import pfam
from modules.frequency_analysis import frequency_analysis

from flask import Flask, request
from flask_cors import CORS
import os

static_folder = "./files"
temp_folder = "./temp_files"
server = Flask(__name__, static_folder=static_folder)

CORS(server)

try:
    os.mkdir(temp_folder)
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
    align = alignment(data, temp_folder, static_folder, is_file, is_json)
    result = align.execute_blastp()
    return {"path": result.replace("./", "/")}

@server.route('/api/delete_file/', methods=["POST"])
def api_delete_file():
    post_data = request.json
    file = "." + post_data["data"]
    try:
        os.remove(file)
        return {"status": "success"}
    except Exception as e:
        return {"status": "Error", "exception": e}

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
    msa = multiple_sequence_alignment(data, temp_folder, is_file, is_json)
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

    modlamp = modlamp_descriptor(data, options, temp_folder, is_file, is_json)
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

    go = gene_ontology(data, options, temp_folder, is_file, is_json)
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
    pf = pfam(data, temp_folder, is_file, is_json)
    result = pf.process()
    return {"result": result}

@server.route('/api/codification/', methods=["POST"])
def api_codification():
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
    code = codification(data, options, temp_folder, is_file, is_json)
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
    frequency_object = frequency_analysis(data, temp_folder, is_file, is_json)
    result = frequency_object.exec_process()
    return {"result": result}

if __name__ == '__main__':
    server.run(host='0.0.0.0', port=8001)
