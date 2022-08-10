"""Distance clustering module"""
import json
from random import random
import multiprocessing as mp
import numpy as np
from scipy.spatial import distance
from joblib import Parallel, delayed
import pandas as pd
from peptipedia.modules.encoding_strategies import (
    run_fft_encoding,
    run_physicochemical_properties,
)

from peptipedia.modules.clustering_methods.graph_clustering import GraphClustering

class DistanceClustering(GraphClustering):
    """Distance Clustering class"""
    def __init__(self, data, options, is_file, config):
        super().__init__(data, is_file, config)
        static_folder = config["folders"]["static_folder"]
        rand_number = str(round(random() * 10**20))
        self.dataset_encoded_path = f"{static_folder}/{rand_number}.csv"
        self.options = options
        self.dataset_encoded = None
        self.path_config_aaindex_encoder = config["folders"]["path_aa_index"]
        self.cores = mp.cpu_count()

    def __process_encoding_stage(self):
        """Encode sequences using selected method"""
        with open(self.temp_file_path, "r", encoding = "utf-8") as file:
            self.data = self.create_df(file.read())
        encoding_option = self.options["encoding"]

        if encoding_option == "phisicochemical_properties":
            physicochemical_encoding = (
                run_physicochemical_properties.RunPhysicochemicalProperties(
                    self.data,
                    self.options["selected_property"],
                    self.path_config_aaindex_encoder
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
        self.dataset_encoded.reset_index(drop=True, inplace=True)

    def __get_vector(self, index, dataset, column_ignore):
        """Ignore a column"""
        row = [dataset[value][index] for value in dataset.columns if value != column_ignore]
        return np.array(row)

    def __estimated_distance(self, vector1, vector2, type_distance):
        """Estimate one vs one distance"""
        distance_value = None
        if type_distance == "euclidean":
            distance_value = np.linalg.norm(vector1 - vector2)
        elif type_distance == "bray_curtis":
            distance_value = distance.braycurtis(vector1, vector2)
        elif type_distance == "canberra":
            distance_value = distance.canberra(vector1, vector2)
        elif type_distance == "chebyshev":
            distance_value = distance.chebyshev(vector1, vector2)
        elif type_distance == "manhattan":
            distance_value = distance.cityblock(vector1, vector2)
        elif type_distance == "correlation":
            distance_value = distance.correlation(vector1, vector2)
        elif type_distance == "cosine":
            distance_value = distance.cosine(vector1, vector2)
        elif type_distance == "minkowski":
            distance_value = distance.minkowski(vector1, vector2)
        elif type_distance == "hamming":
            distance_value = distance.hamming(vector1, vector2)
        return distance_value

    def __estimated_distance_one_vs_rest(self, index, dataset, column_ignore, type_distance):
        """Estimate one vs all distances"""
        vector_target = self.__get_vector(index, dataset, column_ignore)
        distance_to_vector = []
        index_value = dataset[column_ignore][index].split(" ")[0]

        for j in range(len(dataset)):
            if index != j:
                vector2 = self.__get_vector(j, dataset, column_ignore)
                id_value2 = dataset[column_ignore][j].split(" ")[0]
                distance_value = self.__estimated_distance(vector_target, vector2, type_distance)
                distance_to_vector.append([index_value, id_value2, distance_value])

        return distance_to_vector
    
    def __calculate_distance(self):
        """calculo de distancia entre todas las secuencias"""
        cores = self.cores
        data_distance = Parallel(n_jobs=cores, require='sharedmem')(
            delayed(self.__estimated_distance_one_vs_rest)(i,
                self.dataset_encoded , 'id',
                self.options["distance"]) for i in range(len(self.dataset_encoded )))
        data_values = []
        for element in data_distance:
            for values in element:
                data_values.append(values)

        self.df_data_distance = pd.DataFrame(data_values, columns=['id_1', 'id_2', 'distance'])


    def run_process(self):
        """Run all distance clustering process"""
        self.__process_encoding_stage()
        self.__calculate_distance()
        self.filter(self.options["filter_type"])
        self.create_graph()
        self.louvain_modularity()
        self.get_groups()
        response = self.parse_response()
        return response