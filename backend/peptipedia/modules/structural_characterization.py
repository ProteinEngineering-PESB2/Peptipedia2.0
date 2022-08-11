"""Structural Properties module"""
import subprocess
from random import random
from os.path import basename
from peptipedia.modules.utils import ConfigTool

class StructuralCharacterization(ConfigTool):
    """Structural Properties Class"""
    def __init__(self, data, options, is_file, config):
        super().__init__("structural", data, config, is_file)
        rand_number = str(round(random() * 10**20))
        self.output_path = f"{self.temp_folder}/{rand_number}"
        self.options = options
        self.predictions = ["ss3", "ss8", "acc", "diso", "tm2", "tm8"]

    def execute_predict_property(self):
        """Execute Predict Property software"""
        command = [
            "Predict_Property.sh",
            "-i",
            self.temp_file_path,
            "-o",
            self.output_path,
        ]
        subprocess.check_output(command)

    def parse_results(self):
        """Parse output files"""
        all_file = basename(self.temp_file_path).replace("fasta", "all")
        with open(f"{self.output_path}/{all_file}", "r", encoding = "utf-8") as file:
            lines = file.readlines()
        self.name = lines[0].split(" ")[0].replace(">", "")[:-1]
        self.alignment = [{"id": 1, "label": self.name, "sequence": lines[1].replace("\n", "")}]
        for index, prediction_name in enumerate(self.predictions):
            if self.options[prediction_name]:
                self.alignment.append({
                    "id": index + 2,
                    "label": prediction_name,
                    "sequence": lines[index + 2].replace("\n", "")
                })

    def run_process(self):
        """Run all process"""
        self.execute_predict_property()
        self.parse_results()
        return {
            "id": self.name,
            "alignment": self.alignment
        }
