from random import random
class fasta_convertor:
    def __init__(self, static, text, limit):
        self.text = text
        self.limit = limit
        self.fasta_path = static + "/" + str(round(random()*10**20)) + ".fasta"
    
    def convert(self):
        self.fasta_text = ""
        for i, row in enumerate(self.text.split("\n")):
            res = ">sequence " + str(i) + "\n" + "\n".join(
                [row[y - self.limit:y] for y in range(self.limit, len(row) + self.limit, self.limit)]
                ) + "\n"
            self.fasta_text += res
        return self.fasta_text
    
    def save_file(self):
        f = open(self.fasta_path, "w")
        f.write(self.fasta_text)
        f.close()
        return self.fasta_path