import pandas as pd
import sys

dataset = pd.read_csv(sys.argv[1])

data_null = []

print("Update sequences using activity")
for i in range(len(dataset)):

    sum_data=0
    for column in dataset.columns:
        if column != 'sequence':
            sum_data+= dataset[column][i]

    if sum_data == 0:
        dataset['None Activity reported'][i] = 1

print("Make initial summary")
matrix_data = []
for activity in dataset.columns:
    if activity != 'sequence':
        sum_data = sum(dataset[activity])
        row = [activity, sum_data]
        matrix_data.append(row)

df_summary = pd.DataFrame(matrix_data, columns=['activity', 'count_prev'])
df_summary.to_csv("summary_initial_data.csv", index=False)