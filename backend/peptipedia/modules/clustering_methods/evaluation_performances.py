from sklearn import metrics


class evaluationClustering:
    def get_metrics(self, dataSet, labelsResponse):

        try:
            calinski = metrics.calinski_harabasz_score(dataSet, labelsResponse)
            siluetas = metrics.silhouette_score(
                dataSet, labelsResponse, metric="euclidean"
            )
            davies = metrics.davies_bouldin_score(dataSet, labelsResponse)
            response = [calinski, siluetas, davies]

        except Exception as e:
            print(e)
            calinski = None
            siluetas = None
            davies = None
            response = [calinski, siluetas, davies]
            pass

        return response
