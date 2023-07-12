"""Config utilities"""
import ast
import configparser
import re
from pathlib import Path
from random import random
import os
import pandas as pd
from Bio import SeqIO
from peptipedia.modules.database import Database
AMINOACID_ALPHABET = "ARNDCEQGHILKMFPSTWYVX*"


class ConfigTool:
    """Config tool class"""

    def __init__(self, config_module_name, data, config, is_file, is_fasta=True):
        self.data = data
        self.temp_folder = config["folders"]["temp_folder"]
        self.temp_file_path = f"{self.temp_folder}/{str(round(random() * 10**20))}"
        self.temp_csv_file = None
        if is_fasta:
            self.temp_file_path += ".fasta"
        else:
            self.temp_file_path += ".csv"
        if not is_file:
            self.create_file()
        elif is_file:
            self.save_file()
        if is_fasta:
            self.check = FastaFile(
                self.temp_file_path, config[config_module_name]
            ).verify()
        else:
            self.check = CsvFile(
                self.temp_file_path, config[config_module_name]
            ).verify()

    def create_file(self):
        """create file using data in specific path"""
        with open(self.temp_file_path, "w", encoding="utf-8") as file:
            file.write(self.data)

    def save_file(self):
        """save file in specific path"""
        self.data.save(self.temp_file_path)

    def delete_file(self):
        """Delete file from path"""
        try:
            Path(self.temp_file_path).unlink()
        except:
            pass

    def create_csv_from_fasta(self):
        """Transform fasta format to csv file"""
        self.temp_csv_file = (
            self.temp_folder + "/" + str(round(random() * 10**20)) + ".fasta"
        )
        with open(self.temp_file_path, "r", encoding="utf-8") as file:
            data = file.read()
        with open(self.temp_csv_file, "w", encoding="utf-8") as file:
            for record in parse_fasta(data):
                file.write(">{id}\n{sequence}\n".format(**record))

    @staticmethod
    def create_df(fasta):
        """Create a dataframe from fasta text"""
        return pd.DataFrame(parse_fasta(fasta))


class CsvFile:
    def __init__(self, path, config_module):
        self.path = path
        self.max_number_sequences = int(config_module["max_sequences"])
        self.min_number_sequences = int(config_module["min_sequences"])
        self.max_length = int(config_module["max_length"])
        try:
            self.data = pd.read_csv(self.path)
        except:
            self.data = None

    def verify(self):
        new_line = "\n"
        message = ""
        if not self.is_csv():
            message = "Not a csv file / ASCII error"
        if not self.null_values():
            message = "Data has null values"
        if not self.correct_columns():
            message = "Incorrect columns"
        if not self.unique_ids():
            message = "Duplicated ids"
        if not self.less_than_n():
            message = "Too many sequences"
        if not self.more_than_n():
            message = "Too few sequences"
        if len(invalid_protein_ids := self.invalid_proteins()) > 0:
            message = f"Not proteins:{new_line}{new_line.join(invalid_protein_ids)}"
        if len(invalid_length_ids := self.invalid_lengths()) > 0:
            message = f"Invalid Lengths:{new_line}{new_line.join(invalid_length_ids)}"
        if message != "":
            return _error_message(message)
        return {"status": "success"}

    def unique_ids(self):
        return self.data.duplicated("id").sum() == 0

    def correct_columns(self):
        return list(self.data.columns) == ["id", "sequence", "target"]

    def is_csv(self):
        return self.data is not None

    def less_than_n(self):
        return self.data.shape[0] <= self.max_number_sequences

    def more_than_n(self):
        return self.data.shape[0] >= self.min_number_sequences

    def invalid_proteins(self):
        print(self.data)
        invalid_ids = []
        aa_regex = re.compile(f"[{AMINOACID_ALPHABET}]+")
        for row in self.data.itertuples():
            if not aa_regex.fullmatch(row.sequence.upper()):
                invalid_ids.append(row.id)
        return invalid_ids

    def invalid_lengths(self):
        invalid_ids = []
        for row in self.data.itertuples():
            sequence = row.sequence
            if len(sequence) > self.max_length or len(sequence) < 2:
                invalid_ids.append(row.id)
        return invalid_ids

    def null_values(self):
        return self.data.isnull().any(axis=1).sum() == 0


class FastaFile:
    def __init__(self, path, config_module):
        self.path = path
        self.max_number_sequences = int(config_module["max_sequences"])
        self.min_number_sequences = int(config_module["min_sequences"])
        self.max_length = int(config_module["max_length"])
        try:
            self.fasta = list(SeqIO.parse(self.path, "fasta"))
            SeqIO.write(self.fasta, self.path, "fasta")
        except:
            self.fasta = None

    def verify(self):
        new_line = "\n"
        message = ""
        if not self.is_fasta():
            message = "Not a fasta file / ASCII error"
        if not self.unique_ids():
            message = "Duplicated ids"
        if not self.less_than_n():
            message = "Too many sequences"
        if not self.more_than_n():
            message = "Too few sequences"
        if len(invalid_protein_ids := self.invalid_proteins()) > 0:
            message = f"Not proteins:{new_line}{new_line.join(invalid_protein_ids)}"
        if len(invalid_length_ids := self.invalid_lengths()) > 0:
            message = f"Invalid Lengths:{new_line}{new_line.join(invalid_length_ids)}"
        if message != "":
            return _error_message(message)
        return {"status": "success"}

    def unique_ids(self):
        ids = [sequence.id for sequence in self.fasta]
        return len(set(ids)) == len(ids)

    def is_fasta(self):
        return self.fasta is not None

    def less_than_n(self):
        return len(self.fasta) <= self.max_number_sequences

    def more_than_n(self):
        return len(self.fasta) >= self.min_number_sequences

    def invalid_proteins(self):
        invalid_ids = []
        aa_regex = re.compile(f"[{AMINOACID_ALPHABET}]+")
        for record in self.fasta:
            if not aa_regex.fullmatch(str(record.seq).upper()):
                invalid_ids.append(record.id)
        return invalid_ids

    def invalid_lengths(self):
        invalid_ids = []
        for row in self.fasta:
            sequence = row.seq
            if len(sequence) > self.max_length or len(sequence) < 2:
                invalid_ids.append(row.id)
        return invalid_ids


class Interface:
    def __init__(self, request):
        self.request = request
        self.post_json = None
        self.post_file = None
        self.data = None
        self.options = None
        self.is_json = False
        self.is_file = False

    def parse_json_and_file(self):
        try:
            self.post_json = self.request.json
            self.data = self.post_json["data"]
            self.is_json = True
            return
        except (Exception, AttributeError):
            self.post_json = None

        try:
            self.post_file = self.request.files
            self.data = self.post_file["file"]
            self.is_file = True
        except (Exception, AttributeError):
            self.post_file = None

    def parse_options(self):
        if self.post_json is not None:
            self.options = self.post_json["options"]
        elif self.post_file is not None:
            self.options = ast.literal_eval(
                self.post_file["options"].read().decode("utf-8")
            )

    def parse_with_options(self):
        self.parse_json_and_file()
        self.parse_options()
        return self.data, self.options, self.is_file

    def parse_without_options(self):
        self.parse_json_and_file()
        return self.data, self.is_file


class Folders:
    def __init__(self, config_file):
        # read config file and asign folder names.
        self.config = configparser.ConfigParser()
        self.config.read(config_file)
        self.db = Database(self.config)

    def create_folders(self):
        # create folders
        for f in (
            "temp_folder",
            "static_folder",
            "alignments_folder",
            "downloads_folder",
            "results_folder",
            "blastdb_folder"
        ):
            Path(self.config["folders"][f]).mkdir(parents=True, exist_ok=True)
        if "peptipedia.fasta.phr" not in os.listdir(self.config["folders"]["blastdb_folder"]):
            #self.makeblastdb()
            pass

    def get_static_folder(self):
        return self.config["folders"]["static_folder"]
    
    def makeblastdb(self):
        os.system(f"""makeblastdb -in {self.config["folders"]["blastdb_folder"]}/peptipedia.fasta -dbtype prot""")
        print("creado")
def _error_message(message):
    return {"status": "error", "description": message}

def parse_fasta(text):
    fasta_regex = re.compile(r">([^\n]+)\n([^>]+)")
    return [
        {"id": seq_id, "sequence": seq.replace("\n", "").upper()}
        for seq_id, seq in fasta_regex.findall(text)
    ]
