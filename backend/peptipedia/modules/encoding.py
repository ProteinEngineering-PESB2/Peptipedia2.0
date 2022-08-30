"""Encoding module"""
import os
import subprocess
from random import random

from peptipedia.modules.encoding_strategies.run_fft_encoding import RunFftEncoding
from peptipedia.modules.encoding_strategies.run_one_hot import RunOneHotEncoding
from peptipedia.modules.encoding_strategies.run_physicochemical_properties import (
    RunPhysicochemicalProperties,
)
from peptipedia.modules.utils import ConfigTool


class Encoding(ConfigTool):
    """Encoding class"""
    def __init__(self, data, options, is_file, config, db):
        super().__init__("encoding", data, config, is_file)
        self.rand_name = str(round(random() * 10**20))
        static_folder = config["folders"]["static_folder"]
        self.results_folder = f"{static_folder}/{self.rand_name}"
        os.mkdir(self.results_folder)
        self.options = options
        self.temp_csv = f"{self.temp_folder}/{self.rand_name}_codifications.csv"
        self.df_encoder = db.get_encoder()

    def process(self):
        """Encoding process"""
        with open(self.temp_file_path, "r", encoding="utf-8") as file:
            self.data = self.create_df(file.read())
        if self.options["one_hot_encoding"]:
            one_hot = RunOneHotEncoding(self.data)
            result = one_hot.run_parallel_encoding()
            result.to_csv(f"{self.results_folder}/one_hot_encoding.csv")
        if self.options["phisicochemical_properties"]:
            os.mkdir(f"{self.results_folder}/physicochemical_properties")
            for selected_property in self.df_encoder.name:
                physicochemical_encoding = RunPhysicochemicalProperties(
                    self.data, selected_property,
                    self.df_encoder
                )
                result = physicochemical_encoding.run_parallel_encoding()
                result.to_csv(
                    f"{self.results_folder}/physicochemical_properties/{selected_property}.csv"
                )
        if self.options["digital_signal_processing"]:
            os.mkdir(f"{self.results_folder}/digital_signal_processing")
            for selected_property in self.df_encoder.name:
                fft_encoding = RunFftEncoding(
                    self.data, selected_property,
                    self.df_encoder
                )
                fft_encoding.run_parallel_encoding()
                result = fft_encoding.appy_fft()
                result.to_csv(
                    f"{self.results_folder}/digital_signal_processing/{selected_property}.csv"
                )
        self.compress()
        return self.results_folder + ".zip"

    def compress(self):
        """Use zip package for to get a compress of encoding"""
        command = ["zip", "-r", self.results_folder + ".zip", self.results_folder]
        subprocess.check_output(command)
