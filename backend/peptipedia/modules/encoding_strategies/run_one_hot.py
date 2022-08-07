"""One Hot Encoding module"""
import pandas as pd
from peptipedia.modules.encoding_strategies.encoder import Encoder

class RunOneHotEncoding(Encoder):
    """One Hot Encoding class"""
    def __init__(self, dataset):
        super().__init__(dataset)
        self.residues.sort()
        self.prepare_data()

    def create_vector(self, residue, dict_residues):
        """Create aminoacids vector"""
        vector_encoding = [0 for x in range(20)]
        vector_encoding[dict_residues[residue]] = 1
        return vector_encoding

    def prepare_data(self):
        """Prepare data"""
        self.dict_residues = {}
        for index, value in enumerate(self.residues):
            self.dict_residues.update({value: index})
        
    def encoding_data(self, dataset):
        """Encode data"""
        id_sequences = []
        matrix_encoding = []
        for row in dataset.iterrows():
            row = row[1]
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
