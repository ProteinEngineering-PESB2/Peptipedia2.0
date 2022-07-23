import subprocess
from re import split

import pandas as pd

from modules.utils import config_tool


class alignment(config_tool):
    def __init__(
        self,
        data,
        temp_folder,
        static_folder,
        is_file,
        is_json,
        max_sequences,
        min_number_sequences=1,
    ):
        super().__init__(
            data, temp_folder, is_file, is_json, max_sequences, min_number_sequences
        )
        self.output_path = "{}/alignments/{}".format(
            static_folder,
            self.temp_file_path.replace(".fasta", ".align").split("/")[-1],
        )

    def execute_blastp(self):
        command = [
            "blastp",
            "-db",
            "peptipedia/peptipedia",
            "-query",
            self.temp_file_path,
            "-evalue",
            "0.5",
            "-out",
            self.output_path,
        ]
        subprocess.check_output(command)
        return self.output_path

    def parse_response(self):
        f = open(self.output_path, "r")
        res = f.read()
        f.close()
        inicio = res.find("Value") + 7
        text = res[inicio:]
        fin = text.find("\n\n")
        text = text[:fin]
        splitted = [row for row in text.splitlines() if row != ""]
        data = []
        for row in splitted:
            row_splitted = [a for a in split("\s+", row) if a != ""]
            data.append(
                [row_splitted[0], float(row_splitted[-2]), float(row_splitted[-1])]
            )
        new_text = [
            row.strip() for row in res[inicio + fin :].split("\n>") if row.strip() != ""
        ]
        df = pd.DataFrame(data, columns=["id", "score", "e_value"])
        for index, row in enumerate(new_text):
            details_inicio = row.find("Identities =")
            details_final = row.find("\n\nQuery")
            details_text = row[details_inicio:details_final]
            row_details = []
            for detail in details_text.split(","):
                per_inicio = detail.find("(")
                percentaje = detail[per_inicio + 1 : -1]
                float_percentaje = float(percentaje.replace("%", "")) / 100
                row_details.append(float_percentaje)
            df.loc[index, "identity"] = row_details[0]
            df.loc[index, "similarity"] = row_details[1]
            df.loc[index, "gaps"] = row_details[2]
        self.ids = df.id.tolist()
        return {"data": df.values.tolist(), "columns": df.columns.tolist()}

    def get_alignments(self):
        f = open(self.output_path, "r")
        res = f.read()
        f.close()
        id_query = res.split("Query= ")[1].split(" ")[0]
        # print(id_query)
        splitted = res.split(">")
        response = {}
        for id, j in zip(self.ids, splitted[1:]):
            alignment = {}
            inicio = j.find("Query")
            row = j[inicio:]
            query = "".join(
                [split("\s+", q)[2] for q in row.split("\n") if "Query" in q]
            )
            sbjct = "".join(
                [split("\s+", sb)[2] for sb in row.split("\n") if "Sbjct" in sb]
            )
            response[id] = [
                {"id": 1, "label": id, "sequence": sbjct},
                {"id": 2, "label": id_query, "sequence": query},
            ]
        return response
