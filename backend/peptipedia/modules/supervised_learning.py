"""Supervised learning module"""
from random import random

import pandas as pd
from joblib import dump
from sklearn.preprocessing import (
    MinMaxScaler,
    StandardScaler,
    MaxAbsScaler,
    RobustScaler,
    QuantileTransformer
)

from peptipedia.modules.encoding_strategies import (
    run_fft_encoding,
    run_one_hot,
    run_physicochemical_properties,
)
from peptipedia.modules.training_supervised_learning.run_algorithm import run_algorithm
from peptipedia.modules.utils import ConfigTool

from peptipedia.modules.clustering_methods.transformation_data import transformer

class SupervisedLearning(ConfigTool):
    """Supervised Learning class"""
    def __init__(self, data, options, is_file, config):
        super().__init__(
            "supervised_learning", data, config, is_file, is_fasta=False
        )
        static_folder = config["folders"]["static_folder"]
        rand_number = str(round(random() * 10**20))
        self.dataset_encoded_path = f"{static_folder}/{rand_number}.csv"
        self.job_path = self.dataset_encoded_path.replace(".csv", ".joblib")
        self.options = options
        self.dataset_encoded = None
        self.path_config_aaindex_encoder = config["folders"]["path_aa_index"]
        self.task = self.options["task"]
        self.algorithm = self.options["algorithm"]
        self.validation = self.options["validation"]
        self.test_size = self.options["test_size"]
        self.kernel = self.options["kernel"]
        self.preprocessing = self.options["preprocessing"]
        self.transformer = transformer()
        self.data = pd.read_csv(self.temp_file_path)
        self.target = self.data.target
        self.data.drop("target", inplace=True, axis=1)
        self.model = None

    def run(self):
        """Runs encoding, preprocessing and build ML model"""
        self.process_encoding_stage()
        ids = self.dataset_encoded.id.values
        self.dataset_encoded.drop(["id"], axis=1, inplace=True)

        if self.preprocessing != "":
            self.preprocess()

        if self.kernel != "":
            self.pca()
        self.dataset_encoded["id"] = ids
        self.dataset_encoded.to_csv(self.dataset_encoded_path, index=False)
        self.dataset_encoded.drop(["id"], axis=1, inplace=True)
        run_instance = run_algorithm(
            self.dataset_encoded,
            self.target,
            self.task,
            self.algorithm,
            self.validation,
            self.test_size,
        )
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
        response_training.update({"encoding_path": self.dataset_encoded_path})
        self.model = run_instance.get_model()
        self.dump_joblib()
        self.dataset_encoded["id"] = ids
        self.dataset_encoded["sequence"] = self.data.sequence
        self.dataset_encoded["label"] = self.target
        self.dataset_encoded.to_csv(self.dataset_encoded_path, index=False)
        return response_training

    def process_encoding_stage(self):
        """Encoding process"""
        encoding_option = self.options["encoding"]
        if encoding_option == "one_hot_encoding":
            one_hot_encoding = run_one_hot.run_one_hot(self.data)
            self.dataset_encoded = one_hot_encoding.run_parallel_encoding()
        elif encoding_option == "phisicochemical_properties":
            physicochemical_encoding = (
                run_physicochemical_properties.run_physicochemical_properties(
                    self.data,
                    self.options["selected_property"],
                    self.path_config_aaindex_encoder,
                )
            )
            self.dataset_encoded = physicochemical_encoding.run_parallel_encoding()
        elif encoding_option == "digital_signal_processing":
            selected_property = self.options["selected_property"]
            fft_encoding = run_fft_encoding.run_fft_encoding(
                self.data, selected_property, self.path_config_aaindex_encoder
            )
            fft_encoding.run_parallel_encoding()
            self.dataset_encoded = fft_encoding.appy_fft()

    def dump_joblib(self):
        """Save model"""
        dump(self.model, self.job_path)

    def pca(self):
        """Apply pca"""
        pca_result = self.transformer.apply_kernel_pca(
                self.dataset_encoded, self.kernel
            )
        self.dataset_encoded = pd.DataFrame(data=pca_result, columns=["P_0", "P_1"])

    def preprocess(self):
        """Apply preprocessing scaler"""
        if self.preprocessing == "min_max":
            scaler = MinMaxScaler()
        elif self.preprocessing == "standard":
            scaler = StandardScaler()
        elif self.preprocessing == "max_absolute":
            scaler = MaxAbsScaler()
        elif self.preprocessing == "robust":
            scaler = RobustScaler()
        elif self.preprocessing == "quantile":
            scaler = QuantileTransformer()
        scaler.fit(self.dataset_encoded)
        self.dataset_encoded = scaler.transform(self.dataset_encoded)
