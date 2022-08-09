"""Alignment clustering module"""
import community as community_louvain
import networkx as nx
import pandas as pd
import numpy as np
import subprocess
from random import random
import json
from peptipedia.modules.utils import ConfigTool

class AlignmentClustering(ConfigTool):
    """Alignment clustering class"""
    def __init__(self, data, is_file, config):
        super().__init__("clustering", data, config, is_file)
        self.cores = 12
        static_folder = config["folders"]["static_folder"]
        rand_number = str(round(random() * 10**20))
        self.output_aln_path = f"{static_folder}/{rand_number}.aln"
        self.output_dist_path = f"{static_folder}/{rand_number}.dist"
        self.df_data = pd.DataFrame()
        self.data_values_all = []
        self.graph_data = nx.Graph()

    def __exec_clustalo(self):
        """Alinear multiple y obtener matriz de distancia, install clustal-omega"""
        command = [
            "clustalo",
            "-i",
            self.temp_file_path,
            "-o",
            f"{self.output_aln_path}",
            f"--distmat-out={self.output_dist_path}",
            "--full",
            "--force",
        ]
        subprocess.check_output(command)

    def __parse_distance_matrix(self):
        """Parsear la matriz de distancias"""
        doc_open = open(self.output_dist_path, 'r', encoding = "utf-8")
        number_seq = doc_open.readline()
        number_seq = int(number_seq.replace("\n", ""))
        line = doc_open.readline()
        index_values = []
        while line:
            distances = line.replace("\n", "").split(" ")
            seq_id = distances[0]
            distances = [float(value) for value in distances[1:] if len(value)>1]
            self.data_values_all +=distances
            #check if are there error in alignment
            if len(distances) != number_seq:
                length_value = len(distances)
                for _ in range(length_value, number_seq):
                    distances.append(1)
            self.df_data[seq_id] = distances
            index_values.append(seq_id)
            line = doc_open.readline()

        doc_open.close()
        self.df_data.index = index_values

    def __filter_create_graph(self):
        """Filter and create graph"""
        q1 = np.quantile(self.data_values_all, .25)

        for node in self.df_data.index:
            self.graph_data.add_node(node)

        for column in self.df_data.columns:
            for index in self.df_data.index:
                if column != index:
                    if self.df_data[column][index] <= q1:
                        self.graph_data.add_edge(column, index,
                            weigth=self.df_data[column][index])

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
        response.update({"alignment_path": self.output_aln_path})
        response.update({"distances_path": self.output_dist_path})
        return response

    def run_clustering(self):
        self.__exec_clustalo()
        self.__parse_distance_matrix()
        self.__filter_create_graph()
        self.__louvain_modularity()
        self.__get_groups()
        return self.__parse_response()