import random
import pandas as pd
from modules.clustering_methods import clustering_algorithm, evaluation_performances
from modules.encoding_strategies import run_fft_encoding, run_one_hot, run_physicochemical_properties
from modules.verify_fasta import verify_fasta
import json
class unsupervised_algorithms:
    def __init__(self, data, options, temp_folder, is_file, is_json, max_sequences):
        self.data = data
        self.options = options
        self.temp_folder = temp_folder
        self.rand_name = str(round(random.random() * 10 ** 20))
        self.csv_path = "{}/{}_data_to_process.csv".format(self.temp_folder, self.rand_name)
        self.fasta_path = self.csv_path.replace("csv", "fasta")
        self.dataset_encoded = None
        if(is_json):
            self.create_file()
        elif(is_file):
            self.save_file()
        self.path_config_aaindex_encoder = 'modules/encoding_strategies/encoding_AAIndex/'
        self.check = verify_fasta(self.fasta_path, max_sequences).verify()
        if(self.check == {"status": "success"}):
            self.check = self.check_options()

    def check_options(self):
        self.encoding_options = ["one_hot_encoding", "phisicochemical_properties", "digital_signal_processing"]
        self.properties_options = ["alpha-structure_group", "betha-structure_group", "energetic_group", "hydropathy_group",
                                    "hydrophobicity_group", "index_group", "secondary_structure_properties_group", "volume_group"]
        self.algorithms_options = ["kmeans","dbscan","meanshift","birch","agglomerative","affinity","optics"]
        self.params_options = {
            "kmeans": ["k_value"],
            "birch": ["k_value"],
            "agglomerative": ["linkage", "affinity", "k_value"],
            "optics": ["min_samples", "xi", "min_cluster_size"]
        }

        if self.options["encoding"] not in self.encoding_options:
            return {"status": "error", "description": "Encoding option not valid"}

        if (self.options["encoding"] == "phisicochemical_properties" or 
            self.options["encoding"] == "digital_signal_processing"):
            if self.options["selected_property"] not in self.properties_options:
                return {"status": "error", "description": "Property option not valid"}

        if (self.options["algorithm"] not in self.algorithms_options):
            return {"status": "error", "description": "Algorithm option not valid"}

        if (set(self.options["params"].keys()) != set(self.params_options[self.options["algorithm"]])):
            return {"status": "error", "description": "Missed parameters; {}".format(
                set(self.params_options[self.options["algorithm"]]) - set(self.options["params"].keys())
            )}

        if self.options["algorithm"] in self.params_options.keys():
            for param in self.options["params"]:
                if param not in self.params_options[self.options["algorithm"]]:
                    return {"status": "error", "description": "Parameter option not valid"}

                if(param == "k_value"):
                    if type(self.options["params"]["k_value"]) != int:
                        return {"status": "error", "description": "Parameter k_value not valid"}
                    if self.options["params"]["k_value"] <= 0:
                        return {"status": "error", "description": "Parameter k_value not valid"}

                if(param == "linkage"):
                    if self.options["params"]["linkage"] not in ["ward", "complete", "average", "single"]:
                        return {"status": "error", "description": "Parameter linkage not valid"}

                    if self.options["params"]["linkage"] == "ward" and self.options["params"]["affinity"] != "euclidean":
                        return {"status": "error", "description": "Parameter linkage = ward' only can be with affinity = 'euclidean'"}

                if(param == "affinity"):
                    if self.options["params"]["affinity"] not in ["euclidean", "l1", "l2", "manhattan", "cosine"]:
                        return {"status": "error", "description": "Parameter affinity not valid"}

                if(param == "min_samples"):
                    if type(self.options["params"]["optics"]) != int and type(self.options["params"]["optics"]) != float:
                        return {"status": "error", "description": "Parameter min_samples not valid"}
                    if type(self.options["params"]["optics"]) == int and self.options["params"]["optics"] < 1:
                        return {"status": "error", "description": "Parameter min_samples not valid"}
                    if type(self.options["params"]["optics"]) == float and (self.options["params"]["optics"] > 1 or self.options["params"]["optics"] < 0):
                        return {"status": "error", "description": "Parameter min_samples not valid"}

                if(param == "xi"):
                    if type(self.options["params"]["xi"]) != float:
                        return {"status": "error", "description": "Parameter min_samples not valid"}
                    if self.options["params"]["xi"] < 0 or self.options["params"]["xi"] > 1:
                        return {"status": "error", "description": "Parameter min_samples not valid"}

                if(param == "min_cluster_size"):
                    if type(self.options["params"]["min_cluster_size"]) != int and type(self.options["params"]["min_cluster_size"]) != float:
                        return {"status": "error", "description": "Parameter min_cluster_size not valid"}
                    if type(self.options["params"]["min_cluster_size"]) == int and self.options["params"]["min_cluster_size"] < 1:
                        return {"status": "error", "description": "Parameter min_cluster_size not valid"}
                    if type(self.options["params"]["min_cluster_size"]) == float and (self.options["params"]["optics"] > 1 or self.options["params"]["min_cluster_size"] < 0):
                        return {"status": "error", "description": "Parameter min_cluster_size not valid"}

        return {"status": "success"}

    def get_check(self):
        return self.check

    def get_longest(self):
        return self.data.sequence.str.len().max()

    def process_encoding_stage(self):
        self.data = self.create_df(self.data)
        encoding_option = self.options['encoding']

        if encoding_option == "one_hot_encoding":
            one_hot_encoding = run_one_hot.run_one_hot(self.data, self.get_longest())
            one_hot_encoding.run_parallel_encoding()
            self.dataset_encoded = one_hot_encoding.df_encoding

        elif encoding_option == "phisicochemical_properties":
            selected_property = self.options['selected_property']
            physicochemical_encoding = run_physicochemical_properties.run_physicochemical_properties(self.data, selected_property, self.get_longest(), self.path_config_aaindex_encoder)
            physicochemical_encoding.run_parallel_property()
            self.dataset_encoded = physicochemical_encoding.df_encoding

        elif encoding_option == "digital_signal_processing":
            selected_property = self.options['selected_property']
            fft_encoding = run_fft_encoding.run_fft_encoding(self.data, selected_property, self.path_config_aaindex_encoder, self.get_longest())
            fft_encoding.run_parallel_property()
            fft_encoding.appy_fft()
            self.dataset_encoded = fft_encoding.df_fft_encoding

    def process_by_options(self):
        self.process_encoding_stage()
        self.dataset_to_cluster = self.dataset_encoded.copy()
        self.dataset_to_cluster.drop(["id"], inplace = True, axis = 1)
        clustering_process = clustering_algorithm.aplicateClustering(self.dataset_to_cluster)
        evaluation_process = evaluation_performances.evaluationClustering()

        algorithm = self.options['algorithm']
        if algorithm == "kmeans":
            knn_value = self.options['params']['k_value']
            clustering_process.aplicateKMeans(knn_value)

        elif algorithm == "dbscan":
            clustering_process.aplicateDBSCAN()

        elif algorithm == "meanshift":
            clustering_process.aplicateMeanShift()

        elif algorithm == "birch":
            knn_value = self.options['params']['k_value']
            clustering_process.aplicateBirch(knn_value)

        elif algorithm == "agglomerative":
            linkage = self.options['params']['linkage']
            affinity = self.options['params']['affinity']
            knn_value = self.options['params']['k_value']
            clustering_process.aplicateAlgomerativeClustering(linkage, affinity, knn_value)

        elif algorithm == "affinity":
            clustering_process.aplicateAffinityPropagation()

        elif algorithm == "optics":
            min_samples = self.options['params']['min_samples']
            xi = self.options['params']['xi']
            min_cluster_size = self.options['params']['min_cluster_size']
            clustering_process.applicateOptics(min_samples, xi, min_cluster_size)

        self.response = {}

        self.dataset_encoded["label"] = list(clustering_process.labels)
        data_json = json.loads(self.dataset_encoded[["id", "label"]].to_json(orient = "records"))

        if clustering_process.response_apply == 0: #Success
            self.response.update({"status": "success"})
            counts = self.dataset_encoded.label.value_counts()
            counts = [{"category": int(count), "value": int(counts[count]), "percentage": int(counts[count]) * 100 / counts.sum()} for count in list(counts.index)]
            self.response.update({"data": data_json})
            performances = evaluation_process.get_metrics(self.dataset_to_cluster, clustering_process.labels)
            performances_dict = {"calinski": performances[0], "siluetas": performances[1], "dalvies": performances[2]}
            self.response.update({"performance": performances_dict})
            self.response.update({"resume": counts})
        else: #Error
            self.response.update({"status": "error"})
        return self.response

    def create_df(self, data):
        # Toma un texto fasta y lo transforma en un dataframe
        self.records = [">" + i for i in data.split(">")[1:]]
        data = []
        for i in self.records:
            splitted = i.split("\n")
            id = splitted[0]
            sequence = "".join(splitted[1:])
            row = {"id": id, "sequence": sequence}
            data.append(row)
        return pd.DataFrame(data)

    def create_file(self):
        f = open(self.fasta_path, "w")
        f.write(self.data)
        f.close()

    def save_file(self):
        self.data.save(self.fasta_path)