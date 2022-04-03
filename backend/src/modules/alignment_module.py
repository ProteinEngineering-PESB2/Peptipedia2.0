import os
from random import random
from modules.tool import config_tool

class alignment(config_tool):
    def __init__(self, data, temp_folder, static_folder, is_file, is_json, max_sequences, min_number_sequences = 1):
        super().__init__(data, temp_folder, is_file, is_json, max_sequences, min_number_sequences)
        self.output_path = "{}/alignments/{}".format(static_folder, self.fasta_file.replace(".fasta", ".align"))

    def execute_blastp(self):
        command = "blastp -db swissprot -query {} -evalue 0.5 -out {}".format(self.fasta_path, self.output_path)
        os.system(command)
        self.delete_file()
        return self.output_path