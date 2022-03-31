import pandas as pd
from random import random
import os
from modules.verify_fasta import verify_fasta

class gene_ontology:
    def __init__(self, data, options, temp_folder, is_file, is_json, max_sequences):
        self.molecular_function = options["molecular_function"]
        self.biological_process = options["biological_process"]
        self.celular_component = options["celular_component"]
        self.ontologies = self.parse_ontologies()

        self.data = data
        self.fasta_folder = temp_folder
        self.fasta_file = "{}.fasta".format(str(round(random()*10**20)))
        self.fasta_path = "{}/{}".format(self.fasta_folder, self.fasta_file)
        self.output_path = self.fasta_path.replace(".fasta", ".result")
        if(is_json):
            self.create_file()
        elif(is_file):
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

    def parse_ontologies(self):
        ontologies = []
        if(self.molecular_function):
            ontologies.append("MFO")
        if(self.biological_process):
            ontologies.append("BPO")
        if(self.celular_component):
            ontologies.append("CCO")
        return ",".join(ontologies)

    def delete_file(self):
        os.remove(self.fasta_path)
        os.remove(self.output_path + ".MFO.txt")
        os.remove(self.output_path + ".BPO.txt")
        os.remove(self.output_path + ".CCO.txt")
    def process(self):
        command= "metastudent -i {} -o {} --ontologies={}".format(self.fasta_path, self.output_path, self.ontologies)
        os.system(command)
        result = self.find_and_load_data()
        return result

    def find_and_load_data(self):
        results = []

        if(self.molecular_function):
            mf = pd.read_csv(self.output_path + ".MFO.txt", header=None, sep="\t")
            mf.rename(columns={0: "id_seq", 1: "id_go", 2: "probability", 3: "term"}, inplace=True)
            mfs = mf.id_seq.unique()
            mf_array = []
            for mfi in mfs:
                temp = mf[mf.id_seq == mfi][["id_go", "probability", "term"]]
                mf_array.append({"id_seq": mfi, "results": temp.to_dict("records")})
            results.append({"type": "molecular_function", "prediction": mf_array})

        if(self.biological_process):
            bp = pd.read_csv(self.output_path + ".BPO.txt", header=None, sep="\t")
            bp.rename(columns={0: "id_seq", 1: "id_go", 2: "probability", 3: "term"}, inplace=True)
            bps = mf.id_seq.unique()
            bp_array = []
            for bpi in bps:
                temp = bp[bp.id_seq == bpi][["id_go", "probability", "term"]]
                bp_array.append({"id_seq": bpi, "results": temp.to_dict("records")})
            results.append({"type": "biological_process", "prediction": bp_array})

        if(self.celular_component):
            cc = pd.read_csv(self.output_path + ".CCO.txt", header=None, sep="\t")
            cc.rename(columns={0: "id_seq", 1: "id_go", 2: "probability", 3: "term"}, inplace=True)
            ccs = cc.id_seq.unique()
            cc_array = []
            for cci in ccs:
                temp = cc[cc.id_seq == cci][["id_go", "probability", "term"]]
                cc_array.append({"id_seq": cci, "results": temp.to_dict("records")})
            results.append({"type": "celular_component", "prediction": cc_array})
        #self.delete_file()
        return results
