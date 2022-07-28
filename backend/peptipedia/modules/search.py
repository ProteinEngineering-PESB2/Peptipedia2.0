import re


class search:
    def __init__(self, query):
        self.query = query

        self.transform_terms = {
            "Length": "p.length",
            "Charge Density": "p.charge_density",
            "Molecular Weight": "p.molecular_weight",
            "Charge": "p.charge",
            "Isoelectric Point": "p.isoelectric_point",
        }

    def parse_terms(self, term):
        if "<=" in term:
            broken_term = term.split("<=")
            min_value = broken_term[0].strip()
            max_value = broken_term[2].strip()
            ff = broken_term[1].strip()
            phrase = """select p.idpeptide, p.length,
                        p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        where {} BETWEEN {} and {}""".format(
                self.transform_terms[ff], min_value, max_value
            )
        elif "=" in term:
            value = term.split("=")[1].strip().replace("{", "").replace("}", "")
            ff = term.split("=")[0].strip()
            if "Pfam" in ff:
                phrase = """select p.idpeptide, p.length,
                        p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        join peptide_has_pfam php
                        on php.idpeptide = p.idpeptide and php.id_pfam = {}""".format(
                    value
                )

            if "Taxonomy" in ff:
                phrase = """select p.idpeptide, p.length,
                        p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        join peptide_has_taxonomy pht
                        on pht.idpeptide = p.idpeptide and pht.idtaxonomy = {}""".format(
                    value
                )

            if "Gene Ontology" in ff:
                phrase = """select p.idpeptide, p.length,
                        p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        join peptide_has_go phg
                        on phg.idpeptide = p.idpeptide and phg.id_go = {}""".format(
                    value
                )

            if "Database" in ff:
                phrase = """select p.idpeptide, p.length,
                        p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        join peptide_has_db_has_index phdhi
                        on phdhi.idpeptide = p.idpeptide and phdhi.id_db = {}""".format(
                    value
                )

            if "Activity" in ff:
                phrase = """select p.idpeptide, p.length,
                        p.molecular_weight, p.charge_density,
                        p.isoelectric_point, p.charge from peptide p
                        join peptide_has_activity pha
                        on pha.idpeptide = p.idpeptide and pha.idactivity = {}""".format(
                    value
                )

            if "Sequence" in ff:
                phrase = """select p.idpeptide, p.length,
                        p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        where p.sequence like '%{}%'""".format(
                    value
                )
        else:
            phrase = ""
        return phrase

    def parse_search(self):
        logic = "(" + self.query["query"] + ")"
        try:
            limit = self.query["limit"]
        except:
            limit = None
        try:
            page = self.query["page"]
        except:
            page = None
        try:
            offset = limit * (page - 1)
        except:
            offset = None

        if logic == "":
            return " True ", limit, offset
        broken = [
            term.strip()
            for term in re.split("({})".format("[\(\)]"), logic)
            if term != ""
        ]
        join_list = []
        for index, j in enumerate(broken):
            if j != "(" and j != ")" and j != "AND" and j != "OR":
                broken[index] = self.parse_terms(j)
        join_list = list(set(join_list))
        parsed_where = " ".join(broken)
        parsed_where = parsed_where.replace("AND", "INTERSECT").replace("OR", "UNION")
        return parsed_where, limit, offset

    def verify_query(self):
        logic = self.query["query"]
        broken = [
            term.strip()
            for term in re.split("([\(\) ])", logic)
            if term != "" and term != " "
        ]
        if len(broken) <= 3:
            return {"status": "error", "description": "Query invalid"}
        if "Sequence" in broken:
            has_sequence = True
        else:
            has_sequence = False
        if broken[0] != "(" or broken[-1] != ")":
            return {"status": "error", "description": "Query invalid"}
        for i, value in enumerate(broken):
            if value == "(" or value == ")":
                broken[i] = ""
            elif value in [
                "Molecular",
                "Weight",
                "Length",
                "Charge",
                "Density",
                "Isoelectric",
                "Point",
            ]:
                broken[i] = ""
            elif value in [
                "Gene",
                "Ontology",
                "Taxonomy",
                "Pfam",
                "Database",
                "Sequence",
                "Activity",
            ]:
                broken[i] = ""
            elif value == "<=" or value == "=":
                broken[i] = ""
            elif value == "OR" or value == "AND":
                broken[i] = ""
            else:
                try:
                    float(value)
                    broken[i] = ""
                except:
                    pass
        broken = [val for val in broken if val != ""]
        if has_sequence == False and len(broken) != 0:
            return {"status": "error", "description": "Query invalid"}
        if has_sequence == True and len(broken) != 1:
            return {"status": "error", "description": "Query invalid"}
        return {"status": "success"}
