import response_training

class model_algorithm(object):
    def __init__(self, dataset, target, n_estimators, algorithm, validation, model):
        self.dataset=dataset
        self.target=target
        self.n_estimators=n_estimators
        self.algorithm=algorithm
        self.validation=validation
        self.model = model
        self.training_performances = response_training.response_training_model()

    def trainingMethod(self, kindDataSet):

        self.model = self.model.fit(self.dataset, self.target)
        params = "algorithm:%s-n_estimators:%d" % (self.algorithm, self.n_estimators)
        self.training_performances.training_using_cross_validation(self.model, self.algorithm, params, self.validation)

        if kindDataSet == 1:  # binary
            self.training_performances.estimatedMetricsPerformance(self.dataset, self.target)
        else:
            self.training_performances.estimatedMetricsPerformanceMultilabels(self.dataset, self.target)