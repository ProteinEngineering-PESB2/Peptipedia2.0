import pandas as pd
import sys

print("Read dataset")
new_database = pd.read_csv(sys.argv[1])
old_database = pd.read_csv(sys.argv[2])
activities_list = pd.read_csv(sys.argv[3])

print("Get unique sequences")
sequences_data_new = [seq.strip().upper() for seq in new_database['sequence']]
sequences_data_old = [seq.strip().upper() for seq in old_database['sequence']]

unique_seq = sequences_data_old + sequences_data_new
unique_seq = list(set(unique_seq))
print("Unique sequences: ", len(unique_seq))

print("Creating dataframe")
df_export = pd.DataFrame()
df_export['sequence'] = unique_seq

df_export['activity_in_db_new'] = [None for i in range(len(unique_seq))]

for activity in activities_list['activity']:
    df_export[activity] = [None for i in range(len(unique_seq))]

print("Searching info in old database")
for i in range(len(df_export)):
    data_search = old_database.loc[old_database['sequence'] == df_export['sequence'][i]]
    if len(data_search)>0:
        data_search = data_search.reset_index()
        for activity in activities_list['activity']:
            df_export[activity][i] = data_search[activity][0]

print("Searching info in new database")
for i in range(len(df_export)):
    data_search = new_database.loc[new_database['sequence'] == df_export['sequence'][i]]
    if len(data_search)>0:
        data_search = data_search.reset_index()
        values_data = data_search['description'][0]
        df_export['activity_in_db_new'][i] = values_data

print("Export data with values")
df_export.to_csv("data_sequences_update_with_prev_activities.csv", index=False)
