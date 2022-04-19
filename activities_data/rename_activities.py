import pandas as pd
import sys

actual_names = pd.read_csv(sys.argv[1])
rename_data = pd.read_csv(sys.argv[2])

new_names = []

for i in range(len(actual_names)):
    name_activity = actual_names['name_activity'][i]
    for j in range(len(rename_data)):
        if name_activity == rename_data['activity'][j]:
            name_activity = rename_data['real_name'][j]
            break
    new_names.append(name_activity)

df_export = pd.DataFrame()
df_export['actual_name'] = actual_names['name_activity']
df_export['rename_values'] = new_names

df_export.to_csv("data_activity_update.csv", index=False)
