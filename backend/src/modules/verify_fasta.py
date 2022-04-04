from Bio import SeqIO

class verify_fasta:
    def __init__(self, path, max_number_sequences, min_number_sequences = 1):
        self.path = path
        self.max_number_sequences = max_number_sequences
        self.min_number_sequences = min_number_sequences
        try:
            self.fasta = list(SeqIO.parse(self.path, "fasta"))
            SeqIO.write(self.fasta, self.path, "fasta")
        except:
            self.fasta = [False]

    def verify(self):
        if self.is_fasta():
            if self.less_than_n():
                if self.more_than_n():
                    if self.is_protein():
                        return {"status": "success"}
                    else:
                        return {"status": "error", "description": "Not proteins"}
                else:
                    return {"status": "error", "description": "Too few sequences"}
            else:
                return {"status": "error", "description": "Too much sequences"}
        else:
            return {"status": "error", "description": "Not a fasta file / ASCII error"}

    def is_fasta(self):
        return any(self.fasta)
    
    def less_than_n(self):
        length = len(self.fasta)
        if length <= self.max_number_sequences:
            return True
        return False

    def more_than_n(self):
        length = len(self.fasta)
        if length >= self.min_number_sequences:
            return True
        return False

    def is_protein(self):
        alphabet = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y',
                    'a', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y']
        for record in self.fasta:
            for letter in str(record.seq):
                if letter not in alphabet:
                    return False
        return True