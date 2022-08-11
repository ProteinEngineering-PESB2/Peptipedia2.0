"""Clustering module"""
import json
from random import random

from scipy import stats
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import to_hex
from peptipedia.modules.clustering_methods import (
    clustering_algorithm,
    evaluation_performances,
)
from peptipedia.modules.encoding_strategies import (
    run_fft_encoding,
    run_one_hot,
    run_physicochemical_properties,
)
from peptipedia.modules.utils import ConfigTool


class Clustering(ConfigTool):
    """Clustering process class"""
    def __init__(self, data, options, is_file, config):
        super().__init__("clustering", data, config, is_file)
        static_folder = config["folders"]["static_folder"]
        rand_number = str(round(random() * 10**20))
        self.dataset_encoded_path = f"{static_folder}/{rand_number}.csv"
        self.options = options
        self.dataset_encoded = None
        self.path_config_aaindex_encoder = config["folders"]["path_aa_index"]
        if self.check == {"status": "success"}:
            self.check = self.check_options()

    def check_options(self):
        """Function for apply restriction for numeric parameters."""
        wrong_param = []
        for key in list(self.options["params"].keys()):
            if key == "k_value":
                if not isinstance(self.options["params"]["k_value"], int) or (
                    self.options["params"]["k_value"] < 2
                ):
                    wrong_param.append("k_value")
            if key == "min_samples":
                if (
                    isinstance(self.options["params"]["min_samples"], int)
                    and self.options["params"]["min_samples"] < 1
                ):
                    wrong_param.append("min_samples")
                if isinstance(self.options["params"]["min_samples"], float) and (
                    self.options["params"]["min_samples"] > 1
                    or self.options["params"]["optics"] < 0
                ):
                    wrong_param.append("min_samples")
            if key == "xi":
                if self.options["params"]["xi"] > 1 or self.options["params"]["xi"] < 0:
                    wrong_param.append("xi")
            if key == "min_cluster_size":
                if (
                    isinstance(self.options["params"]["min_cluster_size"], int)
                    and self.options["params"]["min_cluster_size"] < 1
                ):
                    wrong_param.append("min_cluster_size")

                if isinstance(self.options["params"]["min_cluster_size"], float) and (
                    self.options["params"]["min_cluster_size"] > 1
                    or self.options["params"]["min_cluster_size"] < 0
                ):
                    wrong_param.append("min_cluster_size")
        if not wrong_param:
            return {"status": "success"}
        return {
            "status": "error",
            "description": f"Parameter {', '.join(wrong_param)} not valid",
        }

    def process_encoding_stage(self):
        """Encode sequences using selected method"""
        with open(self.temp_file_path, "r", encoding="utf-8") as file:
            self.data = self.create_df(file.read())
        encoding_option = self.options["encoding"]

        if encoding_option == "one_hot_encoding":
            one_hot_encoding = run_one_hot.RunOneHotEncoding(self.data)
            self.dataset_encoded = one_hot_encoding.run_parallel_encoding()

        elif encoding_option == "phisicochemical_properties":
            physicochemical_encoding = (
                run_physicochemical_properties.RunPhysicochemicalProperties(
                    self.data,
                    self.options["selected_property"],
                    self.path_config_aaindex_encoder,
                )
            )
            self.dataset_encoded = physicochemical_encoding.run_parallel_encoding()

        elif encoding_option == "digital_signal_processing":
            selected_property = self.options["selected_property"]
            fft_encoding = run_fft_encoding.RunFftEncoding(
                self.data, selected_property, self.path_config_aaindex_encoder
            )
            fft_encoding.run_parallel_encoding()
            self.dataset_encoded = fft_encoding.appy_fft()

    def process_by_options(self):
        """Apply clustering process"""
        self.process_encoding_stage()
        dataset_to_cluster = self.dataset_encoded.copy()
        dataset_to_cluster.drop(["id"], inplace=True, axis=1)
        clustering_process = clustering_algorithm.ApplyClustering(
            dataset_to_cluster
        )
        evaluation_process = evaluation_performances.EvaluationClustering()

        algorithm = self.options["algorithm"]
        if algorithm == "kmeans":
            clustering_process.aplicate_k_means(self.options["params"]["k_value"])

        elif algorithm == "dbscan":
            clustering_process.aplicate_dbscan()

        elif algorithm == "meanshift":
            clustering_process.aplicate_mean_shift()

        elif algorithm == "birch":
            clustering_process.aplicate_birch(self.options["params"]["k_value"])

        elif algorithm == "agglomerative":
            clustering_process.aplicate_algomerative_clustering(
                self.options["params"]["linkage"],
                self.options["params"]["affinity"],
                self.options["params"]["k_value"],
            )

        elif algorithm == "affinity":
            clustering_process.aplicate_affinity_propagation()

        elif algorithm == "optics":
            clustering_process.applicate_optics(
                self.options["params"]["min_samples"],
                self.options["params"]["xi"],
                self.options["params"]["min_cluster_size"],
            )
        response = {}

        if clustering_process.response_apply == 0:  # Success
            self.dataset_encoded["sequence"] = self.data.sequence
            self.dataset_encoded["label"] = list(clustering_process.labels)
            self.dataset_encoded.to_csv(self.dataset_encoded_path, index=False)
            data_json = json.loads(
                self.dataset_encoded[["id", "label"]].to_json(orient="records")
            )
            response.update({"status": "success"})
            self.__generate_colors()
            grouped_df = self.dataset_encoded.groupby(by = ["label", "color"],
                as_index = False).count()
            print(grouped_df)
            grouped_df.label = grouped_df.label.astype(str)
            grouped_df["prefix"] = "Cluster "
            grouped_df.label = grouped_df.prefix + grouped_df.label
            response.update({"resume": {
                "labels": [str(a) for a in grouped_df.label.tolist()],
                "values": grouped_df.id.tolist(),
                "marker": {
                    "colors": grouped_df.color.tolist()
                    }
                }
            })
            response.update({"data": data_json})
            performances = evaluation_process.get_metrics(
                dataset_to_cluster, clustering_process.labels
            )
            if performances[0] is not None:
                performances_dict = {
                    "calinski": performances[0].round(3),
                    "siluetas": performances[1].round(3),
                    "dalvies": performances[2].round(3),
                }
            else:
                performances_dict = {
                    "calinski": performances[0],
                    "siluetas": performances[1],
                    "dalvies": performances[2],
                }
            response.update({"performance": performances_dict})
            response.update({"encoding_path": self.dataset_encoded_path})
            response.update({"is_normal": self.verify_normality()})

        else:  # Error
            response.update(
                {
                    "status": "error",
                    "description": "Not results, try a different algorithm or parameters",
                }
            )
        return response

    def verify_normality(self):
        """This function only confirms if data follows a
        normal distribution using a shapiro test"""
        is_normal = True
        dataset_verify = self.dataset_encoded[
            [col for col in self.dataset_encoded.columns if "P_" in col]
        ]
        for col in dataset_verify.columns:
            result = stats.shapiro(dataset_verify[col])
            pvalue = result.pvalue
            if pvalue > 0.05:
                is_normal = False
        return is_normal

    def __generate_colors(self):
        """Generate colors using matplotlib"""
        all_clusters = self.dataset_encoded.label.unique()
        all_clusters.sort()
        linspace = np.linspace(0.1, 0.9, len(all_clusters))
        hsv = plt.get_cmap('hsv')
        rgba_colors = hsv(linspace)
        for cluster, color in zip(all_clusters, rgba_colors):
            hex_value = to_hex([color[0], color[1], color[2], color[3]], keep_alpha=True)
            self.dataset_encoded.loc[self.dataset_encoded.label == cluster, "color"] = hex_value