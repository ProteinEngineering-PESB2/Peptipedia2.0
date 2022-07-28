import numpy as np
from Bio import SeqIO

from peptipedia.modules.utils import ConfigTool


class frequency_analysis(ConfigTool):
    def __init__(self, data, is_file, is_json, config):
        super().__init__("frequency", data, config, is_file, is_json)
        self.canonical_residues = [
            "A",
            "R",
            "N",
            "D",
            "C",
            "E",
            "Q",
            "G",
            "H",
            "I",
            "L",
            "K",
            "M",
            "F",
            "P",
            "S",
            "T",
            "W",
            "Y",
            "V",
        ]
        self.output_path = "{}/frequency/{}".format(
            config["folders"]["temp_folder"],
            self.temp_file_path.replace(".fasta", ".json").split("/")[-1],
        )

    def count_canonical_residues(self, sequence):
        sequence = sequence.upper()
        dict_counts = {
            residue: sequence.count(residue) for residue in self.canonical_residues
        }
        return dict_counts

    def exec_process(self):
        records = list(SeqIO.parse(self.temp_file_path, "fasta"))
        dict_counts_seq = []
        for record in records:
            sequence = str(record.seq)
            id_sequence = record.id
            dict_counts_seq.append(
                {
                    "id_seq": id_sequence,
                    "counts": self.count_canonical_residues(sequence),
                }
            )
        self.delete_file()
        return dict_counts_seq
