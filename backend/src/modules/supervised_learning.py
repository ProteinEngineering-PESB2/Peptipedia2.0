from random import random
import pandas as pd
from modules.clustering_methods import clustering_algorithm, evaluation_performances
from modules.encoding_strategies import run_fft_encoding, run_one_hot, run_physicochemical_properties
from modules.utils import config_tool
import json
from scipy import stats
from modules.training_supervised_learning.run_algorithm import run_algorithm

class supervised_algorithms(config_tool):
    def __init__(self, data, options, static_folder, temp_folder, is_file, is_json, max_sequences, min_number_sequences, path_aa_index):
        super().__init__(data, temp_folder, is_file, is_json, max_sequences, min_number_sequences, is_fasta = False)
        self.dataset_encoded_path = "{}/{}.csv".format(static_folder, str(round(random()*10**20)))
        self.options = options
        self.dataset_encoded = None
        self.path_config_aaindex_encoder = path_aa_index
        self.task = self.options["task"]
        self.algorithm = self.options["algorithm"]
        self.validation = self.options["validation"]
        self.data = pd.read_csv(self.temp_file_path)
        self.target = self.data.target
        self.data.drop("target", inplace=True, axis = 1)

    def run(self):
        self.process_encoding_stage()
        run_instance = run_algorithm(self.dataset_encoded, self.target, self.task, self.algorithm, self.validation)
        response = run_instance.training_model()
        print(response)
        return response

    def process_encoding_stage(self):
        encoding_option = self.options['encoding']
        
        if encoding_option == "one_hot_encoding":
            one_hot_encoding = run_one_hot.run_one_hot(self.data)
            self.dataset_encoded = one_hot_encoding.run_parallel_encoding()

        elif encoding_option == "phisicochemical_properties":
            physicochemical_encoding = run_physicochemical_properties.run_physicochemical_properties(self.data, self.options['selected_property'], self.path_config_aaindex_encoder)
            self.dataset_encoded = physicochemical_encoding.run_parallel_encoding()

        elif encoding_option == "digital_signal_processing":
            selected_property = self.options['selected_property']
            fft_encoding = run_fft_encoding.run_fft_encoding(self.data, selected_property, self.path_config_aaindex_encoder)
            fft_encoding.run_parallel_encoding()
            self.dataset_encoded = fft_encoding.appy_fft()