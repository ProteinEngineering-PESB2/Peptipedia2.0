import pandas as pd
import sys
from joblib import load

dataset = pd.read_csv(sys.argv[1])
model_file = sys.argv[2]

#trabajaremos solo con el multiclass a modo de ejemplo
response = dataset['variety']
dataset = dataset.drop(columns=['variety'])

model_instance = load(model_file)

print("Start predictions")
predictions = model_instance.predict(dataset)

print(predictions)