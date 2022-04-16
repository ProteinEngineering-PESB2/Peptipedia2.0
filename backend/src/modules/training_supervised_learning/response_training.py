from sklearn.model_selection import cross_validate
from sklearn.metrics import confusion_matrix
from sklearn import metrics
from sklearn.model_selection import StratifiedKFold
from sklearn.model_selection import train_test_split
from sklearn.model_selection import learning_curve
from sklearn.model_selection import ShuffleSplit

from scipy.stats import pearsonr
from scipy.stats import spearmanr
from scipy.stats import kendalltau

import math
import numpy as np

class response_training_model:
    def __init__(self, dataset, target, model, validation):
        self.dataset = dataset
        self.target = target
        self.model = model
        self.validation = validation

    def estimate_performance(self, metrics_list):
        response_data = cross_validate(self.model, self.dataset, self.target, cv = self.validation, scoring = metrics_list)
        performance = [{metric: np.mean(response_data["test_{}".format(metric)]).round(3)} for metric in metrics_list]
        return {"performance": performance}

    def confussion_matrix(self):
        self.predict_values = self.model.predict(self.dataset)
        labels = self.target.unique().tolist()
        confusion_matrix_response = confusion_matrix(self.target, self.predict_values, labels = labels)
        labels = [str(tar) for tar in labels]
        self.cf_matrix = confusion_matrix_response.tolist()
        return {"confusion_matrix": {"x": labels, "y": labels, "z": self.cf_matrix}}

    def analysis(self):
        sensibility_array = []
        for i in range(len(self.cf_matrix)):
            sumRow = sum(self.cf_matrix[i])
            if sumRow != 0:
                value = self.cf_matrix[i][i]/sumRow
            else:
                value = 0.0
            sensibility_array.append(value)
        self.transpose_cf_matrix = np.array(self.cf_matrix).transpose()
        sensitivity_array = []
        for i in range(len(self.transpose_cf_matrix)):
            sumRow = sum(self.transpose_cf_matrix[i])
            if sumRow != 0:
                value = self.transpose_cf_matrix[i][i]/sumRow
            else:
                value = 0.0
            sensitivity_array.append(value)
        return {"analysis": {"sensibility": sensibility_array, "sensitivity": sensitivity_array}}

    def get_labels(self):
        return {"labels": {"target": self.target.tolist(), "predicted_label": self.predict_values.tolist()}}
    
    def learning_curve(self):
        train_sizes, train_scores, test_scores = learning_curve(self.model, self.dataset, self.target, cv=self.validation, n_jobs=5, train_sizes=np.linspace(.1, 1.0, 5))
        train_scores_mean = np.mean(train_scores, axis=1)
        train_scores_std = np.std(train_scores, axis=1)
        test_scores_mean = np.mean(test_scores, axis=1)
        test_scores_std = np.std(test_scores, axis=1)
        error_train = np.concatenate((train_scores_mean + train_scores_std, train_scores_mean - train_scores_std))
        error_test = np.concatenate((test_scores_mean + test_scores_std, test_scores_mean - test_scores_std))
        error_sizes = np.concatenate((train_sizes, train_sizes[::-1]))
        return {
            "learning_curve": {
                "training": { "x": train_sizes.tolist(), "y": train_scores_mean.round(3).tolist()},
                "error_training":{"x": error_sizes.tolist(), "y": error_train.round(3).tolist()},
                "testing": {"x": train_sizes.tolist(), "y": test_scores_mean.round(3).tolist()},
                "error_testing":{"x": error_sizes.tolist(), "y": error_test.round(3).tolist()}
                }
            }

    def correlations(self):
        self.predict_values = self.model.predict(self.dataset)
        kendall_value = self.__calculatekendalltau(self.target, self.predict_values)
        pearson_value = self.__calculatedPearson(self.target, self.predict_values)
        spearman_value = self.__calculatedSpearman(self.target, self.predict_values)
        return {"corr": {"kendall": kendall_value, "pearson": pearson_value, "spearman": spearman_value}}

    def scatter_plot(self):
        return {"scatter": {"x": self.target.to_list(), "y": self.predict_values.tolist()}}

    def error_bars(self):
        error = self.target - self.predict_values
        return {"error_boxplot": error.round(3).tolist()}

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
        dictResponse = {"pearsonr": r1.round(3), "pvalue": r2.round(3)}
        return dictResponse

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
        dictResponse = {"spearmanr": r1.round(3), "pvalue": r2.round(3)}
        return dictResponse

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
        dictResponse = {"kendalltau": r1.round(3), "pvalue": r2.round(3)}
        return dictResponse