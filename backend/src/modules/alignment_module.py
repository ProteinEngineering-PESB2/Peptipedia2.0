import os
from random import random
from modules.utils import config_tool

class alignment(config_tool):
    def __init__(self, data, temp_folder, static_folder, is_file, is_json, max_sequences, min_number_sequences = 1):
        super().__init__(data, temp_folder, is_file, is_json, max_sequences, min_number_sequences)
        self.output_path = "{}/alignments/{}".format(static_folder, self.temp_file_path.replace(".fasta", ".align").split("/")[-1])
        print(self.output_path)

    def execute_blastp(self):
        command = "blastp -db peptipedia -query {} -evalue 0.5 -out {}".format(self.temp_file_path, self.output_path)
        print(command)
        os.system(command)
        return self.output_path