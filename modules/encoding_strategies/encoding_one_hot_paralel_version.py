import pandas as pd
import sys
import multiprocessing as mp
import numpy as np

def create_vector(residue, dict_residues):

	vector_encoding = [0 for x in range(20)]
	vector_encoding[dict_residues[residue]] = 1

	return vector_encoding

def prepare_data():
	residues = ["A","R","N","D","C","Q","E","G","H","I","L","K","M","F","P","S","T","W","Y","V"]
	residues.sort()
	dict_residues = {}
	for i in range(len(residues)):
		dict_residues.update({residues[i]:i})

	return residues, dict_residues

def encoding_data(dataset):

	#prepare data for encoding
	residues, dict_residues= prepare_data()

	id_sequences = []
	matrix_encoding = []
	for i in dataset.index:
		sequence = dataset['sequence'][i]
		id_sequences.append(dataset['id'][i])

		#ignored non canonical residues
		for residue in sequence:
			if residue not in residues:
				sequence = sequence.replace(residue, "")
				
		row_encoding = []

		for residue in sequence:
			residue_encoding = create_vector(residue, dict_residues)
			for data in residue_encoding:
				row_encoding.append(data)

		matrix_encoding.append(row_encoding)

	#create zero padding
	for i in range(len(matrix_encoding)):

		for j in range(len(matrix_encoding[i]),length_to_zero):
			matrix_encoding[i].append(0)

	header = ["P_"+str(i) for i in range(len(matrix_encoding[0]))]

	dataset_export = pd.DataFrame(matrix_encoding, columns=header)

	return dataset_export

dataset = pd.read_csv(sys.argv[1])
path_output = sys.argv[2]
length_to_zero = int(sys.argv[3])

#get number of cpu
cpu_number = mp.cpu_count()

print('Dividiendo dataframe entre {} cores'.format(cpu_number))
df_split = np.array_split(dataset, cpu_number)

pool = mp.Pool(cpu_number)
print("Ejecutando Codificacion...")
df = pd.concat(pool.map(encoding_data, df_split))
pool.close()
pool.join()

#export df
df.to_csv(path_output+"encoding_one_hot.csv", index=False)
