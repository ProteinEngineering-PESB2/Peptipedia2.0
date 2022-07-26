from random import random
import os
import subprocess
from modules.utils import config_tool
from random import random
import pandas as pd
import json
class multiple_sequence_alignment(config_tool):
    def __init__(self, data, is_file, is_json, config):
        super().__init__("msa", data, config, is_file, is_json)
        self.output_file = os.path.realpath("{}/{}.out".format(config["folders"]["static_folder"], str(round(random()*10**20))))

    def execute_clustalo(self):
        command = "clustalo -i {} -o {} --full".format(self.temp_file_path, self.output_file)
        os.system(command)

        f = open(self.output_file, "r")
        output_text = f.read()
        f.close()

        sequences = output_text.split(">")
        data = [seq.split("\n") for seq in sequences]
        data = data[1:]
        number_proteins = len(data)
        id = [sequence[0].split(" ")[0] for sequence in data]
        protein = ["".join(sequence[1:]) for sequence in data]
        result = []
        for i in range(number_proteins):
            dictionary = {}
            dictionary["label"] = ">" + id[i]
            dictionary["sequence"] = protein[i]
            dictionary["id"] = i+1
            result.append(dictionary)
        self.delete_file()
        return result