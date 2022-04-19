import pandas as pd
import sys

def merge_old_new(old_class, new_class):

    vector_data = []

    for i in range(len(old_class)):
        sum_value = old_class[i] + new_class[i]
        if sum_value != 0:
            vector_data.append(1)
        else:
            vector_data.append(0)
    return vector_data

def update_values_new_class(activity, df_sequences, df_new_data):

    list_data = df_new_data.loc[df_new_data['Name in DB'] == activity].reset_index()
    list_activities = [value for value in list_data['activity']]

    value_activity = []
    for i in range(len(df_sequences)):
        non_exist = 0
        try:
            name_activity = df_sequences['activity_in_db_new'][i].upper()
            for value in list_activities:
                if value in name_activity:
                    non_exist = 1
                    break
        except:
            pass
        value_activity.append(non_exist)
    return value_activity

def merge_data(vector1, vector2):

    new_vector = []
    for i in range(len(vector1)):
        value1 = vector1[i]
        value2 = vector2[i]

        sum_value = value1+value2
        new_vector.append(sum_value)
    return new_vector

def replace_values_in_array(data_array):

    new_data = []
    for element in data_array:
        if element == 0 or element == 1:
            new_data.append(element)
        else:
            new_data.append(0)
    return new_data

def create_zero_array(len_value):

    return [0 for i in range(len_value)]

def search_activity_in_list(activity, df):

    df_loc = df.loc[df['activity'] == activity].reset_index()
    return df_loc['in_old'][0]

print("Reading data")
data_with_sequences = pd.read_csv(sys.argv[1])#informacion de las secuencias
list_activities = pd.read_csv(sys.argv[2])#listado de nuevas actividades
dictionary_activities = pd.read_csv(sys.argv[3])#valor a buscar con la nueva actividad

print("Creating dataset")
df_data = pd.DataFrame()
df_data['sequence'] = data_with_sequences['sequence']

data_summary = []

for i in range(len(list_activities)):
    activity = list_activities['activity'][i]
    vector_class = None
    print("Process activity: ", list_activities['activity'][i])
    vector_data = create_zero_array(len(data_with_sequences))

    if search_activity_in_list(activity, list_activities) == 1:
        print("Get old values")
        sequences_values = data_with_sequences[activity]
        sequences_values = replace_values_in_array(sequences_values)
        vector_class = merge_data(vector_data, sequences_values)
    else:
        vector_class = vector_data

    print("Adding values using new class")
    list_new_class_seq = update_values_new_class(activity, data_with_sequences, dictionary_activities)

    print("Merge class")
    list_merge = merge_old_new(vector_class, list_new_class_seq)

    df_data[activity] = list_merge
    row = [activity, list_merge.count(1)]
    data_summary.append(row)

df_data.to_csv("update_sequences_class.csv", index=False)

for row in data_summary:
    print(row)