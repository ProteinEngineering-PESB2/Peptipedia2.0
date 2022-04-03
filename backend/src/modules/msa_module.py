from random import random
import os
import subprocess
from modules.tool import config_tool

class multiple_sequence_alignment(config_tool):
    def __init__(self, data, temp_folder, is_file, is_json, max_sequences, min_number_sequences):
        super().__init__(data, temp_folder, is_file, is_json, max_sequences, min_number_sequences)

    def execute_clustalo(self):
        command = "clustalo -i {}".format(self.fasta_path)
        output = subprocess.check_output(command, shell=True)
        output = output.decode("utf-8")
        sequences = output.split(">")
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
        return result