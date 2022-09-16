"""Tools routes"""
import configparser

from flask import Blueprint, request

from peptipedia.modules.database import Database
from peptipedia.modules.fasta_convertor import FastaConvertor

config = configparser.ConfigParser()
config.read("config.ini")

tools_blueprint = Blueprint("tools_blueprint", __name__)

db = Database(config)


@tools_blueprint.route("/fasta_convertor/", methods=["POST"])
def api_fasta_convertor():
    """Fasta convertor route"""
    text = request.json["data"]
    limit = int(config["fasta_convertor"]["length"])
    f_convert = FastaConvertor(config["folders"]["static_folder"], text, limit)
    fasta_text = f_convert.convert()
    fasta_path = f_convert.save_file()
    return {"path": fasta_path, "text": fasta_text}


@tools_blueprint.route("/sample_sequences/<sample_size>", methods=["GET"])
def api_sample_sequences(sample_size):
    """Sample sequences route"""
    return db.get_sample_sequences(sample_size)
