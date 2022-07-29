import ast
import configparser
import re
from pathlib import Path
from random import random

import pandas as pd
from Bio import SeqIO

AMINOACID_ALPHABET = "ARNDCEQGHILKMFPSTWYVX*"


class ConfigTool:
    def __init__(
        self, config_module_name, data, config, is_file, is_json, is_fasta=True
    ):
        self.data = data
        self.temp_folder = config["folders"]["temp_folder"]
        self.temp_file_path = "{}/{}".format(
            self.temp_folder, str(round(random() * 10**20))
        )
        self.temp_csv_file = None
        if is_fasta:
            self.temp_file_path += ".fasta"
        else:
            self.temp_file_path += ".csv"
        if is_json:
            self.create_file()
        elif is_file:
            self.save_file()
        if is_fasta:
            self.check = FastaFile(
                self.temp_file_path,
                int(config[config_module_name]["max_sequences"]),
                int(config[config_module_name]["min_sequences"]),
            ).verify()
        else:
            self.check = CsvFile(
                self.temp_file_path,
                int(config[config_module_name]["max_sequences"]),
                int(config[config_module_name]["min_sequences"]),
            ).verify()

    def create_file(self):
        with open(self.temp_file_path, "w") as f:
            f.write(self.data)

    def save_file(self):
        self.data.save(self.temp_file_path)

    def delete_file(self):
        try:
            os.remove(self.temp_file_path)
        except Exception as e:
            print(e)

    def create_csv_from_fasta(self):
        self.temp_csv_file = (
            self.temp_folder + "/" + str(round(random() * 10**20)) + ".fasta"
        )
        with open(self.temp_file_path, "r") as f:
            data = f.read()
        with open(self.temp_csv_file, "w") as f:
            for record in parse_fasta(data):
                f.write(">{id}\n{sequence}\n".format(**record))

    @staticmethod
    def create_df(fasta):
        # Create a dataframe from fasta text
        return pd.DataFrame(parse_fasta(fasta))


class CsvFile:
    def __init__(self, path, max_number_sequences, min_number_sequences=1):
        self.path = path
        self.max_number_sequences = max_number_sequences
        self.min_number_sequences = min_number_sequences
        try:
            self.data = pd.read_csv(self.path)
        except:
            self.data = None

    def verify(self):
        if not self.is_csv():
            return _error_message("Not a csv file / ASCII error")
        if not self.null_values():
            return _error_message("Data has null values")
        if not self.correct_columns():
            return _error_message("Incorrect columns")
        if not self.unique_ids():
            return _error_message("Duplicated ids")
        if not self.less_than_n():
            return _error_message("Too many sequences")
        if not self.more_than_n():
            return _error_message("Too few sequences")
        if len(invalid_protein_ids := self.invalid_proteins()) > 0:
            return _error_message(f"Not protein (ids={','.join(invalid_protein_ids)})")
        if len(invalid_length_ids := self.invalid_lengths()) > 0:
            return _error_message(
                f"Invalid length (ids={','.join(invalid_length_ids)})"
            )

        return {"status": "success"}

    def unique_ids(self):
        return self.data.duplicates("id").sum() > 0

    def correct_columns(self):
        return list(self.data.columns) == ["id", "sequence", "target"]

    def is_csv(self):
        return self.data is not None

    def less_than_n(self):
        return len(self.data) <= self.max_number_sequences

    def more_than_n(self):
        return len(self.data) >= self.min_number_sequences

    def invalid_proteins(self):
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
            if len(sequence) > 150 or len(sequence) < 2:
                invalid_ids.append(row.id)
        return invalid_ids

    def null_values(self):
        return self.data.isnull().any(axis=1).sum() > 0


class FastaFile:
    def __init__(self, path, max_number_sequences, min_number_sequences=1):
        self.path = path
        self.max_number_sequences = max_number_sequences
        self.min_number_sequences = min_number_sequences
        try:
            self.fasta = list(SeqIO.parse(self.path, "fasta"))
            SeqIO.write(self.fasta, self.path, "fasta")
        except:
            self.fasta = None

    def verify(self):
        if not self.is_fasta():
            return _error_message("Not a fasta file / ASCII error")
        if not self.unique_ids():
            return _error_message("Duplicated ids")
        if not self.less_than_n():
            return _error_message("Too many sequences")
        if not self.more_than_n():
            return _error_message("Too few sequences")
        if len(invalid_protein_ids := self.invalid_proteins()) > 0:
            return _error_message(f"Not protein (ids={','.join(invalid_protein_ids)})")
        if len(invalid_length_ids := self.invalid_lengths()) > 0:
            return _error_message(
                f"Invalid length (ids={','.join(invalid_length_ids)})"
            )

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
            if len(sequence) > 150 or len(sequence) < 2:
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
        return self.data, self.options, self.is_json, self.is_file

    def parse_without_options(self):
        self.parse_json_and_file()
        return self.data, self.is_json, self.is_file


class Folders:
    def __init__(self, config_file):
        # read config file and asign folder names.
        self.config = configparser.ConfigParser()
        self.config.read(config_file)

    def create_folders(self):
        # create folders
        for f in (
            "temp_folder",
            "static_folder",
            "alignments_folder",
            "downloads_folder",
            "results_folder",
        ):
            Path(self.config["folders"][f]).mkdir(parents=True, exist_ok=True)
        # check if aa_index directory exists
        if not Path(self.config["folders"]["path_aa_index"]).is_dir():
            exit()

    def get_static_folder(self):
        return self.config["folders"]["static_folder"]


def _error_message(message):
    return {"status": "error", "description": message}


def parse_fasta(text):
    fasta_regex = re.compile(r">(\w+)\n([^>]+)")
    return [
        {"id": seq_id, "sequence": seq.replace("\n", "").upper()}
        for seq_id, seq in fasta_regex.findall(text)
    ]
