import pandas as pd

from peptipedia.modules.encoding_strategies.encoder import encoder


class run_one_hot(encoder):
    def __init__(self, dataset):
        super().__init__(dataset)
        self.residues.sort()
        self.prepare_data()

    def create_vector(self, residue, dict_residues):
        vector_encoding = [0 for x in range(20)]
        vector_encoding[dict_residues[residue]] = 1
        return vector_encoding

    def prepare_data(self):
        self.dict_residues = {}
        for i in range(len(self.residues)):
            self.dict_residues.update({self.residues[i]: i})

    def encoding_data(self, dataset):
        id_sequences = []
        matrix_encoding = []
        for index, row in dataset.iterrows():
            sequence = row.sequence
            id_sequences.append(row.id)
            for residue in sequence:
                if residue not in self.residues:
                    sequence = sequence.replace(residue, "")
            row_encoding = []
            for residue in sequence:
                residue_encoding = self.create_vector(residue, self.dict_residues)
                for data in residue_encoding:
                    row_encoding.append(data)
            matrix_encoding.append(row_encoding)
        dataset_export = pd.DataFrame(matrix_encoding)
        dataset.reset_index(drop=True, inplace=True)
        dataset_export["id"] = dataset["id"]
        return dataset_export
