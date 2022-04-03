import pandas as pd
import multiprocessing as mp
import numpy as np

class run_one_hot(object):

    def __init__(self, dataset, length_zero_padding):
        self.dataset = dataset
        self.length_zero_padding = length_zero_padding
        self.df_encoding = None

    def create_vector(self, residue, dict_residues):
        vector_encoding = [0 for x in range(20)]
        vector_encoding[dict_residues[residue]] = 1
        return vector_encoding

    def prepare_data(self):
        residues = ["A", "R", "N", "D", "C", "Q", "E", "G", "H", "I", "L", "K", "M", "F", "P", "S", "T", "W", "Y", "V"]
        residues.sort()
        dict_residues = {}
        for i in range(len(residues)):
            dict_residues.update({residues[i]: i})

        return residues, dict_residues

    def encoding_data(self, dataset):
        # prepare data for encoding
        residues, dict_residues = self.prepare_data()

        id_sequences = []
        matrix_encoding = []
        for i in dataset.index:
            sequence = dataset['sequence'][i]
            id_sequences.append(dataset['id'][i])

            # ignored non canonical residues
            for residue in sequence:
                if residue not in residues:
                    sequence = sequence.replace(residue, "")

            row_encoding = []

            for residue in sequence:
                residue_encoding = self.create_vector(residue, dict_residues)
                for data in residue_encoding:
                    row_encoding.append(data)

            matrix_encoding.append(row_encoding)

        # create zero padding
        for i in range(len(matrix_encoding)):

            for j in range(len(matrix_encoding[i]), self.length_zero_padding):
                matrix_encoding[i].append(0)

        header = ["P_" + str(i) for i in range(len(matrix_encoding[0]))]

        dataset_export = pd.DataFrame(matrix_encoding)
        dataset.reset_index(drop=True, inplace=True)
        dataset_export["id"] = dataset["id"]
        return dataset_export

    def run_parallel_encoding(self):

        # get number of cpu
        cpu_number = mp.cpu_count()

        print('Dividiendo dataframe entre {} cores'.format(cpu_number))
        df_split = np.array_split(self.dataset, cpu_number)
        
        pool = mp.Pool(cpu_number)
        print("Ejecutando Codificacion...")
        self.df_encoding = pd.concat(pool.map(self.encoding_data, df_split))
        self.df_encoding.rename(columns=dict( (col, "P_" + str(col)) for col in self.df_encoding.columns if type(col) == int), inplace=True)
        self.df_encoding.fillna(0, inplace=True)
        self.df_encoding.round(0)
        self.df_encoding = self.df_encoding.astype(int, errors='ignore')
        pool.close()
        pool.join()


