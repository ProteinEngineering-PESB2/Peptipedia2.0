"""Alignment clustering module"""
import json
import community as community_louvain
import networkx as nx
import pandas as pd
import numpy as np
from peptipedia.modules.utils import ConfigTool

class GraphClustering(ConfigTool):
    """Graph clustering class"""
    def __init__(self, data, is_file, config):
        super().__init__("clustering", data, config, is_file)
        self.graph_data = nx.Graph()
        self.partition = None
        self.modularity_value = None
        self.results = None
        self.df_data_distance = None

    def filter(self, filter_type):
        """obtener cuartiles para filtro y filtramos"""
        q_filter = None
        if filter_type == "nearest":
            q_filter = np.quantile(self.df_data_distance['distance'], .25)
            filter_data = self.df_data_distance.loc[self.df_data_distance['distance'] <= q_filter]
        elif filter_type == "farthest":
            q_filter = np.quantile(self.df_data_distance['distance'], .75)
            filter_data = self.df_data_distance.loc[self.df_data_distance['distance'] >= q_filter]

        #filtrar
        self.filter_data = filter_data.reset_index(drop=True)

    def create_graph(self):
        """Create graph function"""
        #generar grafo
        id_list1 = self.filter_data['id_1'].to_list()
        id_list2 = self.filter_data['id_2'].to_list()

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

    def louvain_modularity(self): 
        """Apply louvain and get modularity"""
        self.partition = community_louvain.best_partition(self.graph_data)
        self.modularity_value = round(community_louvain.modularity(self.partition, self.graph_data), 3)

    def get_groups(self):
        """Get groups"""
        matrix_group = []
        for element in self.partition:
            row = [element, self.partition[element]]
            matrix_group.append(row)
        self.results = pd.DataFrame(matrix_group, columns=['id', 'label'])


    def parse_response(self):
        """Create response json"""
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
        response.update({
            "graph":{
                "nodes": json.loads(self.results.to_json(orient="records")),
                "links": json.loads(self.df_data_distance.to_json(orient="records"))
            }
        })
        return response