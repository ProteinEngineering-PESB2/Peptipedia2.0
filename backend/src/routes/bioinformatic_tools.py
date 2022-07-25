"""Blast alignment functions"""
from flask import request, Blueprint
from modules.alignment_module import alignment
from modules.msa_module import multiple_sequence_alignment
from modules.gene_ontology import gene_ontology
from modules.pfam_domain import pfam
import configparser
from modules.utils import interface

##Reads config file and asign folder names. 
config = configparser.ConfigParser()
config.read("config.ini")

bioinfo_tools_blueprint = Blueprint('bioinfo_tools_blueprint', __name__)

@bioinfo_tools_blueprint.route('/alignment/', methods=['POST'])
def apply_alignment():
    data, is_json, is_file = interface.parse_information_no_options(request)
    align = alignment(data, is_file, is_json, config)
    if(align.check["status"] == "error"):
        return align.check
    result = align.execute_blastp()
    parsed = align.parse_response()
    if parsed["status"] == "error":
        return parsed
    aligns = align.get_alignments()
    return {"path": result.replace("./", "/"), "table": parsed, "aligns": aligns}

@bioinfo_tools_blueprint.route('/msa/', methods=['POST'])
def apply_msa():
    data, is_json, is_file = interface.parse_information_no_options(request)
    msa = multiple_sequence_alignment(data, is_file, is_json, config)
    check = msa.check
    if(check["status"] == "error"):
        return check
    result = msa.execute_clustalo()
    return {"result": result}

@bioinfo_tools_blueprint.route('/gene_ontology/', methods=['POST'])
def apply_gene_ontology():
    data, options, is_json, is_file = interface.parse_information_with_options(request)
    go = gene_ontology(data, options, is_file, is_json, config)
    check = go.check
    if(check["status"] == "error"):
        return check
    result = go.process()
    if (len(result) == 0):
        return {"status": "error", "description": "There's no significant results for this sequences"}
    return {"result": result}

@bioinfo_tools_blueprint.route('/pfam/', methods=['POST'])
def apply_pfam():
    data, is_json, is_file = interface.parse_information_no_options(request)
    pf = pfam(data, is_file, is_json, config)
    check = pf.check
    if(check["status"] == "error"):
        return check
    result = pf.process()
    if(len(result) == 0):
        return {"status": "error", "description": "There's no significant results for this sequences"}
    return {"result": result}