from random import random
import pandas as pd
from modules.clustering_methods.transformation_data import transformer
import json

class pca_process:
    def __init__(self, params, static_folder, temp_folder):
        self.path = params["path"]
        if "kernel" in params.keys():
            self.kernel = params["kernel"]
        else:
            self.kernel = None
        self.data = pd.read_csv(self.path)
        self.dataset_to_transform = self.data[[col for col in self.data.columns if "P_" in col]]
        self.transformer = transformer()
        
    def apply_pca(self):
        if(self.kernel != None):
            pca_result = self.transformer.apply_pca_data(self.dataset_to_transform)
        else:
            pca_result = self.transformer.apply_kernel_pca(self.dataset_to_transform, self.kernel)
        pca = pd.DataFrame(data = pca_result, columns = ["X", "Y"])
        pca["id"] = self.data["id"]
        pca["label"] = self.data["label"]
        pca_json = json.loads(pca.to_json(orient = "records"))
        return pca_json