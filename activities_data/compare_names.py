import pandas as pd
import sys

print("Reading documents")
name_activities = pd.read_csv(sys.argv[1])
proposed_activities = pd.read_csv(sys.argv[2])

print("Compare names")
unique_activities = proposed_activities['name_activity']

not_found_names = []
for activity in unique_activities:
    cont=0
    print("Searching activity ", activity)
    for j in range(len(name_activities)):
        if name_activities['name_activity'][j] == activity:
            cont=1
            break
    if cont==0:
        not_found_names.append(activity)

not_found_names = list(set(not_found_names))
print("Number of not founds ", len(not_found_names))
df_not = pd.DataFrame()
df_not['activity'] = not_found_names
df_not.to_csv("not_found_values.csv", index=False)
