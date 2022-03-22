from random import random
import os
import subprocess

class multiple_sequence_alignment:
    def __init__(self, data, temp_folder, is_file, is_json):
        self.data = data
        self.fasta_folder = temp_folder
        self.fasta_file = "{}.fasta".format(str(round(random()*10**20)))
        self.fasta_path = "{}/{}".format(self.fasta_folder, self.fasta_file)
        self.output_path = "{}/alignments/{}".format(self.fasta_folder, self.fasta_file.replace(".fasta", ".align"))
        if(is_json):
            self.create_file()
        elif(is_file):
            self.save_file()

    def create_file(self):
        f = open(self.fasta_path, "w")
        f.write(self.data)
        f.close()

    def save_file(self):
        self.data.save(self.fasta_path)
    
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
        
    def delete_file(self):
        try:
            os.remove(self.fasta_path)
        except Exception as e:
            print(e)
