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
            phrase = "{} BETWEEN {} and {}".format(self.transform_terms[ff], min_value, max_value)
        elif ("=" in term):
            value = term.split("=")[1].strip().replace("{", "").replace("}", "")
            n_matches = len(value.split("AND"))
            ff = term.split("=")[0].strip()
            if ("AND" in value):
                value = ",".join([f for f in value.split("AND")])
            else:
                value = value
            print(ff, value)
            if "Pfam" in ff:
                phrase = """p.idpeptide in 
                (select idpeptide from
                (select php.idpeptide, COUNT(php.idpeptide) as n_matches
                from peptide_has_pfam php join pfam on pfam.id_pfam = php.id_pfam
                where pfam.name in ({})
                group by php.idpeptide) as t
                where t.n_matches >= {})""".format(value, str(n_matches))
            if "Taxonomy" in ff:
                phrase = """p.idpeptide in 
                (select idpeptide from 
                (select pht.idpeptide, COUNT(pht.idpeptide) as n_matches 
                from peptide_has_taxonomy pht join taxonomy t on t.idtaxonomy = pht.idtaxonomy
                where t.name in ({})
                group by pht.idpeptide) as q 
                where q.n_matches >= {})""".format(value, str(n_matches))
            if "Database" in ff:
                phrase = """p.idpeptide in 
                (select idpeptide from 
                (select phdhi.idpeptide, COUNT(phdhi.idpeptide) as n_matches 
                from peptide_has_db_has_index phdhi join db d on d.iddb = phdhi.id_db 
                where d.name in ({})
                group by phdhi.idpeptide) as q 
                where q.n_matches >= {})""".format(value, str(n_matches))
            if "Gene Ontology" in ff:
                phrase = """p.idpeptide in 
                (select phg.idpeptide
                from peptide_has_go phg join gene_ontology go on go.id_go = phg.id_go 
                where go.term like '%{}%'
                group by phg.idpeptide)""".format(value, str(n_matches))
            if "Sequence" in ff:
                phrase = """p.sequence like '%{}%'""".format(value)
            phrase = phrase.replace("\n", "")
            phrase = re.sub(" +"," ", phrase)
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
        for index, j in enumerate(broken):
            if j != "(" and j != ")" and j != "AND" and j != "OR" :
                broken[index] = self.parse_terms(j)
        parsed_query = " ".join(broken)
        return parsed_query, limit, offset