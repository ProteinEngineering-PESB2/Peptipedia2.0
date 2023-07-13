"""Config utilities"""
import os
from peptipedia.modules.database import Database
import peptipedia.config as config

class Folders:
    def create_folders(self):
        # create folders
        os.makedirs("./files/", exist_ok=True)
        os.makedirs(config.static_folder, exist_ok=True)
        os.makedirs(config.blastdb_folder, exist_ok=True)
        os.makedirs(config.downloads_folder, exist_ok=True)
        
        db = Database()
        db.create_fasta_from_peptides()
        self.makeblastdb()

    def get_static_folder(self):
        return config.static_folder
    
    def makeblastdb(self):
        os.system(f"""makeblastdb -in {config.blastdb_folder}/peptipedia.fasta -dbtype prot""")
        print("creado")
