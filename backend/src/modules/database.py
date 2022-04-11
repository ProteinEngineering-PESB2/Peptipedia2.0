from sqlalchemy import create_engine, text
import pandas as pd
import json
class database:
    def __init__(self):
        user = "user"
        password = "chapalapachala123"
        db = "peptipedia_db"
        host = "190.114.255.125"
        engine = create_engine("postgresql+psycopg2://{}:{}@{}/{}".format(user, password, host, db))
        self.conn = engine.connect()

    def count_peptides(self, where):
        count_query = "select COUNT(p.idpeptide) from peptide p where " + where
        count = pd.read_sql(count_query, self.conn)
        count = int(count.iloc[0].values[0])
        return count

    def select_peptides(self, where, limit, offset):
        query = "select p.idpeptide, p.length, p.molecular_weight, p.isoelectric_point, p.charge, p.charge_density from peptide p where" + where
        limited_query = query + " order by p.idpeptide limit {} offset {} ".format(limit, offset)
        print(limited_query)
        data = pd.read_sql(text(limited_query), self.conn)
        data = json.loads(data.to_json(orient="records"))
        return {"data": data}