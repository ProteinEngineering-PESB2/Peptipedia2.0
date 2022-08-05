"""Fasta convertor module"""
from random import random

class FastaConvertor:
    """Fasta convertor class"""
    def __init__(self, static, text, limit):
        self.text = text
        self.limit = limit
        self.fasta_path = static + "/" + str(round(random() * 10**20)) + ".fasta"
        self.alphabet = [
            "A",
            "R",
            "N",
            "D",
            "C",
            "Q",
            "E",
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
        self.fasta_text = ""

    def convert(self):
        """Transform text into fasta format"""
        splitted = [a.strip() for a in self.text.split("\n") if a.strip() != ""]
        for i, row in enumerate(splitted):
            row = "".join(
                [a for a in row if a in self.alphabet or a.upper() in self.alphabet]
            )
            row = row.upper()
            if len(row) > 0:
                res = (
                    ">sequence_"
                    + str(i)
                    + "\n"
                    + "\n".join(
                        [
                            row[y - self.limit : y]
                            for y in range(
                                self.limit, len(row) + self.limit, self.limit
                            )
                        ]
                    )
                    + "\n"
                )
                self.fasta_text += res
        return self.fasta_text

    def save_file(self):
        """Save file in specified path"""
        with open(self.fasta_path, "w", encoding = "utf-8") as file:
            file.write(self.fasta_text)
        return self.fasta_path
