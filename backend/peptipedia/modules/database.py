"""Database functionalities module"""
import json
from collections import defaultdict
import numpy as np
import pandas as pd
from sqlalchemy import create_engine, text


class Database:
    """Database class"""

    def __init__(self, config):
        # Config connection
        user = config["database"]["user"]
        password = config["database"]["password"]
        db_name = config["database"]["db"]
        host = config["database"]["host"]
        port = config["database"]["port"]
        engine = create_engine(
            f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{db_name}"
        )
        self.conn = engine.connect()
        # Config max items for selects
        self.max_items = int(config["select"]["limit"])

    def count_peptides(self, query):
        """Count peptides with a specified query"""
        count_query = f"select COUNT(*) from {query} as query"
        try:
            count = pd.read_sql(text(count_query), self.conn)
        except:
            return {"status": "error", "description": "Query invalid"}
        count = int(count.iloc[0].values[0])
        return {"status": "success", "count": count}

    def select_peptides(self, query, limit, offset):
        """Select peptides by specified query"""
        limited_query = f"{query} order by idpeptide limit {limit} offset {offset}"
        try:
            data = pd.read_sql(text(limited_query), self.conn)
        except:
            return {"status": "error", "description": "Query invalid"}
        data = data.round(4)
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": [" ".join(a.capitalize().split("_")) for a in data.columns.tolist()],
        }

    def get_all_databases(self):
        """Get all databases in db table"""
        data = pd.read_sql("""select id_db, name from db""", self.conn)
        data.rename(columns={"id_db": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_all_activities(self):
        """Get all activities in activity table"""
        data = pd.read_sql("""select idactivity, name from activity""", self.conn)
        data.rename(columns={"idactivity": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_all_gene_ontology(self, sub_string):
        """Get all gene ontology predictions in gene_ontology table"""
        if sub_string is None:
            query = f"""select id_go, term, source
                    from gene_ontology
                    limit {self.max_items}"""
        else:
            query = f"""select id_go, term, source
                    from gene_ontology 
                    where UPPER(term) like UPPER('%{sub_string}%') 
                    limit {self.max_items}"""
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"id_go": "id", "term": "name"}, inplace=True)
        data.name = data.name + " (" + data.source + ")"
        data.drop(["source"], inplace=True, axis=1)
        data.rename(columns={"id": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_all_pfam(self, sub_string):
        """Get all pfam predictions in pfam table"""
        if sub_string is None:
            query = f"""select id_pfam, name, type
                    from pfam limit {self.max_items}"""
        else:
            query = f"""select id_pfam, name, type from pfam
                    where UPPER(name) like UPPER('%{sub_string}%')
                    limit {self.max_items}"""
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"id_pfam": "id"}, inplace=True)
        data.name = data.name + " (" + data.type + ")"
        data.drop(["type"], inplace=True, axis=1)
        data.rename(columns={"id": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_all_taxonomy(self, sub_string):
        """Get all taxonomy terms from taxonomy table."""
        if sub_string is None:
            query = f"""select idtaxonomy, name, tax_type
                    from taxonomy limit {self.max_items}"""
        else:
            query = f"""select idtaxonomy, name, tax_type
                    from taxonomy 
                    where UPPER(name) like UPPER('%{sub_string}%') 
                    limit {self.max_items}"""
        data = pd.read_sql(text(query), self.conn)
        data.rename(columns={"idtaxonomy": "id"}, inplace=True)
        data.name = data.name + " (" + data.tax_type + ")"
        data.drop(["tax_type"], inplace=True, axis=1)
        data.rename(columns={"id": "value", "name": "label"}, inplace=True)
        return json.loads(data.to_json(orient="records"))

    def get_min_max_parameters(self):
        """Get min max parameters for numeric selectors"""
        params = [("length", 0), ("charge", 1), ("isoelectric_point", 1),
            ("charge_density", 0.01), ("molecular_weight", 1),
            ("instability_index", 1), ("aromaticity", 0.1),
            ("aliphatic_index", 1), ("boman_index", 1),
            ("hydrophobic_ratio", 0.1)]
        stmt = "select "
        for param, upper_error in params:
            stmt += f"MAX({param}) as max_{param}, MIN({param}) as min_{param}, "
        stmt = stmt[:-2]
        stmt += " from peptide p"
        data = pd.read_sql(stmt, self.conn)
        data = json.loads(data.to_json(orient="records"))[0]
        for param, upper_error in params:
            if param == "charge_density":
                data[f"max_{param}"] = round(data[f"max_{param}"], 3) + upper_error
                data[f"min_{param}"] = round(data[f"min_{param}"], 3)
            else:
                data[f"max_{param}"] = int(data[f"max_{param}"]) + upper_error
                data[f"min_{param}"] = int(data[f"min_{param}"])
        return data

    def get_go_from_peptide(self, idpeptide):
        """Get GO terms from a specified peptide id"""
        data = pd.read_sql(
            f"""select accession, term, description, source, probability
            from peptide_has_go phg
            join gene_ontology go
            on go.id_go = phg.id_go
            and idpeptide = {idpeptide}""",
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": data.columns.tolist(),
        }

    def get_pfam_from_peptide(self, idpeptide):
        """Get pfam terms from a specified peptide id"""
        data = pd.read_sql(
            f"""select accession, name, type
            from peptide_has_pfam php
            join pfam on php.id_pfam = pfam.id_pfam
            and idpeptide = {idpeptide}""",
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": [" ".join(a.capitalize().split("_")) for a in data.columns.tolist()],
        }

    def get_tax_from_peptide(self, idpeptide):
        """Get taxonomy terms from a specified peptide id"""
        data = pd.read_sql(
            f"""select name, tax_type
            from peptide_has_taxonomy pht join taxonomy tax
            on pht.idtaxonomy = tax.idtaxonomy
            and idpeptide = {idpeptide}""",
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": [" ".join(a.capitalize().split("_")) for a in data.columns.tolist()],
        }

    def get_info_from_peptide(self, idpeptide):
        """Get all phisicochemical properties and sequence from a specified peptide id"""
        data = pd.read_sql(
            f"""select p.sequence, p.length,
            p.molecular_weight, p.charge_density,
            p.isoelectric_point, p.charge,
            p.instability_index, p.aromaticity,
            p.aliphatic_index, p.boman_index,
            p.hydrophobic_ratio
            from peptide p
            where p.idpeptide = {idpeptide}""",
            con=self.conn,
        )
        return json.loads(data.to_json(orient="records"))

    def get_sequence_from_peptide(self, idpeptide):
        """Gets the sequence of a peptide (str)"""
        data = pd.read_sql(
            f"""select sequence
            from peptide
            where idpeptide = {idpeptide}""",
            con=self.conn,
        )
        return json.loads(data.to_json(orient="records"))[0]["sequence"]

    def get_act_from_peptide(self, idpeptide):
        """Get all activities from a specified peptide id"""
        data = pd.read_sql(
            f"""select act.name, pha.is_predicted
            from peptide_has_activity pha
            join activity act on pha.idactivity = act.idactivity
            and pha.idpeptide = {idpeptide}""",
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": [" ".join(a.capitalize().split("_")) for a in data.columns.tolist()],
        }

    def get_patent_from_peptide(self, idpeptide):
        """Get all patents from a peptide"""
        data = pd.read_sql(
            f"""select patent
            from patent
            where patent.idpeptide = {idpeptide}""",
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": [" ".join(a.capitalize().split("_")) for a in data.columns.tolist()],
        }

    def get_db_from_peptide(self, idpeptide):
        """Get related databases from a specified peptide"""
        data = pd.read_sql(
            f"""select db.name as db, i.name as id
            from peptide_has_db_has_index phdhi
            join db on db.id_db = phdhi.id_db
            join "index" i on i.id_index = phdhi.id_index
            and phdhi.idpeptide = {idpeptide}""",
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": [" ".join(a.capitalize().split("_")) for a in data.columns.tolist()],
        }

    def get_uniprot(self, idpeptide):
        """Gets uniprot id from a specified peptide"""
        data = pd.read_sql(
            f"""select structure as uniprot
            from peptide
            where idpeptide = {idpeptide};""",
            con=self.conn,
        )
        try:
            return str(data.values[0][0])
        except:
            return None

    def get_db_statistics(self):
        """Count peptides by database"""
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
            "columns": [a.capitalize() for a in data.columns.tolist()],
        }

    def get_all_act_statistics(self):
        """Count peptides by activity"""
        data = pd.read_sql(
            """select act.idactivity, act.name as activity, COUNT(pha.idpeptide) as peptides
            from peptide_has_activity pha
            join activity act on act.idactivity = pha.idactivity
            group by act."name", act.idactivity
            order by peptides desc;""",
            con=self.conn,
        )
        return {
            "status": "success",
            "data": data.values.tolist(),
            "columns": [a.capitalize() for a in data.columns.tolist()],
        }

    def get_specific_act_statistics(self, idactivity):
        """Get properties distribution by activity"""
        data = pd.read_sql(
            f"""select p.sequence, p.length,
            p.molecular_weight, p.charge_density,
            p.isoelectric_point, p.charge,
            p.instability_index, p.aromaticity,
            p.aliphatic_index, p.boman_index,
            p.hydrophobic_ratio
            from peptide_has_activity pha
            join peptide p on p.idpeptide = pha.idpeptide
            and pha.idactivity = {idactivity}""",
            con=self.conn,
        )
        description = data.describe()
        params = [
            ("length", 3),
            ("charge", 3),
            ("molecular_weight", 3),
            ("charge_density", 5),
            ("isoelectric_point", 4),
            ("instability_index", 4),
            ("aromaticity", 4),
            ("aliphatic_index", 4),
            ("boman_index", 4),
            ("hydrophobic_ratio", 4)
        ]
        response = {"status": "success"}
        for param in params:
            response[param[0]] = {
                a: round(b, param[1])
                for a, b in zip(
                    description[param[0]].index.tolist(), description[param[0]].values.tolist()
                )
            }
        return response

    def __build_tree(self, sub_tree, val, resume):
        """Recursive function for build a tree"""
        return [
            {
                "atributes": {
                    "id": id_,
                    "count": int(resume[resume.activity == name]["peptides"].values[0]),
                },
                "name": name,
                "children": self.__build_tree(sub_tree, id_, resume),
            }
            for id_, name in sub_tree[val]
        ]

    def get_tree(self):
        """Build a json tree from DataFrame"""
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
        for row in data.iterrows():
            row = row[1]
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
        """Get total peptides, labeled and unlabeled"""
        all_peptides = pd.read_sql(
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
        not_predicted = all_peptides - predicted - labeled
        return {
            "labels": [
                "Peptides with known activity",
                "Peptides with activity predicted",
                "Peptides without activity information",
            ],
            "values": [int(labeled), int(predicted), int(not_predicted)],
        }

    def get_general_counts(self):
        """Count databases, activities, sequences and return last update"""
        dbs = pd.read_sql("""select COUNT(*) from db""", con=self.conn).values[0][0]
        acts = pd.read_sql("""select COUNT(*) from activity""", con=self.conn).values[0][0]
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
            "last_update": str(last_update).split("T", maxsplit=1)[0],
        }

    def get_peptides_by_database(self):
        """Counts all peptides by database"""
        data = pd.read_sql(
            """select db.name, COUNT(p.idpeptide) as count_peptide from peptide p
            join peptide_has_db_has_index phdhi
            on p.idpeptide = phdhi.idpeptide
            join db
            on db.id_db = phdhi.id_db
            group by db.name
            order by count_peptide desc
            limit 15""",
            con=self.conn,
        )
        return {"X": data["name"].to_list(), "Y": data["count_peptide"].to_list()}

    def get_peptides_by_activity(self):
        """Counts all peptides by activity"""
        data = pd.read_sql(
            """select act.name, COUNT(p.idpeptide) as count_peptide from peptide p
            join peptide_has_activity pha
            on p.idpeptide = pha.idpeptide
            join activity act
            on act.idactivity = pha.idactivity
            group by act.name
            order by count_peptide desc
            limit 15""",
            con=self.conn,
        )
        return {"X": data["name"].to_list(), "Y": data["count_peptide"].to_list()}

    def get_parents_levels(self):
        """Gets parents and levels"""
        max_level = pd.read_sql("""select MAX(level) from activity;""",
            con = self.conn).values[0][0]
        data = pd.read_sql("""select idactivity as value, name
            from activity where idactivity in
            ((select idactivity from activity)
            INTERSECT
            (select parent as idactivity from activity));""",
            con = self.conn)
        levels = pd.read_sql(f"""select DISTINCT(level) as value 
            from activity where level != {max_level} order by level;""",
            con = self.conn)
        levels["name"] = levels["value"]
        return {
            "parents": json.loads(data.to_json(orient="records")),
            "levels": json.loads(levels.to_json(orient="records"))
        }

    def get_chord_diagram(self, by, query):
        """Builds a matrix for a chord diagram, from parent or level"""
        childs = pd.read_sql(f"select * from activity where {by} = {query}", con = self.conn)
        data = []
        for row in childs.itertuples():
            peptides = pd.read_sql(f"""select idpeptide from peptide_has_activity
                where idactivity = {row.idactivity}""", con = self.conn)
            data.append((row.idactivity, row.name, peptides))
        response = []
        for index, row in enumerate(data):
            for index2, row2 in enumerate(data):
                if index <= index2:
                    merged = pd.merge(row[2], row2[2], how = "inner", on = "idpeptide")
                    count = merged.shape[0]
                    if count != 0:
                        response.append([row[1], row2[1], count])
        parsed = {}
        for row in response:
            parsed[row[0]] = {}
        for row in response:
            parsed[row[0]].update({row[1]: row[2]})

        return {"result": "success", "data": parsed}

    def get_encoder(self, name = None):
        """Gets encoder table"""
        if name is not None:
            data = pd.read_sql(
                f"select * from encoding where name = {name};",
                con = self.conn)
        else:
            data = pd.read_sql("select * from encoding;", con = self.conn)
        return data

    def get_activity_spectral(self, idactivity):
        """Gets activity spectral by idactivity"""
        T = 1.0 / float(150)
        xf = list(np.linspace(0.0, 1.0 / (2.0 * T), 150 // 2))
        data = pd.read_sql(f"""select a_s.average, a_s.ci_inf, a_s.ci_sup, e.name
            from activity_spectral a_s
            join encoding e on a_s.idencoding = e.idencoding
            where a_s.idactivity = {idactivity};""",
            con = self.conn)
        data["x_average"] = [xf for _ in range(0, 8)]
        ci = []
        x_ci = []
        for _, row in data.iterrows():
            ci.append(row.ci_inf + row.ci_sup[::-1])
            x_ci.append(row.x_average + row.x_average[::-1])

        data["ci"] = pd.Series(ci)
        data["x_ci"] = pd.Series(x_ci)
        data = data[["name", "average", "x_average", "ci", "x_ci"]]
        return json.loads(data.to_json(orient="records"))

    def get_spectral_by_encoding(self, idencoding):
        """Gets activity spectral by encoding"""
        T = 1.0 / float(150)
        xf = list(np.linspace(0.0, 1.0 / (2.0 * T), 150 // 2))
        data = pd.read_sql(f"""select a_s.average, a_s.ci_inf, a_s.ci_sup, act.name
            from activity_spectral a_s
            join activity act on a_s.idactivity = act.idactivity
            where a_s.idencoding = {idencoding}
            and act.level = 1;""",
            con = self.conn)
        data["x_average"] = [xf for _ in range(0, 10)]
        ci = []
        x_ci = []
        for _, row in data.iterrows():
            ci.append(row.ci_inf + row.ci_sup[::-1])
            x_ci.append(row.x_average + row.x_average[::-1])

        data["ci"] = pd.Series(ci)
        data["x_ci"] = pd.Series(x_ci)
        data = data[["name", "average", "x_average", "ci", "x_ci"]]
        return json.loads(data.to_json(orient="records"))

    def get_activity_details(self, idactivity):
        """Gets activity details by id"""
        data = pd.read_sql(
            f"""select a.name as name,
            a.level as level,
            a.description as description,
            p.name as parent
            from activity a
            join activity p on a.parent = p.idactivity
            where a.idactivity = {idactivity}""",
            con = self.conn)
        if data.shape[0] == 0:
            data = pd.read_sql(
                f"""select a.name as name,
                a.level as level,
                a.description as description
                from activity a
                where a.idactivity = {idactivity}""",
                con = self.conn)
        return json.loads(data.to_json(orient="records"))[0]
    
    def get_sample_sequences(self, sample):
        """Gets sample sequences"""
        data = pd.read_sql(
            f"""select idpeptide, sequence from peptide
            where is_aa_seq = True
            order by random()
            limit {sample}""",
            con = self.conn)
        fasta_text = ""
        for id_seq, seq in zip(data.idpeptide, data.sequence):
            fasta_text += f">sequence_{id_seq}\n{seq}\n"
        return {"data": fasta_text}
    
    def get_activity_sequences(self, idactivity):
        """Gets sample sequences"""
        data = pd.read_sql(
            f"""select p.idpeptide, p.sequence
            from peptide p
            join peptide_has_activity pha
            on p.idpeptide = pha.idpeptide
            where pha.idactivity = {idactivity}""",
            con = self.conn)
        fasta_text = ""
        for id_seq, seq in zip(data.idpeptide, data.sequence):
            fasta_text += f">sequence_{id_seq}\n{seq}\n"
        return fasta_text