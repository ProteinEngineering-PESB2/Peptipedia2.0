
import numpy as np
import pandas as pd

from peptipedia.modules.encoding_strategies.encoder import encoder


class run_physicochemical_properties(encoder):
    def __init__(self, dataset, selected_property, path_input_cluster):
        super().__init__(dataset)
        self.list_clusters = [
            "alpha-structure_group",
            "betha-structure_group",
            "energetic_group",
            "hydropathy_group",
            "hydrophobicity_group",
            "index_group",
            "secondary_structure_properties_group",
            "volume_group",
        ]
        self.selected_property = selected_property
        if self.selected_property in self.list_clusters:
            self.dataset_cluster = pd.read_csv(
                "{}{}/data_component.csv".format(
                    path_input_cluster, self.selected_property
                )
            )
        else:
            print("Property {} not found".format(self.selected_property))

    def encoding_data(self, dataset):
        matrix_sequence_encoding = []
        for index, row in dataset.iterrows():
            sequence = row.sequence
            sequence = sequence.upper()
            sequence_encoding = self.encoding_sequence(
                sequence, self.dataset_cluster["component_1"]
            )
            matrix_sequence_encoding.append(sequence_encoding)
        dataset_export = pd.DataFrame(matrix_sequence_encoding)
        dataset.reset_index(drop=True, inplace=True)
        dataset_export["id"] = dataset["id"]
        return dataset_export

    def encoding_sequence(self, sequence, value_property):
        sequence_encoding = []
        for residue in sequence:
            try:
                residue_index = self.residues.index(residue)
                sequence_encoding.append(value_property[residue_index])
            except:
                pass
        return sequence_encoding
