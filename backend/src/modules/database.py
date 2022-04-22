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
        self.max_items = 200

    def count_peptides(self, query):
        count_query = "select COUNT(*) from {} as query".format(query)
        try:
            count = pd.read_sql(text(count_query), self.conn)
        except:
            return {"status": "error", "description": "Query invalid"}
        count = int(count.iloc[0].values[0])
        return {"status": "success", "count": count}

    def select_peptides(self, query, limit, offset):
        limited_query = query + " order by idpeptide limit {} offset {} ".format(limit, offset)
        try:
            data = pd.read_sql(text(limited_query), self.conn)
        except:
            return {"status": "error", "description": "Query invalid"}
        data = data.round(4)
        return {"status": "success", "data": data.values.tolist(), "columns": data.columns.tolist()}

    def get_all_databases(self):
        data = pd.read_sql("select iddb, name from db", self.conn)
        data.rename(columns = {"iddb": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))
        
    def get_all_gene_ontology(self, sub_string, limit):
        if sub_string == None:
            query = "select id_go, term, source from gene_ontology limit {}".format(self.max_items)
        else:
            query = "select id_go, term, source from gene_ontology where UPPER(term) like UPPER('%{}%') limit {}".format(sub_string, self.max_items)
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"id_go": "id", "term": "name"}, inplace=True)
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

    def get_min_max_parameters(self):
        data = pd.read_sql("""select MAX(p.length) as max_length,
                                MIN(p.length) as min_length,
                                MAX(p.charge) as max_charge,
                                MIN(p.charge) as min_charge,
                                MAX(p.isoelectric_point) as max_isoelectric_point,
                                MIN(p.isoelectric_point) as min_isoelectric_point,
                                MAX(p.charge_density) as max_charge_density,
                                MIN(p.charge_density) as min_charge_density,
                                MAX(molecular_weight) as max_molecular_weight,
                                MIN(molecular_weight) as min_molecular_weigth
                                from peptide p""", self.conn)
        data = json.loads(data.to_json(orient="records"))[0]
        data["max_charge"] = int(data["max_charge"]) + 1
        data["min_charge"] = int(data["min_charge"])
        data["max_charge_density"] = round(data["max_charge_density"], 3) + 0.001
        data["min_charge_density"] = round(data["min_charge_density"], 3)
        data["max_molecular_weight"] = int(data["max_molecular_weight"]) + 1
        data["min_molecular_weigth"] = int(data["min_molecular_weigth"])
        data["max_isoelectric_point"] = int(data["max_isoelectric_point"]) + 1
        data["min_isoelectric_point"] = int(data["min_isoelectric_point"])
        return data