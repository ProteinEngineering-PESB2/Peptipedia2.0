import os
import subprocess
from random import random

import pandas as pd

from modules.utils import config_tool


class multiple_sequence_alignment(config_tool):
    def __init__(
        self,
        data,
        temp_folder,
        static_folder,
        is_file,
        is_json,
        max_sequences,
        min_number_sequences,
    ):
        super().__init__(
            data, temp_folder, is_file, is_json, max_sequences, min_number_sequences
        )
        self.output_path = static_folder
        self.output_file = os.path.realpath(
            "{}/{}.out".format(self.output_path, str(round(random() * 10**20)))
        )

    def execute_clustalo(self):
        command = [
            "clustalo",
            "-i",
            self.temp_file_path,
            "-o",
            self.output_file,
            "--full",
        ]
        subprocess.check_output(command)

        f = open(self.output_file, "r")
        output_text = f.read()
        f.close()

        sequences = output_text.split(">")
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
            dictionary["id"] = i + 1
            result.append(dictionary)
        self.delete_file()
        return result
