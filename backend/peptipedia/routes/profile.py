"""Phisicochemical functions"""
import configparser

from flask import Blueprint, request

from peptipedia.modules.database import database
from peptipedia.modules.msa_module import multiple_sequence_alignment
from peptipedia.modules.structure import structure

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

db = database(config)

profile_blueprint = Blueprint("profile_blueprint", __name__)

###Profile
@profile_blueprint.route("/get_go_from_peptide/<idpeptide>", methods=["GET"])
def api_get_go_from_peptide(idpeptide):
    result = db.get_go_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_pfam_from_peptide/<idpeptide>", methods=["GET"])
def api_get_pfam_from_peptide(idpeptide):
    result = db.get_pfam_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_tax_from_peptide/<idpeptide>", methods=["GET"])
def api_get_tax_from_peptide(idpeptide):
    result = db.get_tax_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_info_from_peptide/<idpeptide>", methods=["GET"])
def api_get_info_from_peptide(idpeptide):
    result = db.get_info_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_act_from_peptide/<idpeptide>", methods=["GET"])
def api_get_act_from_peptide(idpeptide):
    result = db.get_act_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_patent_from_peptide/<idpeptide>", methods=["GET"])
def api_get_patent_from_peptide(idpeptide):
    result = db.get_patent_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_db_from_peptide/<idpeptide>", methods=["GET"])
def api_get_db_from_peptide(idpeptide):
    result = db.get_db_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_structure/<idpeptide>", methods=["GET"])
def api_get_structure(idpeptide):
    uniprot = db.get_uniprot(idpeptide)
    if uniprot:
        struct = structure(config["folders"]["static_folder"])
        res_structure = struct.get_alphafold(uniprot)
        res_sequence = struct.get_sequence(uniprot)
        if res_structure["status"] == "success" and res_sequence["status"] == "success":
            path_sequence = res_sequence["path"]
            f = open(path_sequence, "r")
            fasta_text = f.read()
            f.close()
            id_fasta = fasta_text.split("\n")[0].split(" ")[0]
            seq_fasta = "\n".join(fasta_text.split("\n")[1:])
            fasta_text = id_fasta + "\n" + seq_fasta
            info = db.get_info_from_peptide(idpeptide)
            sequence = info[0]["sequence"]
            data = fasta_text + ">" + idpeptide + "\n" + sequence
            is_json = True
            is_file = False
            msa = multiple_sequence_alignment(data, is_file, is_json, config)
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
                    elif i != query[index] and query[index] != "-":
                        similar_res.append(a)
                    else:
                        different_res.append(index)
                    a += 1
            return {
                "status": "success",
                "path": res_structure["path"],
                "fasta": res_sequence["path"],
                "uniprot_id": uniprot,
                "alignment": alignment,
                "equal_res": equal_res,
                "similar_res": similar_res,
                "different_res": different_res,
            }
        else:
            return {"status": "error", "Description": "Structure not found"}
    return {"status": "error", "Description": "Structure not found"}
