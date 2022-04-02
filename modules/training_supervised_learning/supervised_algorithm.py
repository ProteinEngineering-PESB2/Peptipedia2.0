import response_training

class model_algorithm(object):
    #building class
    #target: response
    #validation: k-value, default 5 please!
    #model: supervied learning algorithm only instance with default params
    def __init__(self, dataset, target, type_response, algorithm, validation, model):
        self.dataset=dataset
        self.target=target
        self.algorithm=algorithm
        self.validation=validation
        self.model = model
        self.type_response = type_response
        self.training_performances = response_training.response_training_model()

    #training method support by cross validation
    #type_dataset: used to estimated performance:
    #   1 -> binary dataset
    #   2 -> multiclass dataset
    #   3 -> regresion model
    def trainingMethod(self, type_dataset):

        self.model = self.model.fit(self.dataset, self.target)

        if type_dataset == 1:
            metrics_list =['accuracy', 'recall', 'precision', 'f1']
            response = self.training_performances.estimated_performance_class(self.dataset, self.target, self.model, self.validation, metrics_list)
            return response
        elif type_dataset == 2:
            metric_list = ['accuracy', 'f1_weighted', 'recall_weighted', 'precision_weighted']
            response = self.training_performances.estimated_performance_class(self.dataset, self.target, self.model, self.validation, metric_list)
            return response
        else:
            metric_list = ['r2', 'neg_median_absolute_error', 'neg_root_mean_squared_error']
            response = self.training_performances.estimated_metric_regresion_models(self.dataset, self.target, self.model, self.validation, metric_list)
            return response