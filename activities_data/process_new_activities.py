import pandas as pd
import sys

dataset = pd.read_csv(sys.argv[1])
dataset = dataset.dropna()
unique_activities = dataset['description'].unique()

list_activities = []

print("Split activities")
for activity in unique_activities:
    data1 = activity.replace("|", ",").replace(";", ",")
    data2 = data1.split(",")

    for element in data2:
        list_activities.append(element.strip())

print("Get unique activities")
list_activities = list(set(list_activities))
print("Unique activities ", len(list_activities))

df_export = pd.DataFrame()
df_export['activity'] = list_activities
df_export.to_csv("list_activities.csv", index=False)

