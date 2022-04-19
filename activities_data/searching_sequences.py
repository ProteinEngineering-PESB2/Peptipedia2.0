import pandas as pd
import sys

dataset = pd.read_csv(sys.argv[1])
activities_search = pd.read_csv(sys.argv[2])

activity_upper = []

print("Transform")
for i in range(len(dataset)):
    activity_value = ''
    try:
        activity_value = dataset['activity_in_db_new'][i].upper()
    except:
        pass

    activity_upper.append(activity_value)

dataset['upper_activity'] = activity_upper

print("Counting")
counts = []
for j in range(len(activities_search)):
    activity = activities_search['activity'][j]
    count = 0
    for i in range(len(dataset)):
        if activity in dataset['upper_activity'][i]:
            count+=1
    counts.append(count)

print("Exporting")
activities_search['count'] = counts
activities_search.to_csv("new_activities_with_count.csv", index=False)
