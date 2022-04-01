import pandas as pd
import multiprocessing as mp
import numpy as np

class run_physicochemical_properties(object):
    def __init__(self, dataset, selected_property, zero_padding, path_input_cluster):
        self.dataset = dataset
        self.selected_property = selected_property
        self.zero_padding = zero_padding
        self.list_clusters = ["alpha-structure_group", "betha-structure_group", "energetic_group", "hydropathy_group", "hydrophobicity_group", "index_group", "secondary_structure_properties_group", "volume_group"]
        self.dataset_cluster = pd.read_csv("{}{}/data_component.csv".format(path_input_cluster, self.selected_property))
        self.df_encoding = None

    def encoding_data_paralel(self, dataset):

        matrix_sequence_encoding = []

        index_sequences = []
        index = 0

        for i in dataset.index:
            index_sequences.append(dataset['id'][i])
            sequence = dataset['sequence'][i]
            sequence = sequence.upper()
            sequence_encoding = self.encoding_sequence(sequence, self.dataset_cluster['component_1'])
            matrix_sequence_encoding.append(sequence_encoding)

        # make zero padding
        # create zero padding
        for i in range(len(matrix_sequence_encoding)):

            for j in range(len(matrix_sequence_encoding[i]), self.zero_padding):
                matrix_sequence_encoding[i].append(0)

        header = ["P_" + str(i) for i in range(len(matrix_sequence_encoding[0]))]
        dataset_export = pd.DataFrame(matrix_sequence_encoding, columns=header)
        dataset_export['id_sequence'] = index_sequences

        return dataset_export

    def encoding_sequence(self, sequence, value_property):

        # order in database
        array_residues = ['A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y',
                          'V']
        sequence_encoding = []

        for residue in sequence:
            encoding_value = -1
            index = -1
            for i in range(len(array_residues)):
                if array_residues[i] == residue:
                    index = i
                    break
            if index != -1:
                sequence_encoding.append(value_property[index])

        return sequence_encoding

    def run_parallel_property(self):

        # get number of cpu
        cpu_number = mp.cpu_count()

        print('Dividiendo dataframe entre {} cores'.format(cpu_number))
        df_split = np.array_split(self.dataset, cpu_number)

        pool = mp.Pool(cpu_number)
        print("Ejecutando Codificacion...")
        self.df_encoding = pd.concat(pool.map(self.encoding_data_paralel, df_split))
        print(self.df_encoding)
        self.df_encoding.rename(columns={"id_sequence": "id"}, inplace=True)
        pool.close()
        pool.join()


