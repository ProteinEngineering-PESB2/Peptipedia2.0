"""Encoder module"""
import multiprocessing as mp

import numpy as np
import pandas as pd

class Encoder:
    """Encoder class"""
    def __init__(self, dataset):
        self.residues = [
            "A",
            "R",
            "N",
            "D",
            "C",
            "Q",
            "E",
            "G",
            "H",
            "I",
            "L",
            "K",
            "M",
            "F",
            "P",
            "S",
            "T",
            "W",
            "Y",
            "V",
        ]
        self.dataset = dataset
        self.df_encoding = None
    def encoding_data(self, dataset):
        """Polimorfism function"""

    def run_parallel_encoding(self):
        """Encode data using self.encoding_data diferenciated function"""
        cpu_number = mp.cpu_count()
        df_split = np.array_split(self.dataset, cpu_number)
        with mp.Pool(cpu_number) as pool:
            self.df_encoding = pd.concat(pool.map(self.encoding_data, df_split))
        self.df_encoding.rename(
            columns=dict(
                (col, "P_" + str(col))
                for col in self.df_encoding.columns
                if isinstance(col, int)
            ),
            inplace=True,
        )
        new_columns = [col for col in self.df_encoding.columns if "P_" in col]
        new_columns.insert(0, "id")
        self.df_encoding = self.df_encoding[new_columns]
        self.df_encoding.fillna(0, inplace=True)
        self.df_encoding.round(0)
        self.df_encoding = self.df_encoding.astype(int, errors="ignore")
        return self.df_encoding
