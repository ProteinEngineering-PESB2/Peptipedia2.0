"""Structural Properties module"""
import os
from random import random

from Bio import SeqIO
from peptipedia.modules.utils import ConfigTool


class StructuralProperties(ConfigTool):
    """Structural Properties Class"""
    def __init__(self, data, options, is_file, config):
        self.static_folder = config["folders"]["static_folder"]
        super().__init__("structural", data, config, is_file)