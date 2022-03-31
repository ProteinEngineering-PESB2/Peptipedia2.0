import pandas as pd
import multiprocessing as mp
import numpy as np
from scipy.fft import fft

class run_fft_encoding(object):

    def __init__(self, dataset, type_property, path_encoders, zero_padding):
        self.dataset = dataset
        self.type_property = type_property
        self.path_encoders = path_encoders
        self.zero_padding = zero_padding

        self.list_clusters = ["alpha-structure_group", "betha-structure_group", "energetic_group", "hydropathy_group",
                              "hydrophobicity_group", "index_group", "secondary_structure_properties_group", "volume_group"]
        self.dataset_cluster = pd.read_csv(
            "{}{}/data_component.csv".format(self.path_encoders, self.type_property))
        self.df_encoding = None
        self.df_fft_encoding = None

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
        pool.close()
        pool.join()

    def appy_fft(self):

        matrix_encoding = []
        index_data = []
        print(self.df_encoding)
        self.df_encoding.reset_index(inplace=True, drop=True)
        for i in range(len(self.df_encoding)):
            # get a sequences
            sequence_encoding = [self.df_encoding[key][i] for key in self.df_encoding.keys() if key[0] == "P"]
            index_data.append(self.df_encoding['id_sequence'][i])

            number_sample = len(sequence_encoding)

            # sample spacing
            T = 1.0 / float(number_sample)
            x = np.linspace(0.0, number_sample * T, number_sample)
            yf = fft(sequence_encoding)
            xf = np.linspace(0.0, 1.0 / (2.0 * T), number_sample // 2)
            matrix_encoding.append(np.abs(yf[0:number_sample // 2]))

        header = ["P_" + str(i + 1) for i in range(len(matrix_encoding[0]))]
        self.df_fft_encoding = pd.DataFrame(matrix_encoding, columns=header)
        self.df_fft_encoding['id'] = index_data

