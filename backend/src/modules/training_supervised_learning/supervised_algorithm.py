from modules.training_supervised_learning import response_training
from sklearn.model_selection import train_test_split
class model_algorithm:
    def __init__(self, dataset, target, task, algorithm, validation, model):
        self.dataset=dataset
        self.target=target
        self.algorithm=algorithm
        self.validation=validation
        self.model = model
        self.task = task
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(self.dataset, self.target, test_size=0.2)
        self.training_performances = response_training.response_training_model(self.X_train, self.y_train, self.model, self.validation)
        self.testing_performances = response_training.response_training_model(self.X_test, self.y_test, self.model, self.validation)

    def trainingMethod(self):
        self.model = self.model.fit(self.X_train, self.y_train)
        tp = self.training_performances
        response = {}
        if self.task == "classification":
            if len(self.target.unique()) == 2: #Binary
                metrics_list = ['accuracy', 'recall', 'precision', 'f1']
            else: #Multiclass
                metrics_list = ['accuracy', 'f1_weighted', 'recall_weighted', 'precision_weighted']
            response.update(tp.estimate_performance(metrics_list))
            response.update(tp.confussion_matrix())
            response.update(tp.analysis())
            response.update(tp.learning_curve())
            return response
        elif self.task == "regression":
            metrics_list = ['r2', 'neg_median_absolute_error', 'neg_root_mean_squared_error']
            response.update(tp.estimate_performance(metrics_list))
            response.update(tp.correlations())
            response.update(tp.scatter_plot())
            response.update(tp.error_bars())
            return response

    def testingMethod(self):
        tp = self.testing_performances
        response = {}
        if self.task == "classification":
            if len(self.target.unique()) == 2: #Binary
                metrics_list = ['accuracy', 'recall', 'precision', 'f1']
            else: #Multiclass
                metrics_list = ['accuracy', 'f1_weighted', 'recall_weighted', 'precision_weighted']
            response.update(tp.estimate_performance(metrics_list))
            response.update(tp.confussion_matrix())
            response.update(tp.analysis())
            return response
        elif self.task == "regression":
            metrics_list = ['r2', 'neg_median_absolute_error', 'neg_root_mean_squared_error']
            response.update(tp.estimate_performance(metrics_list))
            response.update(tp.correlations())
            response.update(tp.scatter_plot())
            response.update(tp.error_bars())
            return response