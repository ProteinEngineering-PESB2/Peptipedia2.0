from random import random
import os
import subprocess
from modules.utils import config_tool
from random import random
import pandas as pd
import json
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from scipy.cluster.hierarchy import dendrogram, linkage
from scipy.spatial.distance import squareform

class multiple_sequence_alignment(config_tool):
    def __init__(self, data, is_file, is_json, config):
        super().__init__("msa", data, config, is_file, is_json)
        self.output_file = os.path.realpath("{}/{}.aln".format(config["folders"]["static_folder"], str(round(random()*10**20))))
        self.distances_file = self.output_file.replace("aln", "mat")

    def execute_clustalo(self):
        command = "clustalo -i {} -o {} --distmat-out={} --full --force".format(self.temp_file_path, self.output_file, self.distances_file)
        os.system(command)

        f = open(self.output_file, "r")
        output_text = f.read()
        f.close()

        distance_table = pd.read_csv(self.distances_file, header=None, delimiter=r"\s+", skiprows=1)
        self.X = distance_table[0].to_list()
        self.Y = distance_table[0].to_list()
        distance_table.drop([0], axis = 1, inplace=True)
        self.Z = distance_table.values.tolist()
        #distance_table = {"X": X, "Y": Y, "Z": distance_table.values.tolist()}

        sequences = output_text.split(">")
        data = [seq.split("\n") for seq in sequences]
        data = data[1:]
        number_proteins = len(data)
        id = [sequence[0].split(" ")[0] for sequence in data]
        protein = ["".join(sequence[1:]) for sequence in data]
        alignment = []
        for i in range(number_proteins):
            dictionary = {}
            dictionary["label"] = ">" + id[i]
            dictionary["sequence"] = protein[i]
            dictionary["id"] = i+1
            alignment.append(dictionary)
        self.draw_heatmap()
        self.draw_dendrogram()
        self.delete_file()
        return {"alignment": alignment, "output_file" : self.output_file,
            "distances_file": self.distances_file, "image_heatmap": self.heatmap_path, "dendrogram": self.dendrogram_path}
    def draw_heatmap(self):
        plt.clf()
        plt.figure(figsize=(20, 20))
        if len(self.Z) > 35:
            fontsize = 10
        elif len(self.Z) > 30:
            fontsize = 15
        else:
            fontsize = 20
        ax = sns.heatmap(self.Z , linewidth = 1, xticklabels=self.X, yticklabels=self.Y,
                        annot=True, cbar = False, annot_kws={"fontsize": fontsize}, vmin = 0, vmax = 1)
        plt.xticks(fontsize= 20, rotation = 90)
        plt.yticks(fontsize= 20, rotation = 0)
        plt.tight_layout()
        self.heatmap_path = self.output_file.replace(".aln", "_heatmap.png")
        plt.savefig(self.heatmap_path)

    def draw_dendrogram(self):
        plt.clf()
        plt.figure(figsize=(20, 10))
        plt.ylabel('Distance')
        condensed_dist = squareform(self.Z)
        linkresult = linkage(condensed_dist)
        dendrogram(linkresult, labels = self.X, leaf_rotation=90)
        plt.xticks(fontsize= 20, rotation = 90)
        plt.yticks(fontsize= 20, rotation = 0)
        plt.ylabel("Distance", fontsize= 30, rotation = 90)
        plt.tight_layout()
        self.dendrogram_path = self.output_file.replace(".aln", "_dendrogram.png")
        plt.savefig(self.dendrogram_path)
        print(self.dendrogram_path)