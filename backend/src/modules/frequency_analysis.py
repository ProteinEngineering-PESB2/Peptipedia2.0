from random import random
import os
from Bio import SeqIO
import numpy as np
from modules.utils import config_tool
import pandas as pd
class frequency_analysis(config_tool):
    def __init__(self, data, is_file, is_json, config):
        super().__init__("frequency", data, config, is_file, is_json)
        self.canonical_residues = ['A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V']
        self.output_path = "{}/frequency/{}".format(config["folders"]["temp_folder"], self.temp_file_path.replace(".fasta", ".json").split("/")[-1])

    def count_canonical_residues(self, sequence):
        sequence = sequence.upper()
        dict_counts = {residue : sequence.count(residue) for residue in self.canonical_residues}
        return dict_counts

    def exec_process(self):
        records = list(SeqIO.parse(self.temp_file_path, "fasta"))
        self.dict_counts_seq = []
        for record in records:
            sequence = str(record.seq)
            id_sequence = record.id
            self.dict_counts_seq.append({"id_seq": id_sequence, "counts": self.count_canonical_residues(sequence)})
        self.delete_file()
        return self.dict_counts_seq
    
    def get_average(self):
        
        df = pd.json_normalize(self.dict_counts_seq,max_level=1)
        df.drop(["id_seq"], inplace = True, axis = 1)
        df.rename(columns = {a : a.replace("counts.", "") for a in df.columns}, inplace=True)
        description = df.describe().round(2)
        X = description.columns.tolist()
        Y = description.loc["mean"].to_list()
        error = description.loc["std"] / 2
        error = error.to_list()
        return {"X": X,
                "Y": Y,
                "error": error}