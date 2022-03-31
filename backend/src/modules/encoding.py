import pandas as pd
from random import random
import os
from modules.verify_fasta import verify_fasta
class encoding:
    def __init__(self, data, options, temp_folder, is_file, is_json, max_sequences):
        self.temp_folder = temp_folder 
        self.rand_name = str(round(random()*10**20))
        self.results_folder = "files/{}".format(self.rand_name)
        os.mkdir(self.results_folder)

        self.temp_csv = "{}/{}_codifications.csv".format(self.temp_folder, self.rand_name)
        self.fasta_path = self.temp_csv.replace("csv", "fasta")

        self.data = data

        self.one_hot_encoding = options["one_hot_encoding"]
        self.phisicochemical_properties = options["phisicochemical_properties"]
        self.digital_signal_processing = options["digital_signal_processing"]

        if(is_json):
            self.create_file()
        if(is_file):
            self.save_file()
        
        self.check = verify_fasta(self.fasta_path, max_sequences).verify()

    def get_check(self):
        return self.check
        
    def create_df(self, data):
        #Toma un texto fasta y lo transforma en un dataframe
        self.records = [">"+i for i in data.split(">")[1:]]
        data = []
        for i in self.records:
            splitted = i.split("\n")
            id = splitted[0]
            sequence = "".join(splitted[1:])
            row = {"id": id, "sequence": sequence}
            data.append(row)
        return pd.DataFrame(data)

    def save_file(self):
        self.data.save(self.fasta_path)

    def create_file(self):
        f = open(self.fasta_path, "w")
        f.write(self.data)
        f.close()

    def get_longest(self):
        return self.data.sequence.str.len().max()

    def process(self):
        f = open(self.fasta_path, "r")
        self.data = self.create_df(f.read())
        f.close()
        self.data.to_csv(self.temp_csv, index=False)
        self.max_length = self.get_longest()
        if self.one_hot_encoding:
            os.system("python3 modules/encoding_strategies/encoding_one_hot.py {} {} {}".format(self.temp_csv, self.results_folder+'/', self.max_length*20))
        if self.phisicochemical_properties:
            os.system("python3 modules/encoding_strategies/encoding_using_physicochemical_properties.py {} modules/encoding_strategies/encoding_AAIndex/ {} {}".format(self.temp_csv, self.results_folder + '/', self.max_length))
        if self.digital_signal_processing:
            os.system("python3 modules/encoding_strategies/encoding_using_Fourier_Transform.py {} {}".format(self.results_folder+"/physicochemical_properties/", self.results_folder+'/'))
        self.compress()
        self.delete_file()
        return self.rand_name + ".zip"
    
    def compress(self):
        os.system("zip -r {}.zip {}/".format(self.results_folder, self.results_folder))
        os.system("rm -r {}".format(self.results_folder))
        
    def delete_file(self):
        try:
            os.remove(self.fasta_path)
        except Exception as e:
            print(e)
        try:
            os.remove(self.temp_csv)
        except Exception as e:
            print(e)