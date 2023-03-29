"""Bioinformatic tools routes"""
import configparser

from flask import Blueprint, request

from peptipedia.modules.alignment import BlastAlignment
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
