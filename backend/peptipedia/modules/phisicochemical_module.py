import os
from random import random

from Bio import SeqIO
from modlamp.descriptors import GlobalDescriptor
from modlamp.plot import helical_wheel, plot_profile

from peptipedia.modules.utils import ConfigTool


class modlamp_descriptor(ConfigTool):
    def __init__(self, data, options, is_file, is_json, config):
        self.length = options["length"]
        self.molecular_weight = options["molecular_weight"]
        self.isoelectric_point = options["isoelectric_point"]
        self.charge_density = options["charge_density"]
        self.charge = options["charge"]
        self.instability_index = options["instability_index"]
        self.aromaticity = options["aromaticity"]
        self.aliphatic_index = options["aliphatic_index"]
        self.boman_index = options["boman_index"]
        self.hydrophobic_ratio = options["hydrophobic_ratio"]
        super().__init__("phisicochemical", data, config, is_file, is_json)

    def execute_modlamp(self):
        records = SeqIO.parse(self.temp_file_path, "fasta")
        response = []
        for record in records:
            sequence = str(record.seq)
            dict_response = {}
            dict_response["id"] = record.id
            if self.length:
                dict_response["length"] = len(sequence)
            if self.molecular_weight:
                dict_response["molecular_weight"] = self.get_mw(sequence)
            if self.isoelectric_point:
                dict_response["isoelectric_point"] = self.get_isoelectric_point(
                    sequence
                )
            if self.charge_density:
                dict_response["charge_density"] = self.get_charge_density(sequence)
            if self.charge:
                dict_response["charge"] = self.get_charge(sequence)
            if self.instability_index:
                dict_response["instability_index"] = self.get_instability_index(
                    sequence
                )
            if self.aromaticity:
                dict_response["aromaticity"] = self.get_aromaticity(sequence)
            if self.aliphatic_index:
                dict_response["aliphatic_index"] = self.get_aliphatic_index(sequence)
            if self.boman_index:
                dict_response["boman_index"] = self.get_boman_index(sequence)
            if self.hydrophobic_ratio:
                dict_response["hydrophobic_ratio"] = self.get_hydrophobic_ratio(
                    sequence
                )

            profile_path = "{}/{}_profile.png".format(
                "/files", str(round(random() * 10**20))
            )
            helical_path = profile_path.replace("profile", "helical")
            plot_profile(sequence, scalename="eisenberg", filename=profile_path)
            helical_wheel(sequence, filename=helical_path)
            dict_response["profile_path"] = profile_path
            dict_response["helical_path"] = helical_path
            response.append(dict_response)
        return response

    def get_mw(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.calculate_MW(amide=True)
            return round(desc.descriptor[0][0], 4)
        except:
            return None

    def get_isoelectric_point(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.isoelectric_point(amide=True)
            return round(desc.descriptor[0][0], 4)
        except:
            return None

    def get_charge_density(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.charge_density(ph=7, amide=True)
            return round(desc.descriptor[0][0], 5)
        except:
            return None

    def get_charge(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.calculate_charge(ph=7, amide=True)
            return round(desc.descriptor[0][0], 4)
        except Exception as e:
            return None

    def get_instability_index(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.instability_index()
            return round(desc.descriptor[0][0], 4)
        except Exception as e:
            return None

    def get_aromaticity(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.aromaticity()
            return round(desc.descriptor[0][0], 4)
        except Exception as e:
            return None

    def get_aliphatic_index(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.aliphatic_index()
            return round(desc.descriptor[0][0], 4)
        except Exception as e:
            return None

    def get_boman_index(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.boman_index()
            return round(desc.descriptor[0][0], 4)
        except Exception as e:
            return None

    def get_hydrophobic_ratio(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.hydrophobic_ratio()
            return round(desc.descriptor[0][0], 4)
        except Exception as e:
            return None

    def delete_file(self):
        try:
            os.remove(self.temp_file_path)
        except Exception as e:
            print(e)
