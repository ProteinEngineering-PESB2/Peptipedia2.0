"""Msa module"""
import os
import subprocess
from random import random

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from scipy.cluster.hierarchy import dendrogram, linkage
from scipy.spatial.distance import squareform

from peptipedia.modules.utils import ConfigTool


class MultipleSequenceAlignment(ConfigTool):
    """MSA Class"""
    def __init__(self, data, is_file, config, config_module = "msa"):
        super().__init__(config_module, data, config, is_file)
        static_folder = config["folders"]["static_folder"]
        random_number = str(round(random() * 10**20))
        self.output_aln_file = os.path.realpath(f"{static_folder}/{random_number}.aln")
        self.output_dist_file = self.output_aln_file.replace("aln", "mat")
        self.heatmap_path = self.output_aln_file.replace(".aln", "_heatmap.png")
        self.dendrogram_path = self.output_aln_file.replace(".aln", "_dendrogram.png")

    def execute_clustalo(self):
        """Execute clustalo and return alignment, distance matrix and plots"""
        command = [
            "clustalo",
            "-i",
            self.temp_file_path,
            "-o",
            self.output_aln_file,
            f"--distmat-out={self.output_dist_file}",
            "--full",
            "--force",
        ]
        subprocess.check_output(command)

    def parse_output(self):
        """Transform output distance file to matrix and labels"""
        with open(self.output_aln_file, "r", encoding="utf-8") as file:
            output_text = file.read()

        distance_table = pd.read_csv(
            self.output_dist_file, header=None, delimiter=r"\s+", skiprows=1
        )
        sequences = output_text.split(">")
        data = [seq.split("\n") for seq in sequences]
        data = data[1:]
        number_proteins = len(data)
        labels = [sequence[0].split(" ")[0] for sequence in data]
        protein = ["".join(sequence[1:]) for sequence in data]
        self.alignment = []
        for i in range(number_proteins):
            dictionary = {}
            dictionary["label"] = ">" + labels[i]
            dictionary["sequence"] = protein[i]
            dictionary["id"] = i + 1
            self.alignment.append(dictionary)

        self.x_labels = distance_table[0].to_list()
        distance_table.drop([0], axis=1, inplace=True)
        self.z_values = distance_table.values.tolist()

    def draw_heatmap(self):
        """Use matplotlib and seaborn for to draw a heatmap of distances"""
        plt.clf()
        plt.figure(figsize=(20, 20))
        if len(self.z_values) > 35:
            fontsize = 10
        elif len(self.z_values) > 30:
            fontsize = 15
        else:
            fontsize = 20
        sns.heatmap(
            self.z_values,
            linewidth=1,
            xticklabels=self.x_labels,
            yticklabels=self.x_labels,
            annot=True,
            cbar=False,
            annot_kws={"fontsize": fontsize},
            vmin=0,
            vmax=1,
        )
        plt.xticks(fontsize=20, rotation=90)
        plt.yticks(fontsize=20, rotation=0)
        plt.tight_layout()
        plt.savefig(self.heatmap_path)

    def draw_dendrogram(self):
        """Use matplotlib for to draw a dendrogram"""
        plt.clf()
        plt.figure(figsize=(20, 10))
        plt.ylabel("Distance")
        condensed_dist = squareform(self.z_values)
        linkresult = linkage(condensed_dist)
        dendrogram(linkresult, labels=self.x_labels, leaf_rotation=90)
        plt.xticks(fontsize=20, rotation=90)
        plt.yticks(fontsize=20, rotation=0)
        plt.ylabel("Distance", fontsize=30, rotation=90)
        plt.tight_layout()
        plt.savefig(self.dendrogram_path)

    def run_process(self):
        """Run MSA functions"""
        self.execute_clustalo()
        self.parse_output()
        self.draw_heatmap()
        self.draw_dendrogram()
        self.delete_file()
        return {
            "alignment": self.alignment,
            "output_file": self.output_aln_file,
            "distances_file": self.output_dist_file,
            "image_heatmap": self.heatmap_path,
            "dendrogram": self.dendrogram_path,
        }