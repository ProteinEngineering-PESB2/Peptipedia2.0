import pandas as pd
import sys
import multiprocessing as mp

def create_vector(residue, dict_residues):
	vector_encoding = [0 for x in range(20)]
	vector_encoding[dict_residues[residue]] = 1
	return vector_encoding

dataset = pd.read_csv(sys.argv[1])
path_output = sys.argv[2]
length_to_zero = int(sys.argv[3])

matrix_encoding = []
residues = ["A","R","N","D","C","Q","E","G","H","I","L","K","M","F","P","S","T","W","Y","V"]
residues.sort()
id_sequences = []

dict_residues = {}
for i in range(len(residues)):
	dict_residues.update({residues[i]:i})

for i in range(len(dataset)):
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
dataset_export['id_sequence'] = id_sequences
dataset_export.to_csv(path_output+"encoding_OneHot.csv", index=False)
