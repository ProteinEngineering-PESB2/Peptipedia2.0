from random import random
import pandas as pd
from modules.clustering_methods import clustering_algorithm, evaluation_performances
from modules.encoding_strategies import run_fft_encoding, run_one_hot, run_physicochemical_properties
from modules.utils import config_tool
import json
from scipy import stats
from modules.training_supervised_learning.run_algorithm import run_algorithm
from joblib import dump, load
from modules.database import database

from modules.utils import config_tool
from datetime import date

class supervised_algorithms(config_tool):
    def __init__(self, data, options, static_folder, temp_folder, is_file, is_json, max_sequences, min_number_sequences, path_aa_index):
        super().__init__(data, temp_folder, is_file, is_json, max_sequences, min_number_sequences, is_fasta = False)
        self.dataset_encoded_path = "{}/{}.csv".format(static_folder, str(round(random()*10**20)))
        self.job_path = "{}/{}.joblib".format(static_folder, str(round(random()*10**20)))
        self.options = options
        self.dataset_encoded = None
        self.path_config_aaindex_encoder = path_aa_index
        self.task = self.options["task"]
        self.algorithm = self.options["algorithm"]
        self.validation = self.options["validation"]
        self.test_size = self.options["test_size"]
        self.data = pd.read_csv(self.temp_file_path)
        self.target = self.data.target
        self.data.drop("target", inplace=True, axis = 1)

    def run(self):
        self.process_encoding_stage()
        ids = self.dataset_encoded.id
        self.dataset_encoded.drop(["id"], axis = 1, inplace=True)
        run_instance = run_algorithm(self.dataset_encoded, self.target, self.task, self.algorithm, self.validation, self.test_size)
        response_training = run_instance.training_model()
        if self.test_size != 0:
            response_testing = run_instance.testing_model()
            if self.task == "regression":
                temp = response_testing["performance"]
                response_testing["performance_testing"] = temp
                del response_testing["performance"]

                temp = response_testing["corr"]
                response_testing["corr_testing"] = temp
                del response_testing["corr"]
                
                temp = response_testing["scatter"]
                response_testing["scatter_testing"] = temp
                del response_testing["scatter"]

                temp = response_testing["error_values"]
                response_testing["error_values_testing"] = temp
                del response_testing["error_values"]

            elif self.task == "classification":
                temp = response_testing["performance"]
                response_testing["performance_testing"] = temp
                del response_testing["performance"]

                temp = response_testing["confusion_matrix"]
                response_testing["confusion_matrix_testing"] = temp
                del response_testing["confusion_matrix"]

                temp = response_testing["analysis"]
                response_testing["analysis_testing"] = temp
                del response_testing["analysis"]

            response_training.update(response_testing)
        self.model = run_instance.get_model()
        self.dump_joblib()
        return response_training

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
    def dump_joblib(self):
        dump(self.model, self.job_path)

class use_model(config_tool):
    def __init__(self, data, options, temp_folder, static_folder, is_file, is_json, max_sequences, min_number_sequences, path_aa_index):
        super().__init__(data, temp_folder, is_file, is_json, max_sequences, min_number_sequences)
        self.path_config_aaindex_encoder = path_aa_index
        self.output_path = "{}/results/{}".format(static_folder, self.temp_file_path.replace(".fasta", ".align").split("/")[-1])
        self.options = options
        self.job_path = self.options["job_path"]
        self.model = load(self.job_path)
        
        
    def get_prediction(self):
        f = open(self.temp_file_path, "r")
        self.data = self.create_df(f.read())
        f.close()
        self.process_encoding_stage()
        self.dataset_encoded.drop(["id"], axis = 1, inplace=True)
        pending_columns = list(set(self.model.feature_names_in_) - set(self.dataset_encoded.columns))
        for column in pending_columns:
            self.dataset_encoded[column] = 0
        extra_columns = list(set(self.dataset_encoded.columns) - set(self.model.feature_names_in_))
        self.dataset_encoded.drop(extra_columns, axis = 1, inplace=True)

        prediction = self.model.predict(self.dataset_encoded)
        self.data["prediction"] = prediction
        self.data = self.data[["id", "prediction", "sequence"]]
        return {"status": "success", "data": self.data.values.tolist(), "columns": [i.capitalize() for i in self.data.columns.tolist()]}

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
