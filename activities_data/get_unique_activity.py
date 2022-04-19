import pandas as pd
import sys

def search_in_list(activity, list):
    cont=0
    for element in list:
        if element == activity:
            cont=1
            break
    return cont

new_activities = pd.read_csv(sys.argv[1])
data_sequences = pd.read_csv(sys.argv[2])

list_activity_old = [activity for activity in data_sequences.columns if activity not in ['sequence', 'activity_in_db_new']]
list_activity_new = [activity for activity in new_activities['rename_values']]
list_activities_full = list_activity_old + list_activity_new
unique_activities = list(set(list_activities_full))

matrix_data = []

for activity in unique_activities:
    print("Searching activity", activity)
    response_old = search_in_list(activity, list_activity_old)
    response_new = search_in_list(activity, list_activity_new)

    row = [activity, response_old, response_new]
    matrix_data.append(row)

df_data = pd.DataFrame(matrix_data, columns=['activity', 'in_old', 'in_new'])
df_data = df_data.sort_values(by=['activity'])
df_data.to_csv("list_activities_to_process.csv", index=False)

