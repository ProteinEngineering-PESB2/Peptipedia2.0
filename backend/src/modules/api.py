from modules.alignment_module import alignment
from modules.msa_module import multiple_sequence_alignment
from modules.phisicochemical_module import modlamp_descriptor
from modules.characterizator import gene_ontology
from modules.encoding import encoding
from modules.pfam_domain import pfam
from modules.frequency_analysis import frequency_analysis
from modules.clustering_process import unsupervised_algorithms
from modules.supervised_learning import supervised_algorithms, use_model
from modules.pca_process import pca_process
from modules.utils import interface
from modules.search import search
from modules.database import database
from modules.structure import structure
from modules.fasta_convertor import fasta_convertor
from flask import Flask, request
from flask_cors import CORS
from random import random
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
        print(request)
        data, is_json, is_file = interface.parse_information_no_options(request)
        align = alignment(data, temp_folder, static_folder, is_file, is_json, int(config["blast"]["max_sequences"]), int(config["blast"]["min_sequences"]))
        check = align.check
        if(check["status"] == "error"):
            return check
        result = align.execute_blastp()
        table_parsed = align.parse_response()
        aligns = align.get_alignments()
        return {"path": result.replace("./", "/"), "table": table_parsed, "aligns": aligns}

    @server.route('/api/msa/', methods=["POST"])
    def api_msa():
        print(request)
        data, is_json, is_file = interface.parse_information_no_options(request)
        msa = multiple_sequence_alignment(data, temp_folder, static_folder, is_file, is_json, int(config["msa"]["max_sequences"]), int(config["msa"]["min_sequences"]))
        check = msa.check
        if(check["status"] == "error"):
            return check
        result = msa.execute_clustalo()
        return {"result": result}

    ###Characterization###
    @server.route('/api/phisicochemical/', methods=["POST"])
    def api_phisicochemical():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        modlamp = modlamp_descriptor(data, options, temp_folder, is_file, is_json, int(config["physicochemical"]["max_sequences"]), int(config["physicochemical"]["min_sequences"]))
        check = modlamp.check
        if(check["status"] == "error"):
            return check
        result = modlamp.execute_modlamp()
        return {"result": result}

    @server.route('/api/gene_ontology/', methods=["POST"])
    def api_gene_ontology():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        go = gene_ontology(data, options, temp_folder, is_file, is_json, int(config["gene_ontology"]["max_sequences"]), int(config["gene_ontology"]["min_sequences"]))
        check = go.check
        if(check["status"] == "error"):
            return check
        result = go.process()
        if (len(result) == 0):
            return {"status": "error", "description": "There's no significant results for this sequences"}
        return {"result": result}

    @server.route('/api/pfam/', methods=["POST"])
    def api_pfam():
        data, is_json, is_file = interface.parse_information_no_options(request)
        pf = pfam(data, temp_folder, is_file, is_json, int(config["pfam"]["max_sequences"]), int(config["pfam"]["min_sequences"]))
        check = pf.check
        if(check["status"] == "error"):
            return check
        result = pf.process()
        if(len(result) == 0):
            return {"status": "error", "description": "There's no significant results for this sequences"}
        return {"result": result}

    @server.route('/api/frequency/', methods=["POST"])
    def api_frequency():
        data, is_json, is_file = interface.parse_information_no_options(request)
        frequency_object = frequency_analysis(data, temp_folder, is_file, is_json, int(config["frequency"]["max_sequences"]), int(config["frequency"]["min_sequences"]))
        check = frequency_object.check
        if(check["status"] == "error"):
            return check
        result = frequency_object.exec_process()
        return {"result": result}

    ###Encoding###
    @server.route('/api/encoding/', methods=["POST"])
    def api_encoding():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        code = encoding(data, options, static_folder, temp_folder, is_file, is_json, int(config["encoding"]["max_sequences"]), int(config["encoding"]["min_sequences"]), path_aa_index)
        check = code.check
        if(check["status"] == "error"):
            return check
        result = code.process()
        return {"result": result}

    ###Clustering###
    @server.route('/api/clustering/', methods=["POST"])
    def api_clustering():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        clustering_object = unsupervised_algorithms(data, options, static_folder, temp_folder, is_file, is_json, int(config["clustering"]["max_sequences"]), int(config["clustering"]["min_sequences"]), path_aa_index)
        check = clustering_object.check
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
        check = sl.check
        if(check["status"] == "error"):
            return check
        result = sl.run()
        job_path = sl.job_path
        return {"result": result, "job_path": job_path}

    @server.route('/api/use_model/', methods=["POST"])
    def api_use_model():
        data, options, is_json, is_file = interface.parse_information_with_options(request)
        use = use_model(data, options, static_folder, temp_folder, is_file, is_json, int(config["use_model"]["max_sequences"]), int(config["use_model"]["min_sequences"]), path_aa_index)
        check = use.check
        if(check["status"] == "error"):
            return check
        prediction = use.get_prediction()
        return {"result": prediction}

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
        return result

    @server.route('/api/database_list/', methods=["GET"])
    def api_db_list():
        result = db.get_all_databases()
        return {"result": result}

    @server.route('/api/activity_list/', methods=["GET"])
    def api_activity_list():
        result = db.get_all_activities()
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

    @server.route('/api/get_db_from_peptide/<idpeptide>', methods=["GET"])
    def api_get_db_from_peptide(idpeptide):
        result = db.get_db_from_peptide(idpeptide)
        return {"result": result}

    @server.route('/api/get_structure/<idpeptide>', methods=["GET"])
    def api_get_structure(idpeptide):
        uniprot = db.get_uniprot(idpeptide)
        if uniprot:
            struct = structure(static_folder)
            res_structure = struct.get_alphafold(uniprot)
            res_sequence = struct.get_sequence(uniprot)
            if(res_structure["status"] == "success" and res_sequence["status"] == "success"):
                path_sequence = res_sequence["path"]
                f = open(path_sequence, "r")
                fasta_text = f.read()
                f.close()
                id_fasta = fasta_text.split("\n")[0].split(" ")[0]
                seq_fasta = "\n".join(fasta_text.split("\n")[1:])
                fasta_text = id_fasta+"\n"+seq_fasta
                info = db.get_info_from_peptide(idpeptide)
                sequence = info[0]["sequence"]
                request = {}
                data = fasta_text + ">" + idpeptide + "\n" + sequence
                is_json = True
                is_file = False
                msa = multiple_sequence_alignment(data, temp_folder, static_folder, is_file, is_json, int(config["msa"]["max_sequences"]), int(config["msa"]["min_sequences"]))
                alignment = msa.execute_clustalo()
                equal_res = []
                similar_res = []
                different_res = []
                subject = alignment[0]["sequence"]
                query = alignment[1]["sequence"]
                a = 0
                for index, i in enumerate(subject):
                    if i != "-":
                        if i == query[index]:
                            equal_res.append(a)
                        elif (i != query[index] and query[index] != "-"):
                            similar_res.append(a)
                        else:
                            different_res.append(index)
                        a += 1
                return {"status": "success", "path": res_structure["path"], "fasta": res_sequence["path"], "uniprot_id": uniprot, "alignment": alignment, "equal_res": equal_res, "similar_res": similar_res, "different_res": different_res}
            else:
                return {"status": "error", "Description": "Structure not found"}
        return {"status": "error", "Description": "Structure not found"}
    @server.route('/api/fasta_convertor/', methods=["POST"])
    def api_fasta_convertor():
        text = request.json["data"]
        limit = int(config["fasta_convertor"]["length"])
        f_convert = fasta_convertor(static_folder, text, limit)
        fasta_text = f_convert.convert()
        fasta_path = f_convert.save_file()
        return {"path": fasta_path, "text": fasta_text}

    @server.route('/api/get_db_statistics/', methods=["GET"])
    def api_get_db_statistics():
        res = db.get_db_statistics()
        return res

    @server.route('/api/get_all_act_statistics/', methods=["GET"])
    def api_get_all_act_statistics():
        res = db.get_all_act_statistics()
        return res

    @server.route('/api/get_specific_act_statistics/<idactivity>', methods=["GET"])
    def api_get_specific_act_statistics(idactivity):
        res = db.get_specific_act_statistics(idactivity)
        return res

    def get_server(self):
        return server