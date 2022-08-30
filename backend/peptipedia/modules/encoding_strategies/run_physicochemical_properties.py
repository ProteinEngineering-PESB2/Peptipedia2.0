"""Physicochemical properties encoding module"""
import pandas as pd

from peptipedia.modules.encoding_strategies.encoder import Encoder


class RunPhysicochemicalProperties(Encoder):
    """Physicochemical properties class"""
    def __init__(self, dataset, selected_property, df_encoder):
        super().__init__(dataset)
        self.encoding_row = df_encoder[df_encoder.name == selected_property]

    def encoding_data(self, dataset):
        """Encode data"""
        matrix_sequence_encoding = []
        for row in dataset.iterrows():
            row = row[1]
            sequence = row.sequence
            sequence = sequence.upper()
            sequence_encoding = self.encoding_sequence(sequence)
            matrix_sequence_encoding.append(sequence_encoding)
        dataset_export = pd.DataFrame(matrix_sequence_encoding)
        dataset.reset_index(drop=True, inplace=True)
        dataset_export["id"] = dataset["id"]
        return dataset_export

    def encoding_sequence(self, sequence):
        """Encode sequence"""
        sequence_encoding = []
        sequence = sequence.lower()
        for residue in sequence:
            try:
                residue_value = self.encoding_row[residue].values[0]
                sequence_encoding.append(residue_value)
            except:
                pass
        return sequence_encoding
