import os
from random import random
import pandas as pd
from Bio import SeqIO
from modules.database import database
import re

class config_tool:
    def __init__(self, data, temp_folder, is_file, is_json, max_sequences, min_number_sequences = 1, is_fasta = True):
        self.data = data
        self.temp_folder = temp_folder
        self.temp_file_path = "{}/{}".format(self.temp_folder, str(round(random()*10**20)))
        if(is_fasta):
            self.temp_file_path+=".fasta"
        else:
            self.temp_file_path+=".csv"

        if(is_json):
            self.create_file()
        elif(is_file):
            self.save_file()
            
        if(is_fasta):
            self.check = verify_fasta(self.temp_file_path, max_sequences, min_number_sequences).verify()
        else:
            self.check = verify_csv(self.temp_file_path, max_sequences, min_number_sequences).verify()

    def create_file(self):
        f = open(self.temp_file_path, "w")
        f.write(self.data)
        f.close()

    def save_file(self):
        self.data.save(self.temp_file_path)

    def create_csv_from_fasta(self):
        f = open(self.temp_file_path, "r")
        data = f.read()
        f.close()
        self.records = [">"+i for i in data.split(">")[1:]]
        self.list_files = []
        self.ids = []
        self.temp_csv_file = self.temp_folder + "/" + str(round(random()*10**20)) + ".fasta"
        f = open(self.temp_csv_file, "w")
        for record in self.records:
            self.list_files.append(self.temp_csv_file)
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

class verify_csv:
    def __init__(self, path, max_number_sequences, min_number_sequences = 1):
        self.path = path
        self.max_number_sequences = max_number_sequences
        self.min_number_sequences = min_number_sequences
        try:
            self.data = pd.read_csv(self.path)
        except Exception as e:
            self.data = [False]

    def verify(self):
        if self.is_csv():
            if self.null_values():
                if self.correct_columns():
                    if self.unique_ids():
                        if self.less_than_n():
                            if self.more_than_n():
                                res_is_protein = self.is_protein()
                                if res_is_protein[0]:
                                    good_length = self.ver_length()
                                    if good_length[0]:
                                        return {"status": "success"}
                                    else:
                                        return {"status": "error", "description": "Protein length invalid (id={})".format(good_length[1])}
                                else:
                                    return {"status": "error", "description": "Not proteins (id={})".format(res_is_protein[1])}
                            else:
                                return {"status": "error", "description": "Too few sequences"}
                        else:
                            return {"status": "error", "description": "Too much sequences"}
                    else:
                        return {"status": "error", "description": "Duplicate ids"}           
                else:
                    return {"status": "error", "description": "Incorrect columns"}
            else:
                return {"status": "error", "description": "Data has null values"}
        else:
            return {"status": "error", "description": "Not a csv file / ASCII error"}

    def unique_ids(self): 
        ids = self.data.id
        unique_ids = self.data.id.unique()
        if len(ids) == len(unique_ids):
            return True
        return False

    def correct_columns(self):
        if list(self.data.columns) == ["id", "sequence", "target"]:
            return True
        return False

    def is_csv(self):
        return any(self.data)
    
    def less_than_n(self):
        length = len(self.data)
        if length <= self.max_number_sequences:
            return True
        return False

    def more_than_n(self):
        length = len(self.data)
        if length >= self.min_number_sequences:
            return True
        return False

    def is_protein(self):
        alphabet = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y',
                    'a', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y',
                    'X', 'B', 'Z','J',
                    'x', 'b', 'z' 'j', '*']
        for index, row in self.data.iterrows():
            sequence = row.sequence
            for letter in sequence:
                if letter not in alphabet:
                    return False, row.id
        return True, None

    def ver_length(self):
        for index, row in self.data.iterrows():
            sequence = row.sequence
            if len(sequence) > 150 or len(sequence) < 2:
                return False, row.id
        return True, None

    def null_values(self):
        data = self.data
        data_without_na = self.data.dropna()
        if len(data) == len(data_without_na):
            return True
        return False

class verify_fasta:

    def __init__(self, path, max_number_sequences, min_number_sequences = 1):
        self.path = path
        self.max_number_sequences = max_number_sequences
        self.min_number_sequences = min_number_sequences
        try:
            self.fasta = list(SeqIO.parse(self.path, "fasta"))
            SeqIO.write(self.fasta, self.path, "fasta")
        except Exception as e:
            self.fasta = [False]

    def verify(self):
        if self.is_fasta():
            if self.unique_ids():
                if self.less_than_n():
                    if self.more_than_n():
                        res_is_protein = self.is_protein()
                        if res_is_protein[0]:
                            good_length = self.ver_length()
                            if good_length[0]:
                                return {"status": "success"}
                            else:
                                return {"status": "error", "description": "Protein length invalid (id={})".format(good_length[1])}
                        else:
                            return {"status": "error", "description": "Not proteins (id={})".format(res_is_protein[1])}
                    else:
                        return {"status": "error", "description": "Too few sequences"}
                else:
                    return {"status": "error", "description": "Too much sequences"}
            else:
                return {"status": "error", "description": "Duplicate ids"}
        else:
            return {"status": "error", "description": "Not a fasta file / ASCII error"}


    def unique_ids(self):
        ids = [sequence.id for sequence in self.fasta]
        if len(set(ids)) == len(ids):
            return True
        return False

    def is_fasta(self):
        return any(self.fasta)
    
    def less_than_n(self):
        length = len(self.fasta)
        if length <= self.max_number_sequences:
            return True
        return False

    def more_than_n(self):
        length = len(self.fasta)
        if length >= self.min_number_sequences:
            return True
        return False

    def is_protein(self):
        alphabet = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y',
                    'a', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y',
                    'X', 'B', 'Z','J',
                    'x', 'b', 'z' 'j', '*']
        for record in self.fasta:
            for letter in str(record.seq):
                if letter not in alphabet:
                    return False, record.id
        return True, None

    def ver_length(self):
        for row in self.fasta:
            sequence = row.seq
            if len(sequence) > 150 or len(sequence) < 2:
                return False, row.id
        return True, None

class interface:
    def parse_information_no_options(self, request):
        try:
            post_data = request.json
        except:
            post_data = None
        try:
            post_file = request.files
        except:
            post_file = None
        is_json = False
        is_file = False
        if(post_data != None):
            data = post_data["data"]
            is_json = True
        elif(post_file != None):
            data = post_file["file"]
            is_file = True
        return data, is_json, is_file
    
    def parse_information_with_options(self, request):
        try:
            post_data = request.json
        except:
            post_data = None
        try:
            post_file = request.files
        except:
            post_file = None

        if(post_data != None):
            is_json = True
            is_file = False
            data = post_data["data"]
            options = post_data["options"]
        elif(post_file != None):
            is_json = False
            is_file = True
            file = request.files
            data = file["file"]
            options = eval(file["options"].read().decode("utf-8"))
        return data, options, is_json, is_file
