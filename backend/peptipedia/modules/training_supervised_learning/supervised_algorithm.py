"""Supervised algorithms"""
from sklearn.model_selection import train_test_split

from peptipedia.modules.training_supervised_learning import response_training

class ModelAlgorithm:
    """Model algorithm class"""
    def __init__(self, dataset, target, task, algorithm, validation, model, test_size):
        self.dataset = dataset
        self.target = target
        self.algorithm = algorithm
        self.validation = validation
        self.model = model
        self.task = task
        self.test_size = test_size
        if self.test_size != 0:
            self.x_train, self.x_test, self.y_train, self.y_test = train_test_split(
                self.dataset, self.target, test_size=self.test_size
            )
            self.training_performances = response_training.ResponseTrainingModel(
                self.x_train, self.y_train, self.model, self.validation
            )
            self.testing_performances = response_training.ResponseTrainingModel(
                self.x_test, self.y_test, self.model, self.validation
            )
        if self.test_size == 0:
            self.x_train = self.dataset
            self.y_train = self.target
            self.training_performances = response_training.ResponseTrainingModel(
                self.x_train, self.y_train, self.model, self.validation
            )

    def training_method(self):
        """Training method"""
        self.model = self.model.fit(self.x_train, self.y_train)
        response = {}
        if self.task == "classification":
            if len(self.target.unique()) == 2:  # Binary
                metrics_list = ["accuracy", "recall", "precision", "f1"]
            else:  # Multiclass
                metrics_list = [
                    "accuracy",
                    "f1_weighted",
                    "recall_weighted",
                    "precision_weighted",
                ]
            response.update(self.training_performances.estimate_performance(metrics_list))
            response.update(self.training_performances.confussion_matrix())
            response.update(self.training_performances.analysis())
            response.update(self.training_performances.learning_curve())
        elif self.task == "regression":
            metrics_list = [
                "r2",
                "neg_median_absolute_error",
                "neg_root_mean_squared_error",
            ]
            response.update(self.training_performances.estimate_performance(metrics_list))
            response.update(self.training_performances.correlations())
            response.update(self.training_performances.scatter_plot())
            response.update(self.training_performances.error_bars())
        return response

    def testing_method(self):
        """Testing method"""
        response = {}
        if self.task == "classification":
            if len(self.target.unique()) == 2:  # Binary
                metrics_list = ["accuracy", "recall", "precision", "f1"]
            else:  # Multiclass
                metrics_list = [
                    "accuracy",
                    "f1_weighted",
                    "recall_weighted",
                    "precision_weighted",
                ]
            response.update(self.testing_performances.estimate_performance(metrics_list))
            response.update(self.testing_performances.confussion_matrix())
            response.update(self.testing_performances.analysis())
        elif self.task == "regression":
            metrics_list = [
                "r2",
                "neg_median_absolute_error",
                "neg_root_mean_squared_error",
            ]
            response.update(self.testing_performances.estimate_performance(metrics_list))
            response.update(self.testing_performances.correlations())
            response.update(self.testing_performances.scatter_plot())
            response.update(self.testing_performances.error_bars())
        return response
