import sys
import os
import pandas as pd
import numpy as np
import networkx as nx
import community as community_louvain

class alignment_clustering:
    def __init__(self, data, is_file, is_json, config):
        super().__init__("clustering", data, config, is_file, is_json)
        