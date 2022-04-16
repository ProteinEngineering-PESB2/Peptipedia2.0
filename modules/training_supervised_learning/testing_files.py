import pandas as pd
import sys
import random

from run_algorithm import  run_algorithm

dataset = pd.read_csv(sys.argv[1])
response = dataset['variety']
dataset = dataset.drop(columns=['variety'])

#testing multiclass
run_instance = run_algorithm(dataset, response, 2, 1, 10)
response1 = run_instance.training_model("demo_multiclass.joblib")

#testing binary class
labe_simulated = [random.choice([1,0]) for i in range(len(dataset))]
run_instance_v2 = run_algorithm(dataset, labe_simulated, 1, 3, 10)
response2 = run_instance_v2.training_model("demo_binary_class.joblib")

#testing prediction
response_simulated = [random.randrange(1, 100) for j in range(len(dataset))]
run_instance_v3 = run_algorithm(dataset, response_simulated, 3, 5, 10)
response3 = run_instance_v3.training_model("demo_regresion.joblib")

print(response3)

