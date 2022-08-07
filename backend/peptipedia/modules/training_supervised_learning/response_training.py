"""Response training module"""
import math

import numpy as np
from scipy.stats import kendalltau, pearsonr, spearmanr
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import (
    cross_validate,
    learning_curve
)


class ResponseTrainingModel:
    """Response training class"""
    def __init__(self, dataset, target, model, validation):
        self.dataset = dataset
        self.target = target
        self.model = model
        self.validation = validation
        self.predict_values = None
        self.labels = None
        self.cf_matrix = None

    def estimate_performance(self, metrics_list):
        """Estimate performance method"""
        response_data = cross_validate(
            self.model,
            self.dataset,
            self.target,
            cv=self.validation,
            scoring=metrics_list,
        )
        performance = {
            metric: np.mean(response_data[f"test_{metric}"]).round(3)
            for metric in metrics_list
        }
        return {"performance": performance}

    def confussion_matrix(self):
        """Confussion matrix method"""
        self.predict_values = self.model.predict(self.dataset)
        labels = self.target.unique().tolist()
        confusion_matrix_response = confusion_matrix(
            self.target, self.predict_values, labels=labels
        )

        self.labels = [str(tar) for tar in labels]
        self.cf_matrix = confusion_matrix_response.tolist()
        return {
            "confusion_matrix": {
                "x": self.labels,
                "y": self.labels,
                "z": self.cf_matrix,
            }
        }

    def analysis(self):
        """Analysis method"""
        sensibility_array = []
        for index, value_cf in enumerate(self.cf_matrix):
            sum_row = sum(value_cf)
            if sum_row != 0:
                value = value_cf[index] / sum_row
            else:
                value = 0.0
            sensibility_array.append(value)
        transpose_cf_matrix = np.array(self.cf_matrix).transpose()
        sensitivity_array = []
        for index, matrix_value in enumerate(transpose_cf_matrix):
            sum_row = sum(matrix_value)
            if sum_row != 0:
                value = matrix_value[index] / sum_row
            else:
                value = 0.0
            sensitivity_array.append(value)
        return {
            "analysis": {
                "sensibility": sensibility_array,
                "sensitivity": sensitivity_array,
                "categories": self.labels,
            }
        }

    def get_labels(self):
        """Get labels method"""
        return {
            "labels": {
                "target": self.target.tolist(),
                "predicted_label": self.predict_values.tolist(),
            }
        }

    def learning_curve(self):
        """Create learning curve"""
        train_sizes, train_scores, test_scores = learning_curve(
            self.model,
            self.dataset,
            self.target,
            cv=self.validation,
            n_jobs=5,
            train_sizes=np.linspace(0.1, 1.0, 5),
        )

        train_scores_mean = np.mean(train_scores, axis=1)
        train_scores_std = np.std(train_scores, axis=1)
        test_scores_mean = np.mean(test_scores, axis=1)
        test_scores_std = np.std(test_scores, axis=1)

        train_error_down = train_scores_mean - train_scores_std
        test_error_down = test_scores_mean - test_scores_std
        error_train = np.concatenate(
            (train_scores_mean + train_scores_std, train_error_down[::-1])
        )
        error_test = np.concatenate(
            (test_scores_mean + test_scores_std, test_error_down[::-1])
        )
        error_sizes = np.concatenate((train_sizes, train_sizes[::-1]))

        response = {
            "learning_curve": {
                "training": {
                    "x": train_sizes.tolist(),
                    "y": train_scores_mean.round(3).tolist(),
                },
                "error_training": {
                    "x": error_sizes.tolist(),
                    "y": error_train.round(3).tolist(),
                },
                "testing": {
                    "x": train_sizes.tolist(),
                    "y": test_scores_mean.round(3).tolist(),
                },
                "error_testing": {
                    "x": error_sizes.tolist(),
                    "y": error_test.round(3).tolist(),
                },
            }
        }
        for j in response["learning_curve"].keys():
            mask = np.isfinite(response["learning_curve"][j]["y"])
            response["learning_curve"][j]["x"] = np.array(
                response["learning_curve"][j]["x"]
            )[mask].tolist()
            response["learning_curve"][j]["y"] = np.array(
                response["learning_curve"][j]["y"]
            )[mask].tolist()
        return response

    def correlations(self):
        """Calculate correlations"""
        self.predict_values = self.model.predict(self.dataset)
        kendall_value = self.__calculate_kendall_tau(self.target, self.predict_values)
        pearson_value = self.__calculated_pearson(self.target, self.predict_values)
        spearman_value = self.__calculated_spearman(self.target, self.predict_values)
        return {
            "corr": {
                "kendall": kendall_value,
                "pearson": pearson_value,
                "spearman": spearman_value,
            }
        }

    def scatter_plot(self):
        """Return scatter_plot format"""
        return {
            "scatter": {"x": self.target.to_list(), "y": self.predict_values.tolist()}
        }

    def error_bars(self):
        """Return Error bars format"""
        error = self.target - self.predict_values
        return {"error_values": error.round(3).tolist()}

    def __calculated_pearson(self, real_values, predict_values):
        """Pearson correlation"""
        response = pearsonr(real_values, predict_values)
        if math.isnan(response[0]):
            r_1 = "ERROR"
        else:
            r_1 = response[0]
        if math.isnan(response[1]):
            r_2 = "ERROR"
        else:
            r_2 = response[1]
        return {"pearsonr": round(r_1, 3), "pvalue": round(r_2, 3)}

    def __calculated_spearman(self, real_values, predict_values):
        """Spearman correlation"""
        response = spearmanr(real_values, predict_values)
        if math.isnan(response[0]):
            r_1 = "ERROR"
        else:
            r_1 = response[0]
        if math.isnan(response[1]):
            r_2 = "ERROR"
        else:
            r_2 = response[1]
        return {"spearmanr": round(r_1, 3), "pvalue": round(r_2, 3)}
        
    def __calculate_kendall_tau(self, real_values, predict_values):
        """Kendall tau correlation"""
        response = kendalltau(real_values, predict_values)
        if math.isnan(response[0]):
            r_1 = "ERROR"
        else:
            r_1 = response[0]
        if math.isnan(response[1]):
            r_2 = "ERROR"
        else:
            r_2 = response[1]
        return {"kendalltau": round(r_1, 3), "pvalue": round(r_2, 3)}
