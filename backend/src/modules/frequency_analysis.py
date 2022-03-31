from random import random
import os
from Bio import SeqIO
import numpy as np
from modules.verify_fasta import verify_fasta

class frequency_analysis(object):

    def __init__(self, data, temp_folder, is_file, is_json, max_sequences):
        self.data = data
        self.temp_folder = temp_folder
        self.is_file = is_file
        self.is_json = is_json

        self.canonical_residues = ['A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V']

        self.fasta_folder = temp_folder
        self.fasta_file = "{}.fasta".format(str(round(random() * 10 ** 20)))
        self.fasta_path = "{}/{}".format(self.fasta_folder, self.fasta_file)
        self.output_path = "{}/frequency/{}".format(self.fasta_folder, self.fasta_file.replace(".fasta", ".json")) #deje la carpeta frequency para poder separar los resultados

        if self.is_json:
            self.create_file()
        elif self.is_file:
            self.save_file()
        self.check = verify_fasta(self.fasta_path, max_sequences).verify()

    def get_check(self):
        return self.check
        

    def create_file(self):
        f = open(self.fasta_path, "w")
        f.write(self.data)
        f.close()

    def save_file(self):
        self.data.save(self.fasta_path)

    def delete_file(self):
        try:
            os.remove(self.fasta_path)
        except Exception as e:
            print(e)

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


    def delete_file(self):
        try:
            os.remove(self.fasta_path)
        except Exception as e:
            print(e)