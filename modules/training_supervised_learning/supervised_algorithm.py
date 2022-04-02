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
    #type_dataset: 
    def trainingMethod(self, type_dataset):

        self.model = self.model.fit(self.dataset, self.target)
        self.training_performances.training_using_cross_validation(self.model, self.algorithm,  self.validation)

        if type_dataset == 1:  # binary
            self.training_performances.estimatedMetricsPerformance(self.dataset, self.target)
        else:
            self.training_performances.estimatedMetricsPerformanceMultilabels(self.dataset, self.target)