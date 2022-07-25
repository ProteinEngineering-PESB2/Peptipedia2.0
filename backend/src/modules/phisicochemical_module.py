from modlamp.descriptors import GlobalDescriptor
from random import random
from Bio import SeqIO
import os
from modules.utils import config_tool

class modlamp_descriptor(config_tool):
    def __init__(self, data, options, is_file, is_json, config):
        self.length = options["length"]
        self.molecular_weight = options["molecular_weight"]
        self.isoelectric_point = options["isoelectric_point"]
        self.charge_density = options["charge_density"]
        self.charge = options["charge"]
        super().__init__("phisicochemical", data, config, is_file, is_json)

    def execute_modlamp(self):
        records = SeqIO.parse(self.temp_file_path, "fasta")
        response = []
        for record in records:
            sequence = str(record.seq)
            dict_response = {}
            dict_response["id"] = record.id
            if(self.length):
                dict_response["length"] = len(sequence)
            if(self.molecular_weight):
                dict_response["molecular_weight"] = self.get_mw(sequence)
            if(self.isoelectric_point):
                dict_response["isoelectric_point"] = self.get_isoelectric_point(sequence)
            if(self.charge_density):
                dict_response["charge_density"] = self.get_charge_density(sequence)
            if(self.charge):
                dict_response["charge"] = self.get_charge(sequence)
            response.append(dict_response)
        return response
        
    def get_mw(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.calculate_MW(amide=True)
            return desc.descriptor[0][0]
        except:
            return None

    def get_isoelectric_point(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.isoelectric_point(amide=True)
            return desc.descriptor[0][0]
        except:
            return None

    def get_charge_density(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.charge_density(ph=7, amide=True)
            return desc.descriptor[0][0]
        except:
            return None

    def get_charge(self, sequence):
        try:
            desc = GlobalDescriptor([sequence])
            desc.calculate_charge(ph=7, amide=True)
            return desc.descriptor[0][0]
        except Exception as e:
            print(e)
            return None

    def delete_file(self):
        try:
            os.remove(self.temp_file_path)
        except Exception as e:
            print(e)