from sklearn.ensemble import AdaBoostClassifier, AdaBoostRegressor
from sklearn.ensemble import BaggingClassifier, BaggingRegressor
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.naive_bayes import BernoulliNB, GaussianNB
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.svm import NuSVC, NuSVR, SVC, SVR
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from modules.training_supervised_learning import supervised_algorithm

class run_algorithm:
    def __init__(self, dataset, response, task, algorithm, validation):
        self.dataset = dataset
        self.response = response
        self.task = task
        self.algorithm = algorithm
        self.validation = validation
        self.model = None
        
    def __instance_classification_model(self):

        if self.algorithm == "adaboost": #Adaboost
            self.model = AdaBoostClassifier()

        elif self.algorithm == "bagging":#Bagging
            self.model = BaggingClassifier()

        elif self.algorithm == "bernoulli":#Bernoulli
            self.model = BernoulliNB()

        elif self.algorithm == "descision_tree":#Decision tree
            self.model = DecisionTreeClassifier()

        elif self.algorithm == "gaussian_bayes": #Gaussian Bayes
            self.model = GaussianNB()

        elif self.algorithm == "gradient_boosting": #GradientBoostingClassifier
            self.model = GradientBoostingClassifier()

        elif self.algorithm == "nu_svc": # NuSVC
            self.model = NuSVC()

        elif self.algorithm == "random_forest": # Random Forest
            self.model = RandomForestClassifier()

        elif self.algorithm == "svc": # SVC
            self.model = SVC()

        elif self.algorithm == "knn": #KNN
            self.model = KNeighborsClassifier()

    def __instance_regression_model(self):

        if self.algorithm == "adaboost": #Adaboost
            self.model = AdaBoostRegressor()

        elif self.algorithm == "bagging":#Bagging
            self.model = BaggingRegressor()

        elif self.algorithm == "descision_tree":#Decision tree
            self.model = DecisionTreeRegressor()

        elif self.algorithm == "gradient_boosting": #GradientBoostingRegressor
            self.model = GradientBoostingRegressor()

        elif self.algorithm == "nu_svr": # NuSVC
            self.model = NuSVR()

        elif self.algorithm == "random_forest": # Random Forest
            self.model = RandomForestRegressor()

        elif self.algorithm == "svr": # SVC
            self.model = SVR()

        elif self.algorithm == "knn": #KNN
            self.model = KNeighborsRegressor()

    def training_model(self):

        #start model
        if self.task == "classification": #class
            self.__instance_classification_model()
        elif self.task == "regression":
            self.__instance_regression_model()
        else:
            pass
        #instance training object
        self.training_object = supervised_algorithm.model_algorithm(self.dataset, self.response, self.task, self.algorithm, self.validation, self.model)
        return self.training_object.trainingMethod()

    def testing_model(self):
        return self.training_object.testingMethod()

    def get_model(self):
        return self.model