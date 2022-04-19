import pandas as pd
import sys

dataset = pd.read_csv(sys.argv[1])
print(len(dataset))