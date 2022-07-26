"""Phisicochemical functions"""
from flask import request, Blueprint
from modules.frequency_analysis import frequency_analysis
from modules.phisicochemical_module import modlamp_descriptor
import configparser
from modules.utils import interface

##Reads config file and asign folder names. 
config = configparser.ConfigParser()
config.read("config.ini")

statistic_tools_blueprint = Blueprint('statistic_tools_blueprint', __name__)

@statistic_tools_blueprint.route('/frequency/', methods=['POST'])
def apply_frequency():
    data, is_json, is_file = interface.parse_information_no_options(request)
    frequency_object = frequency_analysis(data, is_file, is_json, config)
    check = frequency_object.check
    if(check["status"] == "error"):
        return check
    result = frequency_object.exec_process()
    return {"result": result}

@statistic_tools_blueprint.route('/phisicochemical/', methods=['POST'])
def apply_phisicochemical():
    data, options, is_json, is_file = interface.parse_information_with_options(request)
    modlamp = modlamp_descriptor(data, options, is_file, is_json, config)
    check = modlamp.check
    if(check["status"] == "error"):
        return check
    result = modlamp.execute_modlamp()
    return {"result": result}