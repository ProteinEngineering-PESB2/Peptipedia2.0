import os
from random import random
from modules.verify_fasta import verify_fasta
import pandas as pd
class config_tool:
    def __init__(self, data, temp_folder, is_file, is_json, max_sequences, min_number_sequences = 1):
        self.data = data
        self.fasta_folder = temp_folder
        self.fasta_file = "{}.fasta".format(str(round(random()*10**20)))
        self.fasta_path = "{}/{}".format(self.fasta_folder, self.fasta_file)
        if(is_json):
            self.create_file()
        elif(is_file):
            self.save_file()
        self.check = verify_fasta(self.fasta_path, max_sequences, min_number_sequences).verify()

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

    def create_csv_from_fasta(self):
        f = open(self.fasta_path, "r")
        data = f.read()
        f.close()
        self.records = [">"+i for i in data.split(">")[1:]]
        self.list_files = []
        self.ids = []
        self.temp_file = self.fasta_folder + "/" + str(round(random()*10**20)) + ".fasta"
        f = open(self.temp_file, "w")
        for record in self.records:
            self.list_files.append(self.temp_file)
            f.write(record)
            self.ids.append(record.split("\n")[0])
        f.close()

    def create_df(self, fasta):
        #Toma un texto fasta y lo transforma en un dataframe
        self.records = [">"+i for i in fasta.split(">")[1:]]
        data = []
        for i in self.records:
            splitted = i.split("\n")
            id = splitted[0]
            sequence = "".join(splitted[1:])
            row = {"id": id, "sequence": sequence}
            data.append(row)
        return pd.DataFrame(data)
