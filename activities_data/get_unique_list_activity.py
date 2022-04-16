import pandas as pd
import sys

dataset = pd.read_csv(sys.argv[1])

activities = [activity.strip().upper() for activity in dataset['activity']]
print(len(activities))

activities = list(set(activities))

data_activity = pd.DataFrame()
data_activity['activity'] = activities
data_activity = data_activity.sort_values(by=['activity'])
data_activity.to_csv("unique_activities_to_process.csv", index=False)