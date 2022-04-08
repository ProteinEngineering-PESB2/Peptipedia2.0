from modules.database import database
import re
class interface:
    def parse_information_no_options(self, request):
        try:
            post_data = request.json
        except:
            post_data = None
        try:
            post_file = request.files
        except:
            post_file = None
        is_json = False
        is_file = False
        if(post_data != None):
            data = post_data["data"]
            is_json = True
        elif(post_file != None):
            data = post_file["file"]
            is_file = True
        return data, is_json, is_file
    
    def parse_information_with_options(self, request):
        try:
            post_data = request.json
        except:
            post_data = None
        try:
            post_file = request.files
        except:
            post_file = None

        if(post_data != None):
            is_json = True
            is_file = False
            data = post_data["data"]
            options = post_data["options"]
        elif(post_file != None):
            is_json = False
            is_file = True
            file = request.files
            data = file["file"]
            options = eval(file["options"].read().decode("utf-8"))
        return data, options, is_json, is_file

    def parse_search_query(self, query):
        where = []
        try:
            where.append("p.length >= {}".format(query["min_length"]))
        except Exception as e:
            pass
        try:
            where.append("p.length <= {}".format(query["max_length"]))
        except Exception as e:
            pass
        try:
            where.append("p.molecular_weight >= {}".format(query["min_molecular_weight"]))
        except Exception as e:
            pass
        try:
            where.append("p.molecular_weight <= {}".format(query["max_molecular_weight"]))
        except Exception as e:
            pass
        try:
            where.append("p.charge >= {}".format(query["min_charge"]))
        except Exception as e:
            pass
        try:
            max_charge = where.append("p.charge <= {}".format(query["max_charge"]))
        except Exception as e:
            pass
        try:
            min_charge_density = where.append("p.charge_density >= {}".format(query["min_charge_density"]))
        except Exception as e:
            pass
        try:
            where.append("p.charge_density <= {}".format(query["max_charge_density"]))
        except Exception as e:
            pass
        try:
            min_isoelectric_point = where.append("p.isoelectric_point >= {}".format(query["min_isoelectric_point"]))
        except Exception as e:
            pass
        try:
            where.append("p.isoelectric_point <= {}".format(query["max_isoelectric_point"]))
        except Exception as e:
            pass

        if(len(where) > 0):
            where_phrase = "where " + " and ".join(where)
        else:
            where_phrase = ""
        select = "select p.idpeptide from peptide p {}".format(where_phrase)
        return select

    def parse_mapping(self, request):
        substr = request.json["substr"]
        db = database()
        result = db.map_sequence(substr)
        return result

    def filter_parenthesis(self, result):
        result2 = []
        while(result2 != result):
            result2 = result.copy()
            for index, res in enumerate(result):
                try:
                    if (result[index] == "(" and result[index + 2] == ")"):
                        result[index] = "-"
                        result[index+2] = "-"
                except:
                    pass
            result = [i for i in result if i != "-"]
        return result

    def parse_terms(self, term):
        response = {}
        if "<=" in term:
            name_term = term.split("<=")[1].strip().lower().replace(" ", "_")
            min_value = term.split("<=")[0].strip()
            max_value = term.split("<=")[2].strip()
            response = {"min_" + name_term: min_value, "max_" + name_term: max_value}
        elif ("=" in term):
            name_term = term.split("=")[0].strip().lower().replace(" ", "_")
            value = term.split("=")[1].strip()
            response = {name_term: value}
        return response

    def merge_terms(self, query):
        index = 0
        while index < len(query):
            if type(query[index]) == dict and query[index + 1] == "AND" and type(query[index + 2]) == dict :
                query[index].update(query[index + 2])
                del query[index + 1]
                del query[index + 1]
                index = 0
            index +=1

    def parse_search_logic(self, query):
        logic = query["query"]
        print(logic)

        result = [term.strip() for term in re.split('({})'.format("[\(\)]"), logic) if term != ""]
        for index, j in enumerate(result):
            if j != "(" and j != ")" and j != "AND" and j != "OR" :
                result[index] = self.parse_terms(j)
        print("result:", result)
        parsed_query = self.filter_parenthesis(result)
        selects = []
        print(parsed_query)
        self.merge_terms(parsed_query)
        for index, j in enumerate(parsed_query):
            if type(j) == dict:
                parsed_query[index] = self.parse_search_query(j)
        parsed_query = self.filter_parenthesis(parsed_query)
        print(parsed_query)
        return parsed_query