"""Home routes"""
from flask import Blueprint
import peptipedia.config as config
from peptipedia.modules.database import Database
from sqlalchemy.orm import Session
db = Database()
session = Session()
home_blueprint = Blueprint("home_blueprint", __name__)

@home_blueprint.route("/get_general_counts/", methods=["GET"])
def get_general_counts():
    """Get count of peptides, activities, databases and last update"""
    try:
        res = db.get_general_counts()
        return res
    except Exception as e:
        print(e)
        session.rollback()


@home_blueprint.route("/get_peptides_by_database/", methods=["GET"])
def get_peptides_by_database():
    """Gets count of peptides by database"""
    try:
        res = db.get_peptides_by_database()
        return res
    except Exception as e:
        print(e)
        session.rollback()


@home_blueprint.route("/get_peptides_by_activity/", methods=["GET"])
def get_peptides_by_activity():
    """Gets count of peptides by activity"""
    try:
        res = db.get_peptides_by_activity()
        return res
    except Exception as e:
        print(e)
        session.rollback()


@home_blueprint.route("/get_parents_levels/", methods=["GET"])
def get_parents_levels():
    """Gets activity parents and levels"""
    try:
        res = db.get_parents_levels()
    except Exception as e:
        print(e)
        session.rollback()
    return res


@home_blueprint.route("/get_chord_diagram/<by>/<query>", methods=["GET"])
def get_chord_diagram(by, query):
    """Gets a chord matrix from activity parent or level"""
    try:
        res = db.get_chord_diagram(by, query)
        return res
    except Exception as e:
        print(e)
        session.rollback()


@home_blueprint.route("/get_activity_spectral/<idactivity>", methods=["GET"])
def get_activity_spectral(idactivity):
    """Gets all spectral bands from specific activity"""
    try:
        res = db.get_activity_spectral(idactivity)
        return res
    except Exception as e:
        print(e)
        session.rollback()

@home_blueprint.route("/get_spectral_by_encoding/<idencoding>", methods=["GET"])
def get_spectral_by_encoding(idencoding):
    """Gets all spectral bands from specific activity level"""
    try:
        res = db.get_spectral_by_encoding(idencoding)
        return res
    except Exception as e:
        print(e)
        session.rollback()


@home_blueprint.route("/get_activity_details/<idactivity>", methods=["GET"])
def get_activity_details(idactivity):
    """Gets details from specific activity"""
    try:
        res = db.get_activity_details(idactivity)
        return res
    except Exception as e:
        print(e)
        session.rollback()


@home_blueprint.route("/get_activity_sequences/<idactivity>", methods=["GET"])
def get_activity_sequences(idactivity):
    """Gets details from specific activity"""
    try:
        text = db.get_activity_sequences(idactivity)
        activity_file = f"""{config.static_folder}/{idactivity}.fasta"""
        with open(activity_file, "w", encoding="utf-8") as file:
            file.write(text)
    except Exception as e:
        print(e)
        session.rollback()
    return {"file": activity_file}
