from sklearn import metrics

class evaluationClustering(object):

    def get_metrics(self, dataSet, labelsResponse):

        try:
            calinski = metrics.calinski_harabasz_score(dataSet, labelsResponse)
            siluetas = metrics.silhouette_score(dataSet, labelsResponse, metric='euclidean')
            davies = metrics.davies_bouldin_score(dataSet, labelsResponse)
            response = [calinski, siluetas, davies]
        except Exception as e:
            print(e)
            calinski = "ERROR"
            siluetas = "ERROR"
            davies = "ERROR"
            response = [calinski, siluetas, davies]
            pass
        return response