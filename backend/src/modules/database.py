from sqlalchemy import create_engine, text
import pandas as pd
import json
import os

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
        data = pd.read_sql("select id_db, name from db", self.conn)
        data.rename(columns = {"id_db": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_all_activities(self):
        data = pd.read_sql("select idactivity, name from activity", self.conn)
        data.rename(columns = {"idactivity": "value", "name": "label"}, inplace=True)
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

    def save_job(self, df):
        df.to_sql("model", self.conn, index=False, if_exists="append")

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


    def get_go_from_peptide(self, idpeptide):
        data = pd.read_sql("select accession, term, description, source, probability from peptide_has_go phg join gene_ontology go on go.id_go = phg.id_go and idpeptide = {}".format(idpeptide), con=self.conn)
        return {"status": "success", "data": data.values.tolist(), "columns": data.columns.tolist()}

    def get_pfam_from_peptide(self, idpeptide):
        data = pd.read_sql("select accession, name, type from peptide_has_pfam php join pfam on php.id_pfam = pfam.id_pfam and idpeptide = {}".format(idpeptide), con=self.conn)
        return {"status": "success", "data": data.values.tolist(), "columns": data.columns.tolist()}

    def get_tax_from_peptide(self, idpeptide):
        data = pd.read_sql("select name, tax_type from peptide_has_taxonomy pht join taxonomy tax on pht.idtaxonomy = tax.idtaxonomy and idpeptide = {}".format(idpeptide), con=self.conn)
        return {"status": "success", "data": data.values.tolist(), "columns": data.columns.tolist()}

    def get_info_from_peptide(self, idpeptide):
        data = pd.read_sql("select sequence, length, molecular_weight, charge_density, isoelectric_point, charge from peptide where idpeptide = {}".format(idpeptide), con=self.conn)
        return json.loads(data.to_json(orient="records")) 

    def get_act_from_peptide(self, idpeptide):
        data = pd.read_sql("select act.name, pha.is_predicted from peptide_has_activity pha join activity act on pha.idactivity = act.idactivity and pha.idpeptide = {}".format(idpeptide), con=self.conn)
        return {"status": "success", "data": data.values.tolist(), "columns": data.columns.tolist()}

    def get_patent_from_peptide(self, idpeptide):
        data = pd.read_sql("select patent from patent where patent.idpeptide = {}".format(idpeptide), con=self.conn)
        return {"status": "success", "data": data.values.tolist(), "columns": data.columns.tolist()}

    def get_db_from_peptide(self, idpeptide):
        data = pd.read_sql("""select db.name as db, i.name as id from peptide_has_db_has_index phdhi 
        join db on db.id_db = phdhi.id_db
        join "index" i on i.id_index = phdhi.id_index
        and phdhi.idpeptide = {}""".format(idpeptide), con=self.conn)
        return {"status": "success", "data": data.values.tolist(), "columns": data.columns.tolist()}

    def get_uniprot(self, idpeptide):
        data = pd.read_sql("""select structure as uniprot from peptide where idpeptide = {};""".format(idpeptide), con=self.conn)
        try:
            return str(data.values[0][0])
        except:
            return None