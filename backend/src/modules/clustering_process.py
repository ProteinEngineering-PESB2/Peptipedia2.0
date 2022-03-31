import random
import pandas as pd
from modules.clustering_methods import clustering_algorithm, evaluation_performances
from modules.encoding_strategies import run_fft_encoding, run_one_hot, run_physicochemical_properties
from modules.verify_fasta import verify_fasta

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
        self.response = {}

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
        self.dataset_to_cluster.drop(["id"], inplace=True, axis = 1)

        print(self.dataset_to_cluster)
        clustering_process = clustering_algorithm.aplicateClustering(self.dataset_to_cluster)
        evaluation_process = evaluation_performances.evaluationClustering()

        algorithm = self.options['algorithm']

        if algorithm == "kmeans":  # KNN
            knn_value = self.options['params']['k_value']
            clustering_process.aplicateKMeans(knn_value)

        elif algorithm == "dbscan":  # DBScan
            clustering_process.aplicateDBSCAN()

        elif algorithm == "meanshift":  # Meanshift
            clustering_process.aplicateMeanShift()

        elif algorithm == "birch":  # Birch
            knn_value = self.options['params']['k_value']
            clustering_process.aplicateBirch(knn_value)

        elif algorithm == "agglomerative":  # Agglomerative
            linkage = self.options['params']['linkage']
            affinity = self.options['params']['affinity']
            knn_value = self.options['params']['k_value']

            clustering_process.aplicateAlgomerativeClustering(linkage, affinity, knn_value)

        elif algorithm == "affinity":  # Affinity
            clustering_process.aplicateAffinityPropagation()

        elif algorithm == "optics": #Optics
            min_samples = self.options['params']['min_samples']
            xi = self.options['params']['xi']
            min_cluster_size = self.options['params']['min_cluster_size']
            clustering_process.applicateOptics(min_samples, xi, min_cluster_size)
        else:
            print("No seleccionado")


        if clustering_process.response_apply == 0:
            self.response.update({"clustering_process": "OK"})
            self.response.update({"labels": [int(val) for val in list(clustering_process.labels)]})

            #get performances
            performances = evaluation_process.get_metrics(self.dataset_to_cluster, clustering_process.labels)
            
            performances_dict = {"calinski": performances[0], "siluetas": performances[1], "dalvies": performances[2]}
            self.response.update({"performance": performances_dict})
            print(self.response)
        else:
            self.response.update({"clustering_process": "ERROR"})

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