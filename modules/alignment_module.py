import os
from random import random

class alignment:
    def __init__(self, data, temp_folder, static_folder, is_file, is_json):
        self.data = data
        self.fasta_folder = temp_folder
        self.fasta_file = "{}.fasta".format(str(round(random()*10**20)))
        self.fasta_path = "{}/{}".format(self.fasta_folder, self.fasta_file)
        self.output_path = "{}/alignments/{}".format(static_folder, self.fasta_file.replace(".fasta", ".align"))
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

    def execute_blastp(self):
        command = "blastp -db swissprot -query {} -evalue 0.5 -out {}".format(self.fasta_path, self.output_path)
        os.system(command)
        self.delete_file()
        return self.output_path

    def delete_file(self):
        try:
            os.remove(self.fasta_path)
        except Exception as e:
            print(e)