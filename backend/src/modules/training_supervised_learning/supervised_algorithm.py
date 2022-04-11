from modules.training_supervised_learning import response_training

class model_algorithm(object):
    #building class
    #target: response
    #validation: k-value, default 5 please!
    #model: supervied learning algorithm only instance with default params
    def __init__(self, dataset, target, task, algorithm, validation, model):
        self.dataset=dataset
        self.target=target
        self.algorithm=algorithm
        self.validation=validation
        self.model = model
        self.task = task
        self.training_performances = response_training.response_training_model()

    def trainingMethod(self):

        self.model = self.model.fit(self.dataset, self.target)

        if self.task == "classification":
            if len(self.target.unique()) == 2: #Binary
                metrics_list =['accuracy', 'recall', 'precision', 'f1']
                response = self.training_performances.estimated_performance_class(self.dataset, self.target, self.model, self.validation, metrics_list)
                return response
            else: #Multiclass
                metric_list = ['accuracy', 'f1_weighted', 'recall_weighted', 'precision_weighted']
                response = self.training_performances.estimated_performance_class(self.dataset, self.target, self.model, self.validation, metric_list)
                return response
        elif self.task == "regression":
            metric_list = ['r2', 'neg_median_absolute_error', 'neg_root_mean_squared_error']
            response = self.training_performances.estimated_metric_regresion_models(self.dataset, self.target, self.model, self.validation, metric_list)
            return response