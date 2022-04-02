from sklearn.model_selection import cross_validate
from sklearn.metrics import confusion_matrix
from sklearn import metrics

from scipy.stats import pearsonr
from scipy.stats import spearmanr
from scipy.stats import kendalltau
import math

import numpy as np

class response_training_model(object):

    def estimated_performance_class(self, dataset, target, model, validation, list_metric):
        performance = {}
        response_data = cross_validate(model, dataset, target, cv=validation, scoring=list_metric)

        for metric in list_metric:
            average_value = np.mean(response_data["test_{}".format(metric)])
            performance.update({metric:average_value})

        label_predict = model.predict(dataset)
        #confusion matrix
        confusion_matrix_response = confusion_matrix(target, label_predict)

        response = {"performance": performance, "confusion_matrix": confusion_matrix_response}
        return response

    def estimated_metric_regresion_models(self, dataset, target, model, validation, list_metric):
        performance = {}
        response_data = cross_validate(model, dataset, target, cv=validation, scoring=list_metric)

        for metric in list_metric:
            average_value = np.mean(response_data["test_{}".format(metric)])
            performance.update({metric:average_value})

        predict_values = model.predict(dataset)

        #get interesting performance
        kendall_value = self.__calculatekendalltau(target, predict_values)
        pearson_value = self.__calculatedPearson(target, predict_values)
        spearma_value = self.__calculatedSpearman(target, predict_values)

        response = {"performances": {"training": performance, "kendall": kendall_value, "pearson": pearson_value,
                                     "spearman": spearma_value}, "predict_label": predict_values, "real_values": target}
        return response

    # metodo que permite calcular el coeficiente de pearson...
    def __calculatedPearson(self, real_values, predict_values):

        response = pearsonr(real_values, predict_values)
        if math.isnan(response[0]):
            r1 = 'ERROR'
        else:
            r1 = response[0]

        if math.isnan(response[1]):
            r2 = 'ERROR'
        else:
            r2 = response[1]

        dictResponse = {"pearsonr": r1, "pvalue": r2}
        return dictResponse

    # metodo que permite calcular el coeficiente de spearman...
    def __calculatedSpearman(self, real_values, predict_values):

        response = spearmanr(real_values, predict_values)

        if math.isnan(response[0]):
            r1 = 'ERROR'
        else:
            r1 = response[0]

        if math.isnan(response[1]):
            r2 = 'ERROR'
        else:
            r2 = response[1]

        dictResponse = {"spearmanr": r1, "pvalue": r2}
        return dictResponse

    # metodo que permite calcular el kendalltau...
    def __calculatekendalltau(self, real_values, predict_values):

        response = kendalltau(real_values, predict_values)

        if math.isnan(response[0]):
            r1 = 'ERROR'
        else:
            r1 = response[0]

        if math.isnan(response[1]):
            r2 = 'ERROR'
        else:
            r2 = response[1]

        dictResponse = {"kendalltau": r1, "pvalue": r2}
        return dictResponse