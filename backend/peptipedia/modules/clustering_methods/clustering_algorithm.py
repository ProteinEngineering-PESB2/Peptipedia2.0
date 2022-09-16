"""Clustering algorithm module"""
from sklearn.cluster import (
    DBSCAN,
    OPTICS,
    AffinityPropagation,
    AgglomerativeClustering,
    Birch,
    KMeans,
    MeanShift,
    estimate_bandwidth,
)


class ApplyClustering:
    """Apply Clustering class"""

    def __init__(self, dataset):
        self.dataset = dataset
        self.response_apply = None
        self.model = None
        self.labels = None
        self.number_groups = None
        self.response_apply = None

    def aplicate_k_means(self, k_value):
        """metodo que permite aplicar k-means, genera diversos set de
        datos con respecto a las divisiones que se emplean..."""
        try:
            self.model = KMeans(n_clusters=k_value, random_state=1).fit(self.dataset)
            self.labels = self.model.labels_
            self.number_groups = len(list(set(self.labels)))
            self.response_apply = 0
        except:
            self.response_apply = 1

    def aplicate_birch(self, k_value):
        """metodo que permite aplicar bisrch clustering"""
        try:
            self.model = Birch(
                threshold=0.2,
                branching_factor=50,
                n_clusters=k_value,
                compute_labels=True,
                copy=True,
            ).fit(self.dataset)
            self.labels = self.model.labels_
            self.number_groups = len(list(set(self.labels)))
            self.response_apply = 0
        except:
            self.response_apply = 1

    def aplicate_algomerative_clustering(self, linkage, affinity, k_value):
        """metodo que permite aplicar cluster jerarquico"""
        try:
            self.model = AgglomerativeClustering(
                n_clusters=k_value,
                affinity=affinity,
                memory=None,
                connectivity=None,
                compute_full_tree="auto",
                linkage=linkage,
            ).fit(self.dataset)
            self.labels = self.model.labels_
            self.number_groups = len(list(set(self.labels)))
            self.response_apply = 0
        except:
            self.response_apply = 1

    def aplicate_affinity_propagation(self):
        """metodo que permite aplicar AffinityPropagation, con diversos parametros..."""
        try:
            self.model = AffinityPropagation().fit(self.dataset)
            self.labels = self.model.labels_
            self.number_groups = len(list(set(self.labels)))
            self.response_apply = 0
        except:
            self.response_apply = 1

    def aplicate_dbscan(self):
        """metodo que permite aplicar DBSCAN"""
        try:
            self.model = DBSCAN(eps=0.5, min_samples=5).fit(self.dataset)
            self.labels = self.model.labels_
            self.number_groups = len(list(set(self.labels)))
            self.response_apply = 0
        except:
            self.response_apply = 1

    def aplicate_mean_shift(self):
        """metodo que permite aplicar MeanShift clustering..."""
        try:
            bandwidth = estimate_bandwidth(self.dataset, quantile=0.2)
            self.model = MeanShift(bandwidth=bandwidth, bin_seeding=True)
            self.model = self.model.fit(self.dataset)
            self.labels = self.model.labels_
            self.number_groups = len(list(set(self.labels)))
            self.response_apply = 0
        except:
            self.response_apply = 1

    def applicate_optics(self, min_samples, xi_value, min_cluster_size):
        """metodo que permite aplicar Optics clustering..."""
        try:
            self.model = OPTICS(
                min_samples=min_samples, xi=xi_value, min_cluster_size=min_cluster_size
            )
            self.model = self.model.fit(self.dataset)
            self.labels = self.model.labels_
            self.number_groups = len(list(set(self.labels)))
            self.response_apply = 0
        except:
            self.response_apply = 1
