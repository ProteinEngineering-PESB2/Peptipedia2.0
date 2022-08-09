"""Distance clustering module"""
import json
from random import random
import numpy as np
from scipy.spatial import distance
from joblib import Parallel, delayed
import pandas as pd
import community as community_louvain
import networkx as nx
from peptipedia.modules.encoding_strategies import (
    run_fft_encoding,
    run_one_hot,
    run_physicochemical_properties,
)
from peptipedia.modules.utils import ConfigTool

class DistanceClustering(ConfigTool):
    def __init__(self, data, options, is_file, config):
        super().__init__("clustering", data, config, is_file)
        self.is_file = is_file
        self.config = config
        static_folder = config["folders"]["static_folder"]
        rand_number = str(round(random() * 10**20))
        self.dataset_encoded_path = f"{static_folder}/{rand_number}.csv"
        self.options = options
        self.dataset_encoded = None
        self.path_config_aaindex_encoder = config["folders"]["path_aa_index"]
        self.graph_data = nx.Graph()

    def __process_encoding_stage(self):
        """Encode sequences using selected method"""
        with open(self.temp_file_path, "r", encoding = "utf-8") as file:
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

    def __get_vector(self, index, dataset, column_ignore):
        row = [dataset[value][index] for value in dataset.columns if value != column_ignore]
        return row

    def __estimated_distance(self, vector1, vector2, type_distance):
        vector1 = np.array(vector1)
        vector2 = np.array(vector2)
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
        vector_target = self.__get_vector(index, dataset, column_ignore)

        distance_to_vector = []
        index_value = dataset[column_ignore][index]

        for j in range(len(dataset)):
            if index != j:
                vector2 = self.__get_vector(j, dataset, column_ignore)
                id_value2 = dataset[column_ignore][j]
                distance_value = self.__estimated_distance(vector_target, vector2, type_distance)
                distance_to_vector.append([index_value, id_value2, distance_value])

        return distance_to_vector
    
    def __calculate_distance(self):
        """calculo de distancia entre todas las secuencias"""
        cores = 12#definir...
        data_distance = Parallel(n_jobs=cores, require='sharedmem')(
            delayed(self.__estimated_distance_one_vs_rest)(i,
                self.dataset_encoded , 'id',
                self.options["distance"]) for i in range(len(self.dataset_encoded )))
        data_values = []
        for element in data_distance:
            for values in element:
                data_values.append(values)

        self.df_data_distance = pd.DataFrame(data_values, columns=['id_1', 'id_2', 'distance'])

    def __filter(self, filter_type):
        """obtener cuartiles para filtro y filtramos"""
        q_filter = None
        if filter_type == "nearest":
            q_filter = np.quantile(self.df_data_distance['distance'], .25)
            filter_data = self.df_data_distance.loc[self.df_data_distance['distance'] <= q_filter]
        elif filter_type == "farthest":
            q_filter = np.quantile(self.df_data_distance['distance'], .75)
            filter_data = self.df_data_distance.loc[self.df_data_distance['distance'] >= q_filter]

        #filtrar
        self.filter_data = filter_data.reset_index()
        
    def __create_graph(self):
        #generar grafo
        id_list1 = self.filter_data['id_1']
        id_list2 = self.filter_data['id_2']

        #cargar nodos
        id_nodes = list(set(id_list1 + id_list2))
        for node in id_nodes:
            self.graph_data.add_node(node)

        #cargar aristas
        for i in range(len(self.filter_data)):
            self.graph_data.add_edge(self.filter_data['id_1'][i],
                self.filter_data['id_2'][i],
                weigth=self.filter_data['distance'][i]
            )

    def __louvain_modularity(self): 
        """Apply louvain and get modularity"""
        self.partition = community_louvain.best_partition(self.graph_data)
        self.modularity_value = community_louvain.modularity(self.partition, self.graph_data)

    def __get_groups(self):
        """Get groups"""
        matrix_group = []
        for element in self.partition:
            row = [element, self.partition[element]]
            matrix_group.append(row)

        self.results = pd.DataFrame(matrix_group, columns=['id', 'label'])

    def __parse_response(self):
        response = {}
        response.update({"status": "success"})
        counts = self.results.label.value_counts()
        counts = [
            {
                "category": int(count),
                "value": int(counts[count]),
                "percentage": (int(counts[count]) * 100 / counts.sum()).round(3),
            }
            for count in list(counts.index)
        ]
        response.update({"data": json.loads(self.results.to_json(orient="records"))})
        response.update({"resume": counts})
        response.update({"performance": {
            "Modularity": self.modularity_value
        }})
        return response

    def run_process(self):
        self.__process_encoding_stage()
        self.__calculate_distance()
        self.__filter(self.options["filter_type"])
        self.__create_graph()
        self.__louvain_modularity()
        self.__get_groups()
        return self.__parse_response()