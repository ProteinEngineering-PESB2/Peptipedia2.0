import pandas as pd
import sys
import os
import multiprocessing as mp
import numpy as np

def encoding_data_paralel(dataset):

	matrix_sequence_encoding = []

	index_sequences = []
	index=0

	for i in dataset.index:
		index_sequences.append(dataset['id'][i])
		sequence = dataset['sequence'][i]
		sequence = sequence.upper()		
		sequence_encoding = encoding_sequence(sequence, dataset_cluster['component_1'])		
		matrix_sequence_encoding.append(sequence_encoding)

	#make zero padding
	#create zero padding
	for i in range(len(matrix_sequence_encoding)):

		for j in range(len(matrix_sequence_encoding[i]),length_data_zero):
			matrix_sequence_encoding[i].append(0)

	header = ["P_"+str(i) for i in range(len(matrix_sequence_encoding[0]))]
	dataset_export = pd.DataFrame(matrix_sequence_encoding, columns=header)
	dataset_export['id_sequence'] = index_sequences

	return dataset_export

def encoding_sequence(sequence, value_property):

	#order in database
	array_residues = ['A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V']
	sequence_encoding = []

	for residue in sequence:		
		encoding_value =-1
		index=-1
		for i in range(len(array_residues)):
			if array_residues[i] == residue:
				index=i
				break
		if index != -1:
			sequence_encoding.append(value_property[index])

	return sequence_encoding

list_clusters = ["alpha-structure_group", "betha-structure_group", "energetic_group", "hydropathy_group", "hydrophobicity_group", "index_group", "secondary_structure_properties_group", "volume_group"]

dataset = pd.read_csv(sys.argv[1])
path_inputs_encodings = sys.argv[2]
path_output = sys.argv[3]
length_data_zero = int(sys.argv[4])

command = "mkdir -p "+path_output+"physicochemical_properties"
os.system(command)

path_output = path_output+"physicochemical_properties/"

for cluster in list_clusters:

	print("Process property ", cluster)

	command = "mkdir -p "+path_output+cluster
	print(command)
	os.system(command)

	dataset_cluster = pd.read_csv(path_inputs_encodings+cluster+"/data_component.csv")
	#get number of cpu
	cpu_number = mp.cpu_count()

	print('Dividiendo dataframe entre {} cores'.format(cpu_number))
	df_split = np.array_split(dataset, cpu_number)

	pool = mp.Pool(cpu_number)
	print("Ejecutando Codificacion...")
	df = pd.concat(pool.map(encoding_data_paralel, df_split))
	pool.close()
	pool.join()

	df.to_csv(path_output+cluster+"/"+cluster+".csv", index=False)
