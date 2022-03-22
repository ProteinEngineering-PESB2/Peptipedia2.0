from random import random
import os
import subprocess
import time
class pfam:
    def __init__(self, data, temp_folder, is_file, is_json):
        print("Entro")
        self.temp_folder = temp_folder
        if(is_json):
            print("creando archivo a partir de texto")
            self.create_files(data)
        if(is_file):
            print("guardando archivo")
            self.temp_file = self.temp_folder + "/" + str(round(random()*10**20)) + ".fasta"
            self.save_file(data)
            f = open(self.temp_file, "r")
            print("creando archivos")
            self.create_files(f.read())
            f.close()

    def create_files(self, data):
        self.records = [">"+i for i in data.split(">")[1:]]
        self.list_files = []
        self.ids = []
        for record in self.records:
            path = self.temp_folder + "/" + str(round(random()*10**20)) + ".fasta"
            self.list_files.append(path)
            f = open(path, "w")
            f.write(record)
            f.close()
            self.ids.append(record.split("\n")[0])
            
    def save_file(self, data):
        data.save(self.temp_file)

    def get_pfam(self, fasta_path):
        response = {}
        command= "curl -k -LH 'Expect:' -F seq='<{}' -F output=xml 'https://pfam.xfam.org/search/sequence'".format(fasta_path)
        salida=subprocess.check_output(command, stderr=subprocess.STDOUT, shell=True)
        link_search=str(salida).split("result_url")
        print(link_search)
        array_pfam_responses = []
        if len(link_search) > 1:
            link_result=link_search[1].replace(">","").replace("<","")
            link_result=link_result[:-1]
            link_completo= "https://pfam.xfam.org"+link_result
            print("Entrando al link")
            result = ""
            while("xml" not in result):
                command2= "curl -k -s -LH 'Expect:' '"+link_completo+"'"
                result = os.popen(command2).read()
                print(result)
                time.sleep(0.5)
            pfam_file_name = "{}_pfam_result.xml".format(fasta_path.replace("fasta/", "temp/"))
            file_pfam= open(pfam_file_name, "w")
            file_pfam.write(result)
            file_pfam.close()
            file_pfam_in= open(pfam_file_name, "r")
            all_lines=file_pfam_in.read().split("\n")
            
            if '    <matches>' in all_lines:
                for n in range(len(all_lines)):
                    if "match accession" in all_lines[n]:
                        dic_response_pfma = {"Accession": "", "Id_accession":"", "Type": "", "Class":"", "Evalue":"", "Bitscore":""}
                        #row_out=[dataset_in["Id_sequence"][i]]
                        linea1= all_lines[n].replace("          ","").replace(">","").replace("<","").split(" ")
                        linea2= all_lines[n+1].replace("            ","").replace(">","").replace("<","").split(" ")
                        dic_response_pfma["Accession"]=(linea1[1].replace('"',"").split("=")[1])
                        dic_response_pfma["Id_accession"]=(linea1[2].replace('"',"").split("=")[1])
                        dic_response_pfma["Type"]=(linea1[3].replace('"',"").split("=")[1])
                        dic_response_pfma["Class"]=(linea1[4].replace('"',"").split("=")[1])
                        dic_response_pfma["Evalue"]=(linea2[7].replace('"',"").split("=")[1])
                        dic_response_pfma["Bitscore"]=(linea2[8].replace('"',"").split("=")[1])
                        array_pfam_responses.append(dic_response_pfma)
                response.update({"pfam_predicts":array_pfam_responses})
            else:
                response.update({"pfam_predicts":array_pfam_responses})            
        else:
            response.update({"pfam_predicts":array_pfam_responses})
        try:
            os.system("rm " + pfam_file_name)
            os.system("rm " + fasta_path)
        except:
            pass
        print(response)
        return response

    def process(self):
        response = []
        for index, path in enumerate(self.list_files):
            print(self.ids[index])
            response.append({"id": self.ids[index], "data": self.get_pfam(path)["pfam_predicts"]})
        return response