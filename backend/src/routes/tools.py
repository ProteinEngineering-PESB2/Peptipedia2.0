
"""Phisicochemical functions"""
from flask import request, Blueprint
from modules.fasta_convertor import fasta_convertor
import configparser

##Reads config file and asign folder names. 
config = configparser.ConfigParser()
config.read("config.ini")

tools_blueprint = Blueprint('tools_blueprint', __name__)
@tools_blueprint.route('/fasta_convertor/', methods=["POST"])
def api_fasta_convertor():
    text = request.json["data"]
    limit = int(config["fasta_convertor"]["length"])
    f_convert = fasta_convertor(config["folders"]["static_folder"], text, limit)
    fasta_text = f_convert.convert()
    fasta_path = f_convert.save_file()
    return {"path": fasta_path, "text": fasta_text}