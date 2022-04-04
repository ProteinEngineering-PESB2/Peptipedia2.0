from modules.database import database
class interface:
    def parse_information_no_options(self, request):
        post_data = request.json
        post_file = request.files
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
        if(request.json != None):
            post_data = request.json
            is_json = True
            is_file = False
            data = post_data["data"]
            options = post_data["options"]
        else:
            is_json = False
            is_file = True
            file = request.files
            data = file["file"]
            options = eval(file["options"].read().decode("utf-8"))
        return data, options, is_json, is_file

    def parse_search_query(self, request):
        data = request.json
        query = data["query"]
        try:
            min_length = query["min_length"]
        except Exception as e:
            print(e)
            min_length = None
        try:
            max_length = query["max_length"]
        except Exception as e:
            print(e)
            max_length = None

        try:
            min_molecular_weight = query["min_molecular_weight"]
        except Exception as e:
            print(e)
            min_molecular_weight = None
        try:
            max_molecular_weight = query["max_molecular_weight"]
        except Exception as e:
            print(e)
            max_molecular_weight = None

        try:
            min_charge = query["min_charge"]
        except Exception as e:
            print(e)
            min_charge = None
        try:
            max_charge = query["max_charge"]
        except Exception as e:
            print(e)
            max_charge = None

        try:
            min_charge_density = query["min_charge_density"]
        except Exception as e:
            print(e)
            min_charge_density = None
        try:
            max_charge_density = query["max_charge_density"]
        except Exception as e:
            print(e)
            max_charge_density = None

        try:
            min_isoelectric_point = query["min_isoelectric_point"]
        except Exception as e:
            print(e)
            min_isoelectric_point = None
        try:
            max_isoelectric_point = query["max_isoelectric_point"]
        except Exception as e:
            print(e)
            max_isoelectric_point = None
        try:
            limit = query["limit"]
        except Exception as e:
            print(e)
            limit = None
        try:
            databases_list = query["databases_list"]
        except Exception as e:
            print(e)
            databases_list = None

        db = database()
        result = db.select_peptides(min_length = min_length, 
                                max_length = max_length, 
                                min_molecular_weight = min_molecular_weight, 
                                max_molecular_weight = max_molecular_weight,
                                min_charge = min_charge,
                                max_charge = max_charge,
                                min_charge_density = min_charge_density,
                                max_charge_density = max_charge_density,
                                min_isoelectric_point = min_isoelectric_point,
                                max_isoelectric_point = max_isoelectric_point,
                                databases_list = databases_list,
                                limit = limit)
        return result