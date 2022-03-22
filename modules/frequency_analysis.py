from random import random
import os
from Bio import SeqIO
import numpy as np

class frequency_analysis(object):

    def __init__(self, data, temp_folder, is_file, is_json):
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

    def get_average_data(self, response_sequences):

        average_vector = {}
        std_vector = {}
        min_vector = {}
        max_vector = {}

        for residue in self.canonical_residues:
            values_vector = []
            for element in response_sequences:
                values_vector.append(element['counts'][residue])
            average_vector.update({residue:np.mean(values_vector)})
            std_vector.update({residue: np.std(values_vector)})
            min_vector.update({residue: np.min(values_vector)})
            max_vector.update({residue: np.max(values_vector)})

        return {"average_data": average_vector, "std_data": std_vector, "min_data":min_vector, "max_data": max_vector}

    def exec_process(self):
        records = SeqIO.parse(self.fasta_path, "fasta")

        response = {}
        dict_counts_seq = []

        for record in records:
            sequence = str(record.seq)
            id_sequence = record.id
            dict_counts_seq.append({"id_seq": id_sequence, "counts": self.count_canonical_residues(sequence)})

        #get average
        response.update({"counts_residues": dict_counts_seq})
        if len(dict_counts_seq) >1:
            statistical_evaluation = self.get_average_data(dict_counts_seq)
            response.update({"statistical_residues":statistical_evaluation})
        else:
            response.update({"statistical_residues": {}})
        return response