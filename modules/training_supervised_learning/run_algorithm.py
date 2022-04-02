#sklearn modules
from sklearn.ensemble import AdaBoostClassifier, AdaBoostRegressor
from sklearn.ensemble import BaggingClassifier, BaggingRegressor
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.naive_bayes import BernoulliNB, GaussianNB
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.svm import NuSVC, NuSVR, SVC, SVR
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor

import supervised_algorithm

class run_algorithm(object):

    def __init__(self, dataset, response, type_model, algorithm, validation):
        self.dataset = dataset
        self.response = response
        self.type_model = type_model
        self.algorithm = algorithm
        self.validation = validation
        self.model = None

    def __instance_classification_model(self):

        if self.algorithm == 1: #Adaboost
            self.model = AdaBoostClassifier()

        elif self.algorithm == 2:#Bagging
            self.model = BaggingClassifier()

        elif self.algorithm == 3:#Bernoulli
            self.model = BernoulliNB()

        elif self.algorithm == 4:#Decision tree
            self.model = DecisionTreeClassifier()

        elif self.algorithm == 5: #Gaussian Bayes
            self.model = GaussianNB()

        elif self.algorithm == 6: #GradientBoostingClassifier
            self.model = GradientBoostingClassifier()

        elif self.algorithm == 7: # NuSVC
            self.model = NuSVC()

        elif self.algorithm == 8: # Random Forest
            self.model = RandomForestClassifier()

        elif self.algorithm == 9: # SVC
            self.model = SVC()

        else: #KNN
            self.model = KNeighborsClassifier()

    def __instance_regression_model(self):

        if self.algorithm == 1: #Adaboost
            self.model = AdaBoostRegressor()

        elif self.algorithm == 2:#Bagging
            self.model = BaggingRegressor()

        elif self.algorithm == 3:#Decision tree
            self.model = DecisionTreeRegressor()

        elif self.algorithm == 4: #GradientBoostingRegressor
            self.model = GradientBoostingRegressor()

        elif self.algorithm == 5: # NuSVC
            self.model = NuSVR()

        elif self.algorithm == 6: # Random Forest
            self.model = RandomForestRegressor()

        elif self.algorithm == 7: # SVC
            self.model = SVR()

        else: #KNN
            self.model = KNeighborsRegressor()

    def training_model(self):

        #start model
        if self.type_model in [1,2]: #class
            self.__instance_classification_model()
        else:
            self.__instance_regression_model()

        #instance training object
        training_object = supervised_algorithm.model_algorithm(self.dataset, self.response, self.type_model, self.algorithm, self.validation, self.model)
        return training_object.trainingMethod(self.type_model)
