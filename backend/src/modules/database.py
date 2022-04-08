from sqlalchemy import create_engine, text
import pandas as pd
import pymysql
import json
class database:
    def __init__(self):
        user = "root"
        password = "chapalapachala123"
        db = "peptipedia_db"
        host = "190.114.255.125"
        engine = create_engine("mysql+pymysql://{}:{}@{}/{}?charset=utf8mb4".format(user, password, host, db))
        self.conn = engine.connect()
    
    def select_peptides(self,select):
        print(select)
        data = pd.read_sql(select, self.conn)
        print(data)
        """
        count = "select COUNT(p.idpeptide) from peptide p {} {};".format(join, where_phrase)
        n_items = int(pd.read_sql(count, self.conn)["COUNT(p.idpeptide)"].values)
        print(n_items)
        if(n_items == 0):
            data = None
        else:
            data = json.loads(data.to_json(orient="records"))
            """
        return {"data": data, "count": 20}

    def map_sequence(self, substr):
        select = "select p.idpeptide from peptide p where p.sequence like '%{}%' limit 40;".format(substr)
        print(select)
        data = pd.read_sql(text(select), self.conn)

        count = "select COUNT(p.idpeptide) from peptide p where p.sequence like '%{}%';".format(substr)
        n_items = int(pd.read_sql(text(count), self.conn)["COUNT(p.idpeptide)"].values)
        print(n_items)
        if(n_items == 0):
            data = None
        else:
            data = json.loads(data.to_json(orient="records"))
        return {"data": data, "count": n_items}
    