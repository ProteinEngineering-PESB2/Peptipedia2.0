"""Search module"""
import re


class search:
    """Search class"""

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
        """Parse query terms"""
        if "<=" in term:
            broken_term = term.split("<=")
            min_value = broken_term[0].strip()
            max_value = broken_term[2].strip()
            ff = broken_term[1].strip()
            phrase = f"""select p.idpeptide, p.length,
            p.molecular_weight, p.charge_density, 
            p.isoelectric_point, p.charge from peptide p
            where {self.transform_terms[ff]} BETWEEN {min_value} and {max_value}"""
        elif "=" in term:
            value = term.split("=")[1].strip().replace("{", "").replace("}", "")
            ff = term.split("=")[0].strip()
            if "Pfam" in ff:
                phrase = f"""select p.idpeptide, p.length,
                p.molecular_weight, p.charge_density, 
                p.isoelectric_point, p.charge from peptide p
                join peptide_has_pfam php
                on php.idpeptide = p.idpeptide and php.id_pfam = {value}"""

            if "Taxonomy" in ff:
                phrase = f"""select p.idpeptide, p.length,
                p.molecular_weight, p.charge_density, 
                p.isoelectric_point, p.charge from peptide p
                join peptide_has_taxonomy pht
                on pht.idpeptide = p.idpeptide and pht.idtaxonomy = {value}"""

            if "Gene Ontology" in ff:
                phrase = f"""select p.idpeptide, p.length,
                p.molecular_weight, p.charge_density, 
                p.isoelectric_point, p.charge from peptide p
                join peptide_has_go phg
                on phg.idpeptide = p.idpeptide and phg.id_go = {value}"""

            if "Database" in ff:
                phrase = """select p.idpeptide, p.length,
                p.molecular_weight, p.charge_density, 
                p.isoelectric_point, p.charge from peptide p
                join peptide_has_db_has_index phdhi
                on phdhi.idpeptide = p.idpeptide and phdhi.id_db = {value}"""
            if "Activity" in ff:
                phrase = f"""select p.idpeptide, p.length,
                p.molecular_weight, p.charge_density,
                p.isoelectric_point, p.charge from peptide p
                join peptide_has_activity pha
                on pha.idpeptide = p.idpeptide and pha.idactivity = {value}"""

            if "Sequence" in ff:
                phrase = f"""select p.idpeptide, p.length,
                p.molecular_weight, p.charge_density, 
                p.isoelectric_point, p.charge from peptide p
                where p.sequence like '%{value}%'"""
        else:
            phrase = ""
        return phrase

    def parse_search(self):
        """Parse full query"""
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
            for term in re.split("({})".format(r"[\(\)]"), logic)
            if term != ""
        ]
        join_list = []
        for index, j in enumerate(broken):
            if j not in ("(", ")", "AND", "OR"):
                broken[index] = self.parse_terms(j)
        join_list = list(set(join_list))
        parsed_where = " ".join(broken)
        parsed_where = parsed_where.replace("AND", "INTERSECT").replace("OR", "UNION")
        return parsed_where, limit, offset

    def verify_query(self):
        """Verify valid queries"""
        logic = self.query["query"]
        broken = [
            term.strip()
            for term in re.split(r"([\(\) ])", logic)
            if term not in ("", " ")
        ]
        if len(broken) <= 3:
            return {"status": "error", "description": "Query invalid"}
        has_sequence = bool("Sequence" in broken)
        if broken[0] != "(" or broken[-1] != ")":
            return {"status": "error", "description": "Query invalid"}
        for i, value in enumerate(broken):
            if value in ("(", ")"):
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
            elif value in ("<=", "="):
                broken[i] = ""
            elif value in ("OR", "AND"):
                broken[i] = ""
            else:
                try:
                    float(value)
                    broken[i] = ""
                except:
                    pass
        broken = [val for val in broken if val != ""]
        if not has_sequence and len(broken) != 0:
            return {"status": "error", "description": "Query invalid"}
        if has_sequence and len(broken) != 1:
            return {"status": "error", "description": "Query invalid"}
        return {"status": "success"}
