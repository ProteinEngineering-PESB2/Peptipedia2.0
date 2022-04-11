from random import random
import os
import subprocess
from modules.utils import config_tool
from random import random
import pandas as pd
import json
class multiple_sequence_alignment(config_tool):
    def __init__(self, data, temp_folder, static_folder,is_file, is_json, max_sequences, min_number_sequences):
        super().__init__(data, temp_folder, is_file, is_json, max_sequences, min_number_sequences)
        self.output_path = static_folder
        self.output_file = os.path.realpath("{}/{}.out".format(self.output_path, str(round(random()*10**20))))
        self.distance_matrix_file = os.path.realpath("{}/{}.dist".format(self.output_path, str(round(random()*10**20))))

    def execute_clustalo(self):
        command = "clustalo -i {} -o {} --distmat-out={} --full".format(self.temp_file_path, self.output_file, self.distance_matrix_file)
        os.system(command)

        f = open(self.distance_matrix_file, "r")
        distance_matrix = f.read()
        f.close()
        df = pd.DataFrame([row.split() for row in distance_matrix.splitlines()[1:]])
        ids = list(df[0])
        ids.insert(0, "id")
        df.columns = ids
        data_json = json.loads(df.to_json(orient = "records"))

        f = open(self.output_file, "r")
        output_text = f.read()
        f.close()

        sequences = output_text.split(">")
        data = [seq.split("\n") for seq in sequences]
        data = data[1:]
        number_proteins = len(data)
        id = [sequence[0] for sequence in data]
        protein = ["".join(sequence[1:]) for sequence in data]
        result = []
        for i in range(number_proteins):
            dictionary = {}
            dictionary["label"] = ">" + id[i]
            dictionary["sequence"] = protein[i]
            dictionary["id"] = i+1
            result.append(dictionary)
        self.delete_file()
        return result, data_json