import json
import os
import re
import subprocess

import pandas as pd

from peptipedia.modules.utils import ConfigTool


class pfam(ConfigTool):
    def __init__(self, data, is_file, is_json, config):
        super().__init__("pfam", data, config, is_file, is_json)
        self.create_csv_from_fasta()

    def process(self):
        command = [
            "pfam_scan.pl",
            "-dir",
            os.getenv("PFAM_DB"),
            "-fasta",
            self.temp_csv_file,
        ]
        text = subprocess.check_output(command).decode()
        data = []
        for i in text.splitlines():
            result = re.sub(r"\s+", "\t", i).strip()
            data.append(result.split("\t"))
        dataset = pd.DataFrame(
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
                "clan",
                "predicted_active_site_residues",
            ],
        )
        dataset = dataset[
            ["seq_id", "hmm_acc", "hmm_name", "type", "bit_score", "e-value"]
        ]
        dataset.rename(
            columns={
                "hmm_acc": "Id_accession",
                "hmm_name": "Pfam",
                "bit_score": "Bitscore",
                "type": "Class",
                "e-value": "Evalue",
                "hmm_name": "Accession",
            },
            inplace=True,
        )
        dataset["Type"] = ""
        json_dataset = json.loads(dataset.to_json(orient="records"))
        response = []
        for id in dataset.seq_id.unique():
            response_dict = {"id": id, "data": []}
            for j in json_dataset:
                if j["seq_id"] == id:
                    dict_copy = j.copy().pop("seq_id")
                    response_dict["data"].append(dict_copy)
            response.append(response_dict)
        self.delete_file()

        return response
