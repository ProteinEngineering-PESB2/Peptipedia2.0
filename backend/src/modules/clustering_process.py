import json
from random import random

import pandas as pd
from scipy import stats

from modules.clustering_methods import clustering_algorithm, evaluation_performances
from modules.encoding_strategies import (
    run_fft_encoding,
    run_one_hot,
    run_physicochemical_properties,
)
from modules.utils import config_tool


class unsupervised_algorithms(config_tool):
    def __init__(
        self,
        data,
        options,
        static_folder,
        temp_folder,
        is_file,
        is_json,
        max_sequences,
        min_number_sequences,
        path_aa_index,
    ):
        super().__init__(
            data, temp_folder, is_file, is_json, max_sequences, min_number_sequences
        )
        self.dataset_encoded_path = "{}/{}.csv".format(
            static_folder, str(round(random() * 10**20))
        )
        self.options = options
        self.dataset_encoded = None
        self.is_normal = True
        self.path_config_aaindex_encoder = path_aa_index
        if self.check == {"status": "success"}:
            self.check = self.check_options()

    def check_options(self):
        # Function for apply restriction for numeric parameters.
        if "params" in list(self.options.keys()):
            for key in list(self.options["params"].keys()):
                if key == "k_value":
                    if type(self.options["params"]["k_value"]) != int:
                        return {
                            "status": "error",
                            "description": "Parameter k_value not valid",
                        }
                    if self.options["params"]["k_value"] < 2:
                        return {
                            "status": "error",
                            "description": "Parameter k_value not valid",
                        }

                if key == "min_samples":
                    if (
                        type(self.options["params"]["min_samples"]) != int
                        and type(self.options["params"]["min_samples"]) != float
                    ):
                        return {
                            "status": "error",
                            "description": "Parameter min_samples not valid",
                        }
                    if (
                        type(self.options["params"]["min_samples"]) == int
                        and self.options["params"]["min_samples"] < 1
                    ):
                        return {
                            "status": "error",
                            "description": "Parameter min_samples not valid",
                        }
                    if type(self.options["params"]["min_samples"]) == float and (
                        self.options["params"]["min_samples"] > 1
                        or self.options["params"]["optics"] < 0
                    ):
                        return {
                            "status": "error",
                            "description": "Parameter min_samples not valid",
                        }

                if key == "xi":
                    if (
                        type(self.options["params"]["xi"]) != float
                        and type(self.options["params"]["xi"]) != int
                    ):
                        return {
                            "status": "error",
                            "description": "Parameter xi not valid",
                        }
                    if (
                        self.options["params"]["xi"] < 0
                        or self.options["params"]["xi"] > 1
                    ):
                        return {
                            "status": "error",
                            "description": "Parameter xi not valid",
                        }

                if key == "min_cluster_size":
                    if (
                        type(self.options["params"]["min_cluster_size"]) != int
                        and type(self.options["params"]["min_cluster_size"]) != float
                    ):
                        return {
                            "status": "error",
                            "description": "Parameter min_cluster_size not valid",
                        }
                    if (
                        type(self.options["params"]["min_cluster_size"]) == int
                        and self.options["params"]["min_cluster_size"] < 1
                    ):
                        return {
                            "status": "error",
                            "description": "Parameter min_cluster_size not valid",
                        }
                    if type(self.options["params"]["min_cluster_size"]) == float and (
                        self.options["params"]["min_cluster_size"] > 1
                        or self.options["params"]["min_cluster_size"] < 0
                    ):
                        return {
                            "status": "error",
                            "description": "Parameter min_cluster_size not valid",
                        }

        return {"status": "success"}

    def process_encoding_stage(self):
        f = open(self.temp_file_path, "r")
        self.data = self.create_df(f.read())
        f.close()
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

    def process_by_options(self):
        self.process_encoding_stage()
        self.dataset_to_cluster = self.dataset_encoded.copy()
        self.dataset_to_cluster.drop(["id"], inplace=True, axis=1)
        clustering_process = clustering_algorithm.aplicateClustering(
            self.dataset_to_cluster
        )
        evaluation_process = evaluation_performances.evaluationClustering()

        algorithm = self.options["algorithm"]
        if algorithm == "kmeans":
            knn_value = self.options["params"]["k_value"]
            clustering_process.aplicateKMeans(knn_value)

        elif algorithm == "dbscan":
            clustering_process.aplicateDBSCAN()

        elif algorithm == "meanshift":
            clustering_process.aplicateMeanShift()

        elif algorithm == "birch":
            knn_value = self.options["params"]["k_value"]
            clustering_process.aplicateBirch(knn_value)

        elif algorithm == "agglomerative":
            linkage = self.options["params"]["linkage"]
            affinity = self.options["params"]["affinity"]
            knn_value = self.options["params"]["k_value"]
            clustering_process.aplicateAlgomerativeClustering(
                linkage, affinity, knn_value
            )

        elif algorithm == "affinity":
            clustering_process.aplicateAffinityPropagation()

        elif algorithm == "optics":
            min_samples = self.options["params"]["min_samples"]
            xi = self.options["params"]["xi"]
            min_cluster_size = self.options["params"]["min_cluster_size"]
            clustering_process.applicateOptics(min_samples, xi, min_cluster_size)
        self.response = {}

        if clustering_process.response_apply == 0:  # Success
            self.dataset_encoded["label"] = list(clustering_process.labels)
            self.dataset_encoded.to_csv(self.dataset_encoded_path, index=False)
            data_json = json.loads(
                self.dataset_encoded[["id", "label"]].to_json(orient="records")
            )
            self.response.update({"status": "success"})
            counts = self.dataset_encoded.label.value_counts()
            counts = [
                {
                    "category": int(count),
                    "value": int(counts[count]),
                    "percentage": (int(counts[count]) * 100 / counts.sum()).round(3),
                }
                for count in list(counts.index)
            ]
            self.response.update({"data": data_json})
            performances = evaluation_process.get_metrics(
                self.dataset_to_cluster, clustering_process.labels
            )
            performances_dict = {
                "calinski": performances[0].round(3),
                "siluetas": performances[1].round(3),
                "dalvies": performances[2].round(3),
            }
            self.response.update({"performance": performances_dict})
            self.response.update({"resume": counts})
            self.response.update({"encoding_path": self.dataset_encoded_path})
            self.response.update({"is_normal": self.verify_normality()})

        else:  # Error
            self.response.update(
                {
                    "status": "error",
                    "description": "Not results, try a different algorithm or parameters",
                }
            )
        return self.response

    def verify_normality(self):
        is_normal = True
        self.dataset_verify = self.dataset_encoded[
            [col for col in self.dataset_encoded.columns if "P_" in col]
        ]
        for col in self.dataset_verify.columns:
            result = stats.shapiro(self.dataset_verify[col])
            pvalue = result.pvalue
            if pvalue > 0.05:
                is_normal = False
        return is_normal
