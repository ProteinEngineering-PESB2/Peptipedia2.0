from sqlalchemy import create_engine
import pandas as pd
import pymysql
class database:
    def __init__(self):
        user = "root"
        password = "chapalapachala123"
        db = "peptipedia_db"
        host = "190.114.255.125"
        engine = create_engine("mysql+pymysql://{}:{}@{}/{}?charset=utf8mb4".format(user, password, host, db))
        self.conn = engine.connect()
    
    def select_peptides(self, min_length = None, max_length = None):
        where = []
        if min_length != None:
            where.append("length >= {}".format(min_length))
        if max_length != None:
            where.append("length <= {}".format(max_length))
        if(len(where) > 0):
            where_phrase = "where " + " and ".join(where)
        else:
            where_phrase = ""
        data = pd.read_sql("select * from peptide {} limit 100;".format(where_phrase), self.conn)
        return data.to_json(orient="records")