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