"""Blast alignment functions"""
import configparser

from flask import Blueprint, request

from peptipedia.modules.alignment_module import alignment
from peptipedia.modules.gene_ontology import gene_ontology
from peptipedia.modules.msa_module import multiple_sequence_alignment
from peptipedia.modules.pfam_domain import pfam
from peptipedia.modules.utils import Interface

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

bioinfo_tools_blueprint = Blueprint("bioinfo_tools_blueprint", __name__)


@bioinfo_tools_blueprint.route("/alignment/", methods=["POST"])
def apply_alignment():
    data, is_json, is_file = Interface(request).parse_without_options()
    align = alignment(data, is_file, is_json, config)
    if align.check["status"] == "error":
        return align.check
    result = align.execute_blastp()
    parsed = align.parse_response()
    if parsed["status"] == "error":
        return parsed
    aligns = align.get_alignments()
    return {"path": result.replace("./", "/"), "table": parsed, "aligns": aligns}


@bioinfo_tools_blueprint.route("/msa/", methods=["POST"])
def apply_msa():
    data, is_json, is_file = Interface(request).parse_without_options()
    msa = multiple_sequence_alignment(data, is_file, is_json, config)
    check = msa.check
    if check["status"] == "error":
        return check
    result = msa.execute_clustalo()
    return {"result": result}


@bioinfo_tools_blueprint.route("/gene_ontology/", methods=["POST"])
def apply_gene_ontology():
    data, options, is_json, is_file = Interface(request).parse_with_options()
    go = gene_ontology(data, options, is_file, is_json, config)
    check = go.check
    if check["status"] == "error":
        return check
    result = go.process()
    if len(result) == 0:
        return {
            "status": "error",
            "description": "There's no significant results for this sequences",
        }
    return {"result": result}


@bioinfo_tools_blueprint.route("/pfam/", methods=["POST"])
def apply_pfam():
    data, is_json, is_file = Interface(request).parse_without_options()
    pf = pfam(data, is_file, is_json, config)
    check = pf.check
    if check["status"] == "error":
        return check
    result = pf.process()
    if len(result) == 0:
        return {
            "status": "error",
            "description": "There's no significant results for this sequences",
        }
    return {"result": result}
