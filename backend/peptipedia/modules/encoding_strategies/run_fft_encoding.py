"""FFT encoding module"""
import numpy as np
import pandas as pd
from scipy.fft import fft

from peptipedia.modules.encoding_strategies.run_physicochemical_properties import (
    RunPhysicochemicalProperties,
)

class RunFftEncoding(RunPhysicochemicalProperties):
    """FFT encoding class"""
    def __init__(self, dataset, selected_property, df_encoder):
        super().__init__(dataset, selected_property, df_encoder)
        self.df_fft_encoding = None
        
    def appy_fft(self):
        """Apply fft method"""
        matrix_encoding = []
        self.df_encoding.reset_index(inplace=True, drop=True)
        for row in self.df_encoding.iterrows():
            row = row[1]
            sequence_encoding = [
                row[key] for key in self.df_encoding.columns if "P_" in key
            ]
            number_sample = len(sequence_encoding)
            #t_value = 1.0 / float(number_sample)
            #x = np.linspace(0.0, number_sample * t_value, number_sample)
            y_f = fft(sequence_encoding)
            #xf = np.linspace(0.0, 1.0 / (2.0 * t_value), number_sample // 2)
            matrix_encoding.append(np.abs(y_f[0 : number_sample // 2]))
        header = ["P_" + str(i) for i in range(len(matrix_encoding[0]))]
        self.df_fft_encoding = pd.DataFrame(matrix_encoding, columns=header)
        self.df_fft_encoding["id"] = self.dataset["id"]
        return self.df_fft_encoding
