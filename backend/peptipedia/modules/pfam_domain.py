"""Pfam module"""
import os
import re
import subprocess

import pandas as pd

from peptipedia.modules.utils import ConfigTool


class Pfam(ConfigTool):
    """Pfam class"""
    def __init__(self, data, is_file, config):
        super().__init__("pfam", data, config, is_file)
        self.create_csv_from_fasta()

    def process(self):
        """Use pfam_scan and parse results"""
        command = [
            "pfam_scan.pl",
            "-dir",
            os.getenv("PFAM_DB"),
            "-fasta",
            self.temp_csv_file,
            "-cpu",
            "4",
        ]
        text = subprocess.check_output(command).decode()

        data = []
        for line in text.splitlines():
            if not line.startswith("#") and line != "":
                data.append(re.split(r"\s+", line.strip()))
        dataset = (
            pd.DataFrame(
                data,
                columns=[
                    "seq_id",
                    "alignment_start",
                    "alignment_end",
                    "envelope_start",
                    "envelope_end",
                    "hmm_acc",
                    "hmm_name",
                    "type",
                    "hmm_start",
                    "hmm_end",
                    "hmm_length",
                    "bit_score",
                    "e-value",
                    "significance",
                    "clan",
                ],
            )
            .filter(
                items=["seq_id", "hmm_acc", "hmm_name", "type", "bit_score", "e-value"]
            )
            .rename(
                columns={
                    "hmm_acc": "Id_accession",
                    "hmm_name": "Accession",
                    "bit_score": "Bitscore",
                    "type": "Class",
                    "e-value": "Evalue",
                }
            )
            .assign(Type="")
        )

        response = []
        for seq_id in dataset.seq_id.unique():
            data = (
                dataset.query("seq_id == @seq_id")
                .drop(columns="seq_id")
                .to_dict(orient="records")
            )
            response.append({"id": seq_id, "data": data})

        self.delete_file()
        return response
