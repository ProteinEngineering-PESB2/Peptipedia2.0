"""Structure module"""
from random import random

import requests

from peptipedia.modules.msa_module import MultipleSequenceAlignment


class Structure:
    """Structure class"""

    def __init__(self, static_folder):
        self.static_folder = static_folder
        self.output_pdb_path = (
            static_folder + "/" + str(round(random() * 10**20)) + ".pdb"
        )
        self.output_fasta_path = (
            static_folder + "/" + str(round(random() * 10**20)) + ".fasta"
        )

    def get_alphafold(self, uniprot_id):
        """Use a request to alphafold and download it"""
        uniprot_id = uniprot_id.split(".")[0]
        try:
            response = requests.get(
                f"https://alphafold.ebi.ac.uk/files/AF-{uniprot_id}-F1-model_v2.pdb"
            )

            with open(self.output_pdb_path, "w", encoding="utf-8") as file:
                file.write(response.text)
            return {"status": "success", "path": self.output_pdb_path}
        except:
            return {"status": "error"}

    def get_sequence(self, uniprot_id):
        """Use a request to uniprot and download it"""
        uniprot_id = uniprot_id.split(".")[0]
        try:
            response = requests.get(
                f"https://www.uniprot.org/uniprot/{uniprot_id}.fasta"
            )
            with open(self.output_fasta_path, "w", encoding="utf-8") as file:
                file.write(response.text)
            return {"status": "success", "path": self.output_fasta_path}
        except:
            return {"status": "error"}

    def get_structure(self, db_obj, idpeptide, config):
        """Look for a structure using alignments"""
        uniprot = db_obj.get_uniprot(idpeptide)
        if uniprot:
            res_structure = self.get_alphafold(uniprot)
            res_sequence = self.get_sequence(uniprot)
            if (
                res_structure["status"] == "success"
                and res_sequence["status"] == "success"
            ):
                path_sequence = res_sequence["path"]
                with open(path_sequence, "r", encoding="utf-8") as fasta_file:
                    fasta_text = fasta_file.read()
                id_fasta = fasta_text.split("\n")[0].split(" ")[0]
                seq_fasta = "\n".join(fasta_text.split("\n")[1:])
                fasta_text = id_fasta + "\n" + seq_fasta
                info = db_obj.get_info_from_peptide(idpeptide)
                sequence = info[0]["sequence"]
                data = fasta_text + ">" + idpeptide + "\n" + sequence
                is_file = False
                msa = MultipleSequenceAlignment(data, is_file, config, matrix=False)
                alignment = msa.run_process()["alignment"]
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
            return {"status": "error", "Description": "Structure not found"}
        return {"status": "error", "Description": "Structure not found"}
