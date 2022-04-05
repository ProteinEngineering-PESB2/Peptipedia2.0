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
    
    def select_peptides(self, min_length = None, max_length = None, 
                        min_molecular_weight = None, max_molecular_weight = None,
                        min_charge = None, max_charge = None, min_charge_density = None,
                        max_charge_density = None, min_isoelectric_point = None,
                        max_isoelectric_point = None, databases_list = None,
                        limit = 20):
        where = []
        if min_length != None:
            where.append("p.length >= {}".format(min_length))
        if max_length != None:
            where.append("p.length <= {}".format(max_length))
        if min_molecular_weight != None:
            where.append("p.molecular_weight >= {}".format(min_molecular_weight))
        if max_molecular_weight != None:
            where.append("p.molecular_weight <= {}".format(max_molecular_weight))
        if min_charge != None:
            where.append("p.charge >= {}".format(min_charge))
        if max_charge != None:
            where.append("p.charge <= {}".format(max_charge))
        if min_charge_density != None:
            where.append("p.charge_density >= {}".format(min_charge_density))
        if max_charge_density != None:
            where.append("p.charge_density <= {}".format(max_charge_density))
        if min_isoelectric_point != None:
            where.append("p.isoelectric_point >= {}".format(min_isoelectric_point))
        if max_isoelectric_point != None:
            where.append("p.isoelectric_point <= {}".format(max_isoelectric_point))
        if databases_list != None:
            join = "join peptide_has_db_has_index phdhi on phdhi.idpeptide = p.idpeptide join db d on d.iddb = phdhi.id_db"
            for d in databases_list:
                where.append("d.name = '{}'".format(d))


        if(len(where) > 0):
            where_phrase = "where " + " and ".join(where)
        else:
            where_phrase = ""

        if limit != None: 
            limit_phrase = "limit " + str(limit)

        select = "select p.idpeptide from peptide p {} {} {};".format(join, where_phrase, limit_phrase)
        print(select)
        data = pd.read_sql(select, self.conn)
        print(data)
        count = "select COUNT(p.idpeptide) from peptide p {} {};".format(join, where_phrase)
        n_items = int(pd.read_sql(count, self.conn)["COUNT(p.idpeptide)"].values)
        print(n_items)
        if(n_items == 0):
            data = None
        else:
            data = json.loads(data.to_json(orient="records"))
        return {"data": data, "count": n_items}

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
    