import pandas as pd
import os
import requests
import time 
from random import random
class structure:
    def __init__(self, static_folder):
        self.static_folder = static_folder
        self.output_path = static_folder + "/" + str(round(random()*10**20)) + ".pdb"

    def get_alphafold(self, uniprot):
        uniprot_id = uniprot.split(".")[0]
        try:
            response = requests.get("https://alphafold.ebi.ac.uk/files/AF-{}-F1-model_v2.pdb".format(uniprot_id))
            f = open(self.output_path, "w")
            f.write(response.text)
            f.close()
            return {"status": "success", "path": self.output_path}
        except Exception as e:
            print(e)
            return {"status": "error"}
        