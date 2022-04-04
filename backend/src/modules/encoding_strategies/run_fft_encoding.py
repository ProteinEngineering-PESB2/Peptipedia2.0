import pandas as pd
import multiprocessing as mp
import numpy as np
from scipy.fft import fft
from modules.encoding_strategies.run_physicochemical_properties import run_physicochemical_properties

class run_fft_encoding(run_physicochemical_properties):
    def __init__(self, dataset, selected_property, path_input_cluster):
        super().__init__(dataset, selected_property, path_input_cluster)

    def appy_fft(self):
        matrix_encoding = []
        self.df_encoding.reset_index(inplace=True, drop=True)
        for index, row in self.df_encoding.iterrows():
            sequence_encoding = [row[key] for key in self.df_encoding.columns if "P_" in key]
            number_sample = len(sequence_encoding)
            T = 1.0 / float(number_sample)
            x = np.linspace(0.0, number_sample * T, number_sample)
            yf = fft(sequence_encoding)
            xf = np.linspace(0.0, 1.0 / (2.0 * T), number_sample // 2)
            matrix_encoding.append(np.abs(yf[0:number_sample // 2]))
        header = ["P_" + str(i) for i in range(len(matrix_encoding[0]))]
        self.df_fft_encoding = pd.DataFrame(matrix_encoding, columns=header)
        self.df_fft_encoding['id'] = self.dataset["id"]
        return self.df_fft_encoding