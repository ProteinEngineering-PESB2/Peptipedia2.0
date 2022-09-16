"""Bioinformatic tools routes"""
import configparser

from flask import Blueprint, request

from peptipedia.modules.alignment_module import BlastAlignment
from peptipedia.modules.gene_ontology import GeneOntology
from peptipedia.modules.msa_module import MultipleSequenceAlignment
from peptipedia.modules.pfam_domain import Pfam
from peptipedia.modules.structural_characterization import StructuralCharacterization
from peptipedia.modules.utils import Interface

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

bioinfo_tools_blueprint = Blueprint("bioinfo_tools_blueprint", __name__)


@bioinfo_tools_blueprint.route("/alignment/", methods=["POST"])
def apply_alignment():
    """Blast alignment route"""
    data, is_file = Interface(request).parse_without_options()
    align = BlastAlignment(data, is_file, config)
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
    """Multiple sequence alignment route"""
    data, is_file = Interface(request).parse_without_options()
    msa = MultipleSequenceAlignment(data, is_file, config)
    check = msa.check
    if check["status"] == "error":
        return check
    result = msa.run_process()
    return {"result": result}


@bioinfo_tools_blueprint.route("/structural_analysis/", methods=["POST"])
def apply_structural_analysis():
    """Structural analysis route"""
    data, options, is_file = Interface(request).parse_with_options()
    data_array = [">" + a for a in data.split(">")[1:]]
    result = []
    for data in data_array:
        structural = StructuralCharacterization(data, options, is_file, config)
        check = structural.check
        if check["status"] == "error":
            return check
        result.append(structural.run_process())
    return {"result": result}


@bioinfo_tools_blueprint.route("/gene_ontology/", methods=["POST"])
def apply_gene_ontology():
    """Gene ontology route"""
    data, options, is_file = Interface(request).parse_with_options()
    go_obj = GeneOntology(data, options, is_file, config)
    check = go_obj.check
    if check["status"] == "error":
        return check
    result = go_obj.process()
    if len(result) == 0:
        return {
            "status": "error",
            "description": "There's no significant results for this sequences",
        }
    return {"result": result}


@bioinfo_tools_blueprint.route("/pfam/", methods=["POST"])
def apply_pfam():
    """Pfam route"""
    data, is_file = Interface(request).parse_without_options()
    pf_obj = Pfam(data, is_file, config)
    check = pf_obj.check
    if check["status"] == "error":
        return check
    result = pf_obj.process()
    if len(result) == 0:
        return {
            "status": "error",
            "description": "There's no significant results for this sequences",
        }
    return {"result": result}
