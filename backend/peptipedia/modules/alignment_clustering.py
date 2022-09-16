"""Alignment clustering module"""
import pandas as pd

from peptipedia.modules.clustering_methods.graph_clustering import GraphClustering
from peptipedia.modules.msa_module import MultipleSequenceAlignment


class AlignmentClustering(GraphClustering):
    """Alignment clustering class"""

    def __init__(self, data, is_file, config):
        super().__init__(data, is_file, config)
        self.msa = MultipleSequenceAlignment(
            data, is_file, config, config_module="clustering"
        )

    def __distance_matrix_to_df(self):
        """Transforms a NxN distance matrix to a Mx3 dataframe"""
        data = []
        for index, label in enumerate(self.msa.x_labels):
            for index2, label2 in enumerate(self.msa.x_labels):
                data.append(
                    {
                        "id_1": label,
                        "id_2": label2,
                        "distance": self.msa.z_values[index][index2],
                    }
                )
        self.df_data_distance = pd.DataFrame(data, columns=["id_1", "id_2", "distance"])

    def run_clustering(self):
        """Run all clustering process"""
        self.msa.execute_clustalo()
        self.msa.parse_output()
        self.__distance_matrix_to_df()
        self.filter("nearest")
        self.create_graph()
        self.louvain_modularity()
        self.get_groups()
        response = self.parse_response()
        response.update({"alignment_path": self.msa.output_aln_file})
        response.update({"distances_path": self.msa.output_dist_file})
        return response
