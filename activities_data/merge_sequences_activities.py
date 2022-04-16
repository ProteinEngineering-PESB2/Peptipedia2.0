import pandas as pd
import sys

dataset_update = pd.read_csv(sys.argv[1])
prev_database = pd.read_csv(sys.argv[2])

is_in_update_db = []

seq_list = [seq.upper().strip() for seq in dataset_update['sequence']]
cont0 = 0
cont1 = 0

print("Searching sequences in new database")
for i in range(len(prev_database)):
    if prev_database['sequence'][i] in seq_list:
        is_in_update_db.append(1)
        cont1+=1
    else:
        is_in_update_db.append(0)
        cont0+=1
print("Summary found")
print("Sequences OK: ", cont1)
print("Sequences not found", cont0)
print("Total sequences", len(prev_database))

################################################
is_in_prev_database_db = []

seq_list = [seq.upper().strip() for seq in prev_database['sequence']]
cont0 = 0
cont1 = 0

print("Searching sequences in old database")
for i in range(len(dataset_update)):
    if dataset_update['sequence'][i] in seq_list:
        is_in_prev_database_db.append(1)
        cont1+=1
    else:
        is_in_prev_database_db.append(0)
        cont0+=1
print("Summary found")
print("Sequences OK: ", cont1)
print("Sequences not found", cont0)
print("Total sequences", len(dataset_update))

print("Export update datasets")
dataset_update['is_in_old']  = is_in_prev_database_db
prev_database['is_in_update'] = is_in_update_db

dataset_update.to_csv("database_update.csv", index=False)
prev_database.to_csv("prev_database.csv", index=False)

