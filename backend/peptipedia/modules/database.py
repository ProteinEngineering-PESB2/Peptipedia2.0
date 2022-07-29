import json
from collections import defaultdict

import pandas as pd
from sqlalchemy import create_engine, text


class database:
    def __init__(self, config):
        # Config connection
        user = config["database"]["user"]
        password = config["database"]["password"]
        db = config["database"]["db"]
        host = config["database"]["host"]
        engine = create_engine(
            "postgresql+psycopg2://{}:{}@{}/{}".format(user, password, host, db)
        )
        self.conn = engine.connect()
        # Config max items for selects
        self.max_items = int(config["select"]["limit"])

    def count_peptides(self, query):
        # Count peptides with a specified query
        count_query = "select COUNT(*) from {} as query".format(query)
        try:
            count = pd.read_sql(text(count_query), self.conn)
        except:
            return {"status": "error", "description": "Query invalid"}
        count = int(count.iloc[0].values[0])
        return {"status": "success", "count": count}

    def select_peptides(self, query, limit, offset):
        # Select peptides by specified query
        limited_query = "{} order by idpeptide limit {} offset {}".format(
            query, limit, offset
        )
        try:
            data = pd.read_sql(text(limited_query), self.conn)
        except:
            return {"status": "error", "description": "Query invalid"}
        data = data.round(4)
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_all_databases(self):
        # Get all databases in db table
        data = pd.read_sql("""select id_db, name from db""", self.conn)
        data.rename(columns={"id_db": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_all_activities(self):
        # Get all activities in activity table
        data = pd.read_sql("""select idactivity, name from activity""", self.conn)
        data.rename(columns={"idactivity": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_all_gene_ontology(self, sub_string, limit):
        # Get all gene ontology predictions in gene_ontology table
        if sub_string == None:
            query = """select id_go, term, source
                        from gene_ontology
                        limit {}""".format(
                self.max_items
            )
        else:
            query = """select id_go, term, source 
                        from gene_ontology 
                        where UPPER(term) like UPPER('%{}%') 
                        limit {}""".format(
                sub_string, self.max_items
            )
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"id_go": "id", "term": "name"}, inplace=True)
        data.name = data.name + " (" + data.source + ")"
        data.drop(["source"], inplace=True, axis=1)
        data.rename(columns={"id": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_all_pfam(self, sub_string, limit):
        # Get all pfam predictions in pfam table
        if sub_string == None:
            query = """select id_pfam, name, type
                        from pfam limit {}""".format(
                self.max_items
            )
        else:
            query = """select id_pfam, name, type from pfam
                        where UPPER(name) like UPPER('%{}%')
                        limit {}""".format(
                sub_string, self.max_items
            )
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"id_pfam": "id"}, inplace=True)
        data.name = data.name + " (" + data.type + ")"
        data.drop(["type"], inplace=True, axis=1)
        data.rename(columns={"id": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_all_taxonomy(self, sub_string, limit):
        # Get all taxonomy terms from taxonomy table.
        if sub_string == None:
            query = """select idtaxonomy, name, tax_type 
                        from taxonomy limit {}""".format(
                self.max_items
            )
        else:
            query = """select idtaxonomy, name, tax_type 
                        from taxonomy 
                        where UPPER(name) like UPPER('%{}%') 
                        limit {}""".format(
                sub_string, self.max_items
            )
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"idtaxonomy": "id"}, inplace=True)
        data.name = data.name + " (" + data.tax_type + ")"
        data.drop(["tax_type"], inplace=True, axis=1)
        data.rename(columns={"id": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_min_max_parameters(self):
        # Get min max parameters for numeric selectors
        data = pd.read_sql(
            """select MAX(p.length) as max_length,
                                MIN(p.length) as min_length,
                                MAX(p.charge) as max_charge,
                                MIN(p.charge) as min_charge,
                                MAX(p.isoelectric_point) as max_isoelectric_point,
                                MIN(p.isoelectric_point) as min_isoelectric_point,
                                MAX(p.charge_density) as max_charge_density,
                                MIN(p.charge_density) as min_charge_density,
                                MAX(molecular_weight) as max_molecular_weight,
                                MIN(molecular_weight) as min_molecular_weigth
                                from peptide p""",
            self.conn,
        )
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
        # Get GO terms from a specified peptide id
        data = pd.read_sql(
            """select accession, term, description, source, probability 
                                from peptide_has_go phg 
                                join gene_ontology go 
                                on go.id_go = phg.id_go 
                                and idpeptide = {}""".format(
                idpeptide
            ),
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_pfam_from_peptide(self, idpeptide):
        # Get pfam terms from a specified peptide id
        data = pd.read_sql(
            """select accession, name, type 
                                from peptide_has_pfam php 
                                join pfam on php.id_pfam = pfam.id_pfam 
                                and idpeptide = {}""".format(
                idpeptide
            ),
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_tax_from_peptide(self, idpeptide):
        # Get taxonomy terms from a specified peptide id
        data = pd.read_sql(
            """select name, tax_type 
                                from peptide_has_taxonomy pht join taxonomy tax 
                                on pht.idtaxonomy = tax.idtaxonomy 
                                and idpeptide = {}""".format(
                idpeptide
            ),
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_info_from_peptide(self, idpeptide):
        # Get all phisicochemical properties and sequence from a specified peptide id
        data = pd.read_sql(
            """select sequence, length, molecular_weight, 
                                charge_density, isoelectric_point, 
                                charge from peptide 
                                where idpeptide = {}""".format(
                idpeptide
            ),
            con=self.conn,
        )
        return json.loads(data.to_json(orient="records"))

    def get_sequence_from_peptide(self, idpeptide):
        # Gets the sequence of a peptide (str)
        data = pd.read_sql(
            """select sequence 
                                from peptide 
                                where idpeptide = {}""".format(
                idpeptide
            ),
            con=self.conn,
        )
        return json.loads(data.to_json(orient="records"))[0]["sequence"]

    def get_act_from_peptide(self, idpeptide):
        # Get all activities from a specified peptide id
        data = pd.read_sql(
            """select act.name, pha.is_predicted 
                                from peptide_has_activity pha 
                                join activity act on pha.idactivity = act.idactivity 
                                and pha.idpeptide = {}""".format(
                idpeptide
            ),
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_patent_from_peptide(self, idpeptide):
        # Get all patents from a peptide
        data = pd.read_sql(
            """select patent 
                                from patent 
                                where patent.idpeptide = {}""".format(
                idpeptide
            ),
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_db_from_peptide(self, idpeptide):
        # Get related databases from a specified peptide
        data = pd.read_sql(
            """select db.name as db, i.name as id 
                                from peptide_has_db_has_index phdhi 
                                join db on db.id_db = phdhi.id_db
                                join "index" i on i.id_index = phdhi.id_index
                                and phdhi.idpeptide = {}""".format(
                idpeptide
            ),
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_uniprot(self, idpeptide):
        # Gets uniprot id from a specified peptide
        data = pd.read_sql(
            """select structure as uniprot 
                                from peptide 
                                where idpeptide = {};""".format(
                idpeptide
            ),
            con=self.conn,
        )
        try:
            return str(data.values[0][0])
        except:
            return None

    def get_db_statistics(self):
        # Count peptides by database
        data = pd.read_sql(
            """select db.name as database, 
                                COUNT(phdhi.idpeptide) as peptides, db.app_url 
                                from peptide_has_db_has_index phdhi 
                                join db on db.id_db = phdhi.id_db
                                group by db.name, db.app_url
                                order by peptides desc""",
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_all_act_statistics(self):
        # Count peptides by activity
        data = pd.read_sql(
            """select act.idactivity , act.name as Activity, COUNT(pha.idpeptide) as Peptides 
                                from peptide_has_activity pha
                                join activity act on act.idactivity = pha.idactivity 
                                group by act."name", act.idactivity 
                                order by Peptides desc;""",
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_specific_act_statistics(self, idactivity):
        # Get properties distribution by activity
        data = pd.read_sql(
            """select p.length, p.charge, p.molecular_weight, 
                                p.charge_density, p.isoelectric_point from peptide_has_activity pha
                                join peptide p on p.idpeptide = pha.idpeptide 
                                and pha.idactivity = {}""".format(
                idactivity
            ),
            con=self.conn,
        )
        description = data.describe()
        length = {
            a: round(b, 3)
            for a, b in zip(
                description.index.tolist(), description.length.values.tolist()
            )
        }
        charge = {
            a: round(b, 3)
            for a, b in zip(
                description.charge.index.tolist(), description.charge.values.tolist()
            )
        }
        molecular_weight = {
            a: round(b, 3)
            for a, b in zip(
                description.molecular_weight.index.tolist(),
                description.molecular_weight.values.tolist(),
            )
        }
        charge_density = {
            a: round(b, 5)
            for a, b in zip(
                description.charge_density.index.tolist(),
                description.charge_density.values.tolist(),
            )
        }
        isoelectric_point = {
            a: round(b, 4)
            for a, b in zip(
                description.isoelectric_point.index.tolist(),
                description.isoelectric_point.values.tolist(),
            )
        }
        return {
            "status": "success",
            "length": length,
            "charge": charge,
            "molecular_weight": molecular_weight,
            "charge_density": charge_density,
            "isoelectric_point": isoelectric_point,
        }

    def __build_tree(self, d, val, resume):
        # Recursive function for build a tree
        return [
            {
                "atributes": {
                    "id": id_,
                    "count": int(resume[resume.activity == name]["peptides"].values[0]),
                },
                "name": name,
                "children": self.__build_tree(d, id_, resume),
            }
            for id_, name in d[val]
        ]

    def get_tree(self):
        # Build a json tree from DataFrame
        parents = defaultdict(list)
        data = pd.read_sql("activity", con=self.conn)
        data = data.sort_values(by="level")
        parents = defaultdict(list)

        resume = pd.read_sql(
            """select act.name as Activity, COUNT(pha.idpeptide) as Peptides 
                    from peptide_has_activity pha
                    join activity act on act.idactivity = pha.idactivity 
                    group by act."name";""",
            con=self.conn,
        )
        for i, row in data.iterrows():
            parents[row.parent].append((row.idactivity, row["name"]))
        tree = {
            "id": 0,
            "name": "All Peptides",
            "children": self.__build_tree(parents, 0, resume),
        }
        str_tree = str(tree)
        str_tree = str_tree.replace(""", 'children': []""", "").replace("'", '"')
        tree = json.loads(str_tree)
        return {"status": "success", "tree": tree}

    def get_general_act_statistic(self):
        # Get total peptides, labeled and unlabeled
        all = pd.read_sql(
            """select COUNT(idpeptide) from peptide p""", con=self.conn
        ).values[0][0]
        predicted = pd.read_sql(
            """select COUNT(distinct idpeptide)
                                    from peptide_has_activity pha
                                    where pha.is_predicted = true""",
            con=self.conn,
        ).values[0][0]
        labeled = pd.read_sql(
            """select COUNT(distinct idpeptide)
                                    from peptide_has_activity pha
                                    where pha.is_predicted = false""",
            con=self.conn,
        ).values[0][0]
        not_predicted = all - predicted - labeled
        return {
            "labels": [
                "Peptides with known activity",
                "Peptides with activity predicted",
                "Peptides without activity information",
            ],
            "values": [int(labeled), int(predicted), int(not_predicted)],
        }

    def get_general_counts(self):
        dbs = pd.read_sql("""select COUNT(*) from db""", con=self.conn).values[0][0]
        acts = pd.read_sql("""select COUNT(*) from activity""", con=self.conn).values[
            0
        ][0]
        sequences = pd.read_sql(
            """select COUNT(*) from peptide""", con=self.conn
        ).values[0][0]
        last_update = pd.read_sql(
            """select MAX(act_date) from peptide""", con=self.conn
        ).values[0][0]
        return {
            "databases": int(dbs),
            "activity": int(acts),
            "sequences": int(sequences),
            "last_update": str(last_update).split("T")[0],
        }

    def get_peptides_by_database(self):
        data = pd.read_sql(
            """select db.name, COUNT(p.idpeptide) as count_peptide from peptide p
                            join peptide_has_db_has_index phdhi
                            on p.idpeptide = phdhi.idpeptide
                            join db
                            on db.id_db = phdhi.id_db
                            group by db.name
                            order by count_peptide desc
                            limit 15
                            """,
            con=self.conn,
        )
        return {"X": data["name"].to_list(), "Y": data["count_peptide"].to_list()}

    def get_peptides_by_activity(self):
        data = pd.read_sql(
            """select act.name, COUNT(p.idpeptide) as count_peptide from peptide p
                            join peptide_has_activity pha
                            on p.idpeptide = pha.idpeptide
                            join activity act
                            on act.idactivity = pha.idactivity
                            group by act.name
                            order by count_peptide desc
                            limit 15
                            """,
            con=self.conn,
        )
        return {"X": data["name"].to_list(), "Y": data["count_peptide"].to_list()}
