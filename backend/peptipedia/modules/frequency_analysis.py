"""Frequency analysis module"""

import pandas as pd
from Bio import SeqIO

from peptipedia.modules.utils import ConfigTool


class FrequencyAnalysis(ConfigTool):
    """Frequency Analysis class"""

    def __init__(self, data, is_file, config):
        super().__init__("frequency", data, config, is_file, not is_file)
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
        json_file_path = self.temp_file_path.replace(".fasta", ".json").split("/")[-1]
        self.output_path = f"{self.temp_folder}/frequency/{json_file_path}"
        self.dict_counts_seq = []

    def count_canonical_residues(self, sequence):
        """Count canonical residues in a specific aa sequence"""
        sequence = sequence.upper()
        dict_counts = {
            residue: sequence.count(residue) for residue in self.canonical_residues
        }
        return dict_counts

    def exec_process(self):
        """Calls to count_canonical_residues in all sequences"""
        records = list(SeqIO.parse(self.temp_file_path, "fasta"))
        for record in records:
            sequence = str(record.seq)
            id_sequence = record.id
            self.dict_counts_seq.append(
                {
                    "id_seq": id_sequence,
                    "counts": self.count_canonical_residues(sequence),
                }
            )
        self.delete_file()
        return self.dict_counts_seq

    def get_average(self):
        """Get statistics of counts"""
        df_counts = pd.json_normalize(self.dict_counts_seq, max_level=1)
        df_counts.drop(["id_seq"], inplace=True, axis=1)
        df_counts.rename(
            columns={a: a.replace("counts.", "") for a in df_counts.columns},
            inplace=True,
        )
        description = df_counts.describe().round(2)
        error = description.loc["std"] / 2
        return {
            "X": description.columns.tolist(),
            "Y": description.loc["mean"].to_list(),
            "error": error.to_list(),
        }
