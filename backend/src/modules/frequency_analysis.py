from random import random
import os
from Bio import SeqIO
import numpy as np
from modules.tool import config_tool

class frequency_analysis(config_tool):
    def __init__(self, data, temp_folder, is_file, is_json, max_sequences, min_number_sequences = 1):
        super().__init__(data, temp_folder, is_file, is_json, max_sequences, min_number_sequences)
        self.canonical_residues = ['A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V']
        self.output_path = "{}/frequency/{}".format(self.fasta_folder, self.fasta_file.replace(".fasta", ".json")) #deje la carpeta frequency para poder separar los resultados

    def count_canonical_residues(self, sequence):
        sequence = sequence.upper()
        dict_counts = {residue : sequence.count(residue) for residue in self.canonical_residues}
        return dict_counts

    def exec_process(self):
        records = list(SeqIO.parse(self.fasta_path, "fasta"))
        dict_counts_seq = []
        for record in records:
            sequence = str(record.seq)
            id_sequence = record.id
            dict_counts_seq.append({"id_seq": id_sequence, "counts": self.count_canonical_residues(sequence)})
        self.delete_file()
        return dict_counts_seq