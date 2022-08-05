"""Statistic tools routes"""
import configparser

from flask import Blueprint, request

from peptipedia.modules.frequency_analysis import FrequencyAnalysis
from peptipedia.modules.phisicochemical_module import PhysicochemicalProperties
from peptipedia.modules.utils import Interface

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

statistic_tools_blueprint = Blueprint("statistic_tools_blueprint", __name__)

@statistic_tools_blueprint.route("/frequency/", methods=["POST"])
def apply_frequency():
    """Frequency module api"""
    data, is_file = Interface(request).parse_without_options()
    frequency_object = FrequencyAnalysis(data, is_file, config)
    check = frequency_object.check
    if check["status"] == "error":
        return check
    result = frequency_object.exec_process()
    if len(result) > 1:
        summary = frequency_object.get_average()
        return {"result": result, "summary": summary}
    return {"result": result}


@statistic_tools_blueprint.route("/phisicochemical/", methods=["POST"])
def apply_physicochemical():
    """Physicochemical characterization module api"""
    data, options, is_file = Interface(request).parse_with_options()
    modlamp = PhysicochemicalProperties(data, options, is_file, config)
    check = modlamp.check
    if check["status"] == "error":
        return check
    result = modlamp.execute_modlamp()
    return {"result": result}
