from modules.alignment_module import alignment
from modules.msa_module import multiple_sequence_alignment
from modules.phisicochemical_module import modlamp_descriptor
from modules.characterizator import gene_ontology
from modules.encoding import encoding
from modules.pfam_domain import pfam
from modules.frequency_analysis import frequency_analysis
from modules.clustering_process import unsupervised_algorithms
from modules.supervised_learning import supervised_algorithms, model, use_model
from modules.pca_process import pca_process
from modules.utils import interface
from modules.search import search
from modules.database import database

from flask import Flask, request
from flask_cors import CORS

import os
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

static_folder = config["folders"]["static_folder"]
temp_folder =  config["folders"]["temp_folder"]
alignments_folder = static_folder +"/"+ config["folders"]["alignments_folder"]
downloads_folder = static_folder +"/"+ config["folders"]["downloads_folder"]
results_folder = static_folder +"/"+ config["folders"]["results_folder"]
path_aa_index = config["folders"]["path_aa_index"]

db = database(config)
interface = interface()

try:
    os.mkdir(temp_folder)
except Exception as e:
    print(e)
try:
    os.mkdir(static_folder)
except Exception as e:
    print(e)
try:
    os.mkdir(alignments_folder)
    os.mkdir(downloads_folder)
    os.mkdir(results_folder)
except Exception as e:
    print(e)
if not os.path.isdir(path_aa_index):
    print(path_aa_index, "is not a folder")
    exit()

server = Flask(__name__, static_folder = os.path.realpath(static_folder))
CORS(server)

class api:
    ###Alignments###
    @server.route('/api/alignment/', methods=["POST"])
    def api_alignment():
        data, is_json, is_file = interface.parse_information_no_options(request)
        align = alignment(data, temp_folder, static_folder, is_file, is_json, int(config["blast"]["max_sequences"]), int(config["blast"]["min_sequences"]))
        check = align.get_check()
        if(check["status"] == "error"):
            return check
        result = align.execute_blastp()
        return {"path": result.replace("./", "/")}

    @server.route('/api/msa/', methods=["POST"])
    def api_msa():
        data, is_json, is_file = interface.parse_information_no_options(request)
        msa = multiple_sequence_alignment(data, temp_folder, static_folder, is_file, is_json, int(config["msa"]["max_sequences"]), int(config["msa"]["min_sequences"]))
        check = msa.get_check()
        if(check["status"] == "error"):
            return check
        result, distance_matrix = msa.execute_clustalo()
        return {"result": result, "distance_matrix": distance_matrix}

    ###Characterization###
    @server.route('/api/phisicochemical/', methods=["POST"])
    def api_phisicochemical():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        modlamp = modlamp_descriptor(data, options, temp_folder, is_file, is_json, int(config["physicochemical"]["max_sequences"]), int(config["physicochemical"]["min_sequences"]))
        check = modlamp.get_check()
        if(check["status"] == "error"):
            return check
        result = modlamp.execute_modlamp()
        return {"result": result}

    @server.route('/api/gene_ontology/', methods=["POST"])
    def api_gene_ontology():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        go = gene_ontology(data, options, temp_folder, is_file, is_json, int(config["gene_ontology"]["max_sequences"]), int(config["gene_ontology"]["min_sequences"]))
        check = go.get_check()
        if(check["status"] == "error"):
            return check
        result = go.process()
        if (result == []):
            return {"status": "error", "description": "No result for this sequences"}
        return {"result": result}

    @server.route('/api/pfam/', methods=["POST"])
    def api_pfam():
        data, is_json, is_file = interface.parse_information_no_options(request)
        pf = pfam(data, temp_folder, is_file, is_json, int(config["pfam"]["max_sequences"]), int(config["pfam"]["min_sequences"]))
        check = pf.get_check()
        if(check["status"] == "error"):
            return check
        result = pf.process()
        return {"result": result}

    @server.route('/api/frequency/', methods=["POST"])
    def api_frequency():
        data, is_json, is_file = interface.parse_information_no_options(request)
        frequency_object = frequency_analysis(data, temp_folder, is_file, is_json, int(config["frequency"]["max_sequences"]), int(config["frequency"]["min_sequences"]))
        check = frequency_object.get_check()
        if(check["status"] == "error"):
            return check
        result = frequency_object.exec_process()
        return {"result": result}

    ###Encoding###
    @server.route('/api/encoding/', methods=["POST"])
    def api_encoding():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        code = encoding(data, options, static_folder, temp_folder, is_file, is_json, int(config["encoding"]["max_sequences"]), int(config["clustering"]["min_sequences"]), path_aa_index)
        check = code.get_check()
        if(check["status"] == "error"):
            return check
        result = code.process()
        return {"result": result}

    ###Clustering###
    @server.route('/api/clustering/', methods=["POST"])
    def api_clustering():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        clustering_object = unsupervised_algorithms(data, options, static_folder, temp_folder, is_file, is_json, int(config["clustering"]["max_sequences"]), int(config["clustering"]["min_sequences"]), path_aa_index)
        check = clustering_object.get_check()
        if(check["status"] == "error"):
            return check
        result = clustering_object.process_by_options()
        return {"result": result}

    @server.route('/api/pca/', methods=["POST"])
    def api_pca():
        pca = pca_process(request.json["params"], static_folder, temp_folder)
        result, path = pca.apply_pca()
        return {"result": result, "path": path}

    ###Supervised learning###
    @server.route('/api/supervised_learning/', methods=["POST"])
    def api_supervised_learning():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        sl = supervised_algorithms(data, options, static_folder, temp_folder, is_file, is_json, int(config["supervised_learning"]["max_sequences"]), int(config["supervised_learning"]["min_sequences"]), path_aa_index)
        check = sl.get_check()
        if(check["status"] == "error"):
            return check
        result = sl.run()
        print(result)
        job_path = sl.job_path
        print(job_path)
        return {"result": result, "job_path": job_path}

    @server.route('/api/use_model/', methods=["POST"])
    def api_use_model():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        use = use_model(data, options, static_folder, temp_folder, is_file, is_json, int(config["clustering"]["max_sequences"]), int(config["clustering"]["min_sequences"]), path_aa_index)
        check = use.get_check()
        if(check["status"] == "error"):
            return check
        prediction = use.get_prediction()
        return {"result": prediction}


    @server.route('/api/publish_model/', methods=["POST"])
    def api_publish_model():
        post_data = request.json
        mod = model(db)
        mod.save_job(post_data)
        return {"status": "success"}

    @server.route('/api/list_models/', methods=["GET"])
    def api_list_models():
        mod = model(db)
        return {"result": mod.list_models()}


    ###Advanced search###
    @server.route('/api/count/', methods=["POST"])
    def api_count():
        search_obj = search(request.json)
        res = search_obj.verify_query()
        if res["status"] == "error":
            return res
        where, limit, offset = search_obj.parse_search()
        result = db.count_peptides(where)
        return result

    @server.route('/api/search/', methods=["POST"])
    def api_search():
        search_obj = search(request.json)
        where, limit, offset = search_obj.parse_search()
        result = db.select_peptides(where, limit, offset)
        print(result)
        return result

    @server.route('/api/database_list/', methods=["GET"])
    def api_db_list():
        result = db.get_all_databases()
        return {"result": result}

    @server.route('/api/gene_ontology_list/<sub_string>', methods=["GET"])
    @server.route('/api/gene_ontology_list/', methods=["GET"])
    def api_go_list(sub_string = None):
        result = db.get_all_gene_ontology(sub_string, config["select"]["limit"])
        return {"result": result}

    @server.route('/api/pfam_list/<sub_string>', methods=["GET"])
    @server.route('/api/pfam_list/', methods=["GET"])
    def api_pfam_list(sub_string = None):
        result = db.get_all_pfam(sub_string, config["select"]["limit"])
        return {"result": result}

    @server.route('/api/taxonomy_list/<sub_string>', methods=["GET"])
    @server.route('/api/taxonomy_list/', methods=["GET"])
    def api_taxonomy_list(sub_string = None):
        result = db.get_all_taxonomy(sub_string, config["select"]["limit"])
        return {"result": result}

    @server.route('/api/min_max_parameters/', methods = ["GET"])
    def api_min_max_parameters():
        result = db.get_min_max_parameters()
        return {"result": result}


    ###Profile
    @server.route('/api/get_go_from_peptide/<idpeptide>', methods=["GET"])
    def api_get_go_from_peptide(idpeptide):
        result = db.get_go_from_peptide(idpeptide)
        return {"result": result}

    @server.route('/api/get_pfam_from_peptide/<idpeptide>', methods=["GET"])
    def api_get_pfam_from_peptide(idpeptide):
        result = db.get_pfam_from_peptide(idpeptide)
        return {"result": result}

    @server.route('/api/get_tax_from_peptide/<idpeptide>', methods=["GET"])
    def api_get_tax_from_peptide(idpeptide):
        result = db.get_tax_from_peptide(idpeptide)
        return {"result": result}

    @server.route('/api/get_info_from_peptide/<idpeptide>', methods=["GET"])
    def api_get_info_from_peptide(idpeptide):
        result = db.get_info_from_peptide(idpeptide)
        return {"result": result}

    @server.route('/api/get_act_from_peptide/<idpeptide>', methods=["GET"])
    def api_get_act_from_peptide(idpeptide):
        result = db.get_act_from_peptide(idpeptide)
        return {"result": result}

    @server.route('/api/get_patent_from_peptide/<idpeptide>', methods=["GET"])
    def api_get_patent_from_peptide(idpeptide):
        result = db.get_patent_from_peptide(idpeptide)
        return {"result": result}


    def get_server(self):
        return server