import re
class search():
    def __init__(self, query):
        self.query = query

        self.transform_terms = {
            "Length": "p.length",
            "Charge Density": "p.charge_density",
            "Molecular Weight": "p.molecular_weight",
            "Charge": "p.charge",
            "Isoelectric Point": "p.isoelectric_point"
        }

    def parse_mapping(self, request):
        substr = request.json["substr"]
        db = database()
        result = db.map_sequence(substr)
        return result

    def parse_terms(self, term):
        if "<=" in term:
            broken_term = term.split("<=")
            min_value = broken_term[0].strip()
            max_value = broken_term[2].strip()
            ff = broken_term[1].strip()
            phrase = """select p.idpeptide, p.sequence, 
                        p.length, p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        where {} BETWEEN {} and {}""".format(self.transform_terms[ff], min_value, max_value)
        elif ("=" in term):
            value = term.split("=")[1].strip().replace("{", "").replace("}", "")
            ff = term.split("=")[0].strip()
            if "Pfam" in ff:
                phrase = """select p.idpeptide, p.sequence, 
                        p.length, p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        join peptide_has_pfam php
                        on php.idpeptide = p.idpeptide and php.id_pfam = {}""".format(value)

            if "Taxonomy" in ff:
                phrase = """select p.idpeptide, p.sequence, 
                        p.length, p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        join peptide_has_taxonomy pht
                        on pht.idpeptide = p.idpeptide and pht.idtaxonomy = {}""".format(value)

            if "Gene Ontology" in ff:
                phrase = """select p.idpeptide, p.sequence, 
                        p.length, p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        join peptide_has_go phg
                        on phg.idpeptide = p.idpeptide and phg.id_go = {}""".format(value)

            if "Database" in ff:
                phrase = """select p.idpeptide, p.sequence, 
                        p.length, p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        join peptide_has_db_has_index phdhi
                        on phdhi.idpeptide = p.idpeptide and phdhi.id_db = {}""".format(value)

            if "Sequence" in ff:
                phrase = """select p.idpeptide, p.sequence, 
                        p.length, p.molecular_weight, p.charge_density, 
                        p.isoelectric_point, p.charge from peptide p
                        where p.sequence like '%{}%'""".format(value)
        else:
            phrase = ""
        return phrase

    def parse_search(self):
        logic = self.query["query"]
        try:
            limit = self.query["limit"]
        except:
            limit = None
        try:
            page = self.query["page"]
        except:
            page = None
        try:
            offset = limit * (page - 1 )
        except:
            offset = None
        
        if logic == "":
            return " True ", limit, offset
        broken = [term.strip() for term in re.split('({})'.format("[\(\)]"), logic) if term != ""]
        join_list = []
        for index, j in enumerate(broken):
            if j != "(" and j != ")" and j != "AND" and j != "OR" :
                broken[index] = self.parse_terms(j)
        join_list = list(set(join_list))
        parsed_where = " ".join(broken)
        parsed_where = parsed_where.replace("AND", "INTERSECT").replace("OR", "UNION")
        return parsed_where, limit, offset