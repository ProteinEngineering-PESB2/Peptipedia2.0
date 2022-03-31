from random import random
import os
import subprocess
import time
import pandas as pd
import re
import json
from modules.verify_fasta import verify_fasta

class pfam:
    def __init__(self, data, temp_folder, is_file, is_json, max_sequences):
        self.temp_folder = temp_folder
        self.fasta_path = str(round(random()*10**20)) + ".fasta"
        self.data = data
        if(is_json):
            print("creando archivo a partir de texto")
            self.create_file()
            self.create_csv(data)
        if(is_file):
            print("guardando archivo")
            self.save_file()
            self.temp_file = self.temp_folder + "/" + str(round(random()*10**20)) + ".fasta"
            self.save_file(data)
            f = open(self.temp_file, "r")
            print("creando archivos")
            self.create_csv(f.read())
            f.close()
        self.check = verify_fasta(self.temp_file, max_sequences).verify()

    def get_check(self):
        return self.check
        
    def create_csv(self, data):
        self.records = [">"+i for i in data.split(">")[1:]]
        self.list_files = []
        self.ids = []
        self.temp_file = self.temp_folder + "/" + str(round(random()*10**20)) + ".fasta"
        f = open(self.temp_file, "w")
        for record in self.records:
            self.list_files.append(self.temp_file)
            f.write(record)
            self.ids.append(record.split("\n")[0])
        f.close()

    def create_file(self):
        f = open(self.fasta_path, "w")
        f.write(self.data)
        f.close()

    def save_file(self):
        self.data.save(self.fasta_path)

    def process(self):
        self.output_file = self.temp_file.replace("fasta", "pfam")
        os.system("pfam_scan.pl -dir /app/install_requisites/databases/ -fasta {} > {}".format(self.temp_file, self.output_file))
        f = open(self.output_file, "r")
        text = f.read().split("\n\n")[-1]
        f.close()
        data = []
        for i in text.splitlines():
            result = re.sub('\s+','\t', i).strip()
            data.append(result.split("\t"))
        dataset = pd.DataFrame(data, columns = ["seq_id", "alignment_start", "alignment_end","envelope_start", "envelope_end", "hmm_acc", "hmm_name", "type", "hmm_start", "hmm_end", "hmm_length", "bit_score", "e-value", "clan", "predicted_active_site_residues"])
        dataset = dataset[["seq_id", "hmm_acc", "hmm_name", "type", "bit_score", "e-value"]]
        dataset.rename(columns = {"hmm_acc": "Id_accession", "hmm_name":"Pfam", "bit_score": "Bitscore", "type": "Class", "e-value": "Evalue", "hmm_name": "Accession"}, inplace=True)
        dataset["Type"] = ""
        json_dataset = json.loads(dataset.to_json(orient="records"))
        response = []

        for id in dataset.seq_id.unique():
            response_dict = {}
            response_dict["id"] = id
            response_dict["data"] = []
            for j in json_dataset:
                if (j["seq_id"] == id):
                    dict_copy = j.copy()
                    dict_copy.pop("seq_id")
                    response_dict["data"].append(dict_copy)
            response.append(response_dict)

        self.delete_file()
        return response

    def delete_file(self):
        try:
            os.remove(self.fasta_path)
        except Exception as e:
            print(e)