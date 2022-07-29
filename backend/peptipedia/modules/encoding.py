import os
import subprocess
from random import random

import pandas as pd

from peptipedia.modules.encoding_strategies.run_fft_encoding import run_fft_encoding
from peptipedia.modules.encoding_strategies.run_one_hot import run_one_hot
from peptipedia.modules.encoding_strategies.run_physicochemical_properties import (
    run_physicochemical_properties,
)
from peptipedia.modules.utils import ConfigTool


class encoding(ConfigTool):
    def __init__(self, data, options, is_file, is_json, config):
        super().__init__("encoding", data, config, is_file, is_json)
        self.rand_name = str(round(random() * 10**20))
        self.results_folder = "{}/{}".format(
            config["folders"]["static_folder"], self.rand_name
        )
        os.mkdir(self.results_folder)

        self.one_hot_encoding = options["one_hot_encoding"]
        self.phisicochemical_properties = options["phisicochemical_properties"]
        self.digital_signal_processing = options["digital_signal_processing"]
        self.temp_csv = "{}/{}_codifications.csv".format(
            self.temp_folder, self.rand_name
        )
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
        self.path_config_aaindex_encoder = config["folders"]["path_aa_index"]

    def get_longest(self):
        return self.data.sequence.str.len().max()

    def process(self):
        f = open(self.temp_file_path, "r")
        self.data = self.create_df(f.read())
        f.close()
        if self.one_hot_encoding:
            one_hot = run_one_hot(self.data)
            result = one_hot.run_parallel_encoding()
            result.to_csv("{}/one_hot_encoding.csv".format(self.results_folder))
        if self.phisicochemical_properties:
            os.mkdir("{}/physicochemical_properties".format(self.results_folder))
            for selected_property in self.list_clusters:
                physicochemical_encoding = run_physicochemical_properties(
                    self.data, selected_property, self.path_config_aaindex_encoder
                )
                result = physicochemical_encoding.run_parallel_encoding()
                result.to_csv(
                    "{}/physicochemical_properties/{}.csv".format(
                        self.results_folder, selected_property
                    )
                )
        if self.digital_signal_processing:
            os.mkdir("{}/digital_signal_processing".format(self.results_folder))
            for selected_property in self.list_clusters:
                fft_encoding = run_fft_encoding(
                    self.data, selected_property, self.path_config_aaindex_encoder
                )
                fft_encoding.run_parallel_encoding()
                result = fft_encoding.appy_fft()
                result.to_csv(
                    "{}/digital_signal_processing/{}.csv".format(
                        self.results_folder, selected_property
                    )
                )
        self.compress()
        return self.results_folder + ".zip"

    def compress(self):
        command = ["zip", "-r", self.results_folder + ".zip", self.results_folder]
        subprocess.check_output(command)
