"""Evaluation performance clustering module"""
from sklearn import metrics


class EvaluationClustering:
    """Evaluation clustering class"""

    def get_metrics(self, dataset, labels_response):
        """Return clustering metrics"""
        try:
            calinski = metrics.calinski_harabasz_score(dataset, labels_response)
            siluetas = metrics.silhouette_score(
                dataset, labels_response, metric="euclidean"
            )
            davies = metrics.davies_bouldin_score(dataset, labels_response)
            response = [calinski, siluetas, davies]

        except:
            calinski = None
            siluetas = None
            davies = None
            response = [calinski, siluetas, davies]
        return response
