from random import random
class fasta_convertor:
    def __init__(self, static, text, limit):
        self.text = text
        self.limit = limit
        self.fasta_path = static + "/" + str(round(random()*10**20)) + ".fasta"
        self.alphabet = ["A", "R", "N", "D", "C", "Q", "E", "G", "H", "I", "L", "K", "M", "F", "P", "S", "T", "W", "Y", "V"]
    
    def convert(self):
        self.fasta_text = ""
        splitted = [a.strip() for a in self.text.split("\n") if a.strip() != ""]
        for i, row in enumerate(splitted):
            row = "".join([a for a in row if a in self.alphabet or a.upper() in self.alphabet])
            row = row.upper()
            if len(row) > 0:
                res = ">sequence_" + str(i) + "\n" + "\n".join(
                    [row[y - self.limit:y] for y in range(self.limit, len(row) + self.limit, self.limit)]
                    ) + "\n"
                self.fasta_text += res
        return self.fasta_text
    
    def save_file(self):
        f = open(self.fasta_path, "w")
        f.write(self.fasta_text)
        f.close()
        return self.fasta_path