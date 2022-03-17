from scipy.fft import fft
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import sys
import os

path_input = sys.argv[1]
path_output = sys.argv[2]

command = "mkdir -p "+path_output+"digital_signal_processing"
os.system(command)

path_output = path_output+"digital_signal_processing/"

list_clusters = ["alpha-structure_group", "betha-structure_group", "energetic_group", "hydropathy_group", "hydrophobicity_group", "index_group", "secondary_structure_properties_group", "volume_group"]

for cluster in list_clusters:
	
	command = "mkdir -p "+path_output+cluster
	os.system(command)

	dataset = pd.read_csv(path_input+cluster+"/"+cluster+".csv")

	matrix_encoding = []
	index_data = []

	for i in range(len(dataset)):
		
		#get a sequences 	
		sequence_encoding = [dataset[key][i] for key in dataset.keys() if key[0] == "P"]
		index_data.append(dataset['id_sequence'][i])

		number_sample = len(sequence_encoding)

		# sample spacing
		T = 1.0/float(number_sample)
		x = np.linspace(0.0, number_sample*T, number_sample)
		yf = fft(sequence_encoding)
		xf = np.linspace(0.0, 1.0/(2.0*T), number_sample//2)
		matrix_encoding.append(np.abs(yf[0:number_sample//2]))
	
	header = ["P_"+str(i+1) for i in range(len(matrix_encoding[0]))]	
	dataset_export = pd.DataFrame(matrix_encoding, columns=header)
	dataset_export['id_sequence'] = index_data

	dataset_export.to_csv(path_output+cluster+"/"+cluster+".csv", index=False)


	#get average for each element in matrix and create a statistical graph
	statistical_encoding_data = {"avg":[], "std":[], "min":[], "max":[], "IC-Low":[], "IC_High":[], "Q1":[], "Q3":[]}

	for i in range(len(matrix_encoding[0])):
		point_data = []

		for j in range(len(matrix_encoding)):
			point_data.append(matrix_encoding[j][i])

		avg_data = np.mean(point_data)
		std_data = np.std(point_data)
		max_data = np.max(point_data)
		min_data = np.min(point_data)
		q1_value = np.quantile(point_data, .25)
		q3_value = np.quantile(point_data, .75)
		
		statistical_encoding_data['avg'].append(avg_data)
		statistical_encoding_data['std'].append(std_data)
		statistical_encoding_data['min'].append(min_data)
		statistical_encoding_data['max'].append(max_data)
		statistical_encoding_data['Q1'].append(q1_value)
		statistical_encoding_data['Q3'].append(q3_value)

	lower_interval_IC = []
	upper_interval_IC = []

	for i in range(len(statistical_encoding_data['avg'])):
		low_value = statistical_encoding_data['avg'][i] -1.96*statistical_encoding_data['std'][i]
		high_value = statistical_encoding_data['avg'][i] +1.96*statistical_encoding_data['std'][i]
		lower_interval_IC.append(low_value)
		upper_interval_IC.append(high_value)

	statistical_encoding_data['IC-Low'] = lower_interval_IC
	statistical_encoding_data['IC_High'] = upper_interval_IC


	#export data and create curve image
	df = pd.DataFrame({'x':xf[30:], 'y1':statistical_encoding_data['avg'][30:], 'y2':statistical_encoding_data['IC-Low'][30:], 'y3':statistical_encoding_data['IC_High'][30:], 'y4': statistical_encoding_data['Q1'][30:], 'y5':statistical_encoding_data['Q3'][30:]})
	plt.clf()
	# multiple line plot
	plt.plot( 'x', 'y1', data=df, marker='', color='skyblue', linewidth=1.5, label="Average")
	plt.plot( 'x', 'y2', data=df, marker='', color='olive', linewidth=1.5, label="Low IC-95%")
	plt.plot( 'x', 'y3', data=df, marker='', color='red', linewidth=1.5, label="Upper IC-95%")
	plt.plot( 'x', 'y4', data=df, marker='', color='blue', linewidth=1.5, label="Q1")
	plt.plot( 'x', 'y5', data=df, marker='', color='green', linewidth=1.5, label="Q2")
	plt.legend()
	plt.title("Evaluating property spectra")
	plt.xlabel("Domain")
	plt.ylabel("Frequency")
	plt.savefig(path_output+cluster+"/summary_spectras.svg")

	#export data to csv
	data_export = pd.DataFrame()
	data_export['domain'] = xf
	data_export['average_curve'] = statistical_encoding_data['avg']
	data_export['lower_interval_IC'] = statistical_encoding_data['IC-Low']
	data_export['upper_interval_IC'] = statistical_encoding_data['IC_High']
	data_export['Q1_curve'] = statistical_encoding_data['Q1']
	data_export['Q3_curve'] = statistical_encoding_data['Q3']
	data_export.to_csv(path_output+cluster+"/summary_spectras.csv", index=False)
		
	plt.clf()	
	