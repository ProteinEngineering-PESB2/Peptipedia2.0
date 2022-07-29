import community as community_louvain
import networkx as nx
import pandas as pd


class alignment_clustering:
    def __init__(self, data, is_file, is_json, config):
        super().__init__("clustering", data, config, is_file, is_json)
