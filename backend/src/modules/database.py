from sqlalchemy import create_engine, text
import pandas as pd
import json
import os
from datetime import date

class database:

    def __init__(self, config):
        user = config["database"]["user"]
        password = config["database"]["password"]
        db = config["database"]["db"]
        host = config["database"]["host"]
        engine = create_engine("postgresql+psycopg2://{}:{}@{}/{}".format(user, password, host, db))
        self.conn = engine.connect()
        self.max_items = 20

    def count_peptides(self, query):
        count_query = "select COUNT(*) from {} as query".format(query)
        count = pd.read_sql(text(count_query), self.conn)
        count = int(count.iloc[0].values[0])
        return count

    def select_peptides(self, query, limit, offset):
        limited_query = query + " order by idpeptide limit {} offset {} ".format(limit, offset)
        data = pd.read_sql(text(limited_query), self.conn)
        data = json.loads(data.to_json(orient="records"))
        return {"data": data}

    def get_all_databases(self):
        data = pd.read_sql("select iddb, name from db", self.conn)
        data.rename(columns={"iddb": "id"}, inplace=True)
        return json.loads(data.to_json(orient="records"))
        
    def get_all_gene_ontology(self, sub_string, limit):
        if sub_string == None:
            query = "select id_go, term, source from gene_ontology limit {}".format(self.max_items)
        else:
            query = "select id_go, term, source from gene_ontology where UPPER(term) like UPPER('%{}%') limit {}".format(sub_string, self.max_items)
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"id_pfam": "id", "term": "name"}, inplace=True)
        data.name = data.name + " (" + data.source + ")"
        data.drop(["source"], inplace=True, axis = 1)
        data.rename(columns = {"id": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records")) 

    def get_all_pfam(self, sub_string, limit):
        if sub_string == None:
            query = "select id_pfam, name, type from pfam limit {}".format(self.max_items)
        else:
            query = "select id_pfam, name, type from pfam where UPPER(name) like UPPER('%{}%') limit {}".format(sub_string, self.max_items)
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"id_pfam": "id"}, inplace=True)
        data.name = data.name + " (" + data.type + ")"
        data.drop(["type"], inplace=True, axis = 1)
        data.rename(columns = {"id": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records")) 

    def get_all_taxonomy(self, sub_string, limit):
        if sub_string == None:
            query = "select idtaxonomy, name, tax_type from taxonomy limit {}".format(self.max_items)
        else:
            query = "select idtaxonomy, name, tax_type from taxonomy where UPPER(name) like UPPER('%{}%') limit {}".format(sub_string, self.max_items)
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"idtaxonomy": "id"}, inplace=True)
        data.name = data.name + " (" + data.tax_type + ")"
        data.drop(["tax_type"], inplace=True, axis = 1)
        data.rename(columns = {"id": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records")) 

    def save_job(self, row):
        row["options"]["date"] = date.today()
        df = pd.DataFrame([row["options"]])
        df.to_sql("model", self.conn, index=False, if_exists="append", method="multi", chunksize = 50)

    def get_all_models(self):
        data = pd.read_sql(text("select * from model"), self.conn)
        dates = [row.strftime('%m/%d/%Y') for row in data["date"]]
        json_data = json.loads(data.to_json(orient="records"))
        for index, date in enumerate(dates):
            json_data[index]["date"] = date
        return json_data