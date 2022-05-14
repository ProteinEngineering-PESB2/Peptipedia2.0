import pandas as pd
from random import random
import os
from modules.utils import config_tool

class gene_ontology(config_tool):
    def __init__(self, data, options, temp_folder, is_file, is_json, max_sequences, min_number_sequences = 1):
        super().__init__(data, temp_folder, is_file, is_json, max_sequences, min_number_sequences)
        self.output_path = self.temp_file_path.replace(".fasta", ".result")
        self.molecular_function = options["molecular_function"]
        self.biological_process = options["biological_process"]
        self.celular_component = options["celular_component"]
        self.ontologies = self.parse_ontologies()

    def parse_ontologies(self):
        ontologies = []
        if(self.molecular_function):
            ontologies.append("MFO")
        if(self.biological_process):
            ontologies.append("BPO")
        if(self.celular_component):
            ontologies.append("CCO")
        return ",".join(ontologies)
        
    def process(self):
        print(os.listdir("/temp_files/"))
        command= "metastudent -i {} -o {} --ontologies={}".format(self.temp_file_path, self.output_path, self.ontologies)
        print(command)
        os.system(command)
        print(os.listdir("/temp_files/"))
        result = self.find_and_load_data()
        return result

    def find_and_load_data(self):
        results = []
        if(self.molecular_function):
            try:
                mf = pd.read_csv(self.output_path + ".MFO.txt", header=None, sep="\t")
                mf.rename(columns={0: "id_seq", 1: "id_go", 2: "probability", 3: "term"}, inplace=True)
                mfs = mf.id_seq.unique()
                mf_array = []
                for mfi in mfs:
                    temp = mf[mf.id_seq == mfi][["id_go", "probability", "term"]]
                    mf_array.append({"id_seq": mfi, "results": temp.to_dict("records")})
                results.append({"type": "molecular_function", "prediction": mf_array})
            except Exception as e:
                print(e)
                print("No result for molecular function")

        if(self.biological_process):
            try:
                bp = pd.read_csv(self.output_path + ".BPO.txt", header=None, sep="\t")
                bp.rename(columns={0: "id_seq", 1: "id_go", 2: "probability", 3: "term"}, inplace=True)
                bps = mf.id_seq.unique()
                bp_array = []
                for bpi in bps:
                    temp = bp[bp.id_seq == bpi][["id_go", "probability", "term"]]
                    bp_array.append({"id_seq": bpi, "results": temp.to_dict("records")})
                results.append({"type": "biological_process", "prediction": bp_array})
            except Exception as e:
                print(e)
                print("No result for biological process")
        if(self.celular_component):
            try:
                cc = pd.read_csv(self.output_path + ".CCO.txt", header=None, sep="\t")
                cc.rename(columns={0: "id_seq", 1: "id_go", 2: "probability", 3: "term"}, inplace=True)
                ccs = cc.id_seq.unique()
                cc_array = []
                for cci in ccs:
                    temp = cc[cc.id_seq == cci][["id_go", "probability", "term"]]
                    cc_array.append({"id_seq": cci, "results": temp.to_dict("records")})
                results.append({"type": "celular_component", "prediction": cc_array})
            except Exception as e:
                print(e)
                print("No result for biological process")
        return results