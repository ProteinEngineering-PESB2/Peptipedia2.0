"""Activity Prediction module"""
import json
from random import random
import multiprocessing as mp
from joblib import load
import pandas as pd
from peptipedia.modules.utils import ConfigTool
from peptipedia.modules.encoding_strategies import (
    run_fft_encoding
)
class ActivityPrediction(ConfigTool):
    """Activity Prediction Class"""
    def __init__(self, data, options, is_file, config, db):
        super().__init__("activity_prediction", data, config, is_file)
        self.options = options
        static_folder = config["folders"]["static_folder"]
        self.models_folder = config["folders"]["activity_prediction_models"]
        rand_number = str(round(random() * 10**20))
        self.dataset_encoded_path = f"{static_folder}/{rand_number}.csv"
        self.options = options
        self.dataset_encoded = pd.DataFrame()
        self.cores = mp.cpu_count()
        self.df_encoder = db.get_encoder()
        self.activities_list = db.get_table("activity")

    def __process_encoding_stage(self):
        """Encode sequences using selected method"""
        with open(self.temp_file_path, "r", encoding = "utf-8") as file:
            self.data = self.create_df(file.read())
        for id_group, group in zip(
            self.df_encoder.idencoding, self.df_encoder.name
            ):
            fft_encoding = run_fft_encoding.RunFftEncoding(
                self.data, group, self.df_encoder
            )
            fft_encoding.run_parallel_encoding()
            group_df = fft_encoding.appy_fft()
            group_df["group"] = id_group
            self.dataset_encoded = pd.concat(
                [self.dataset_encoded, group_df],
                axis = 0
            )
    def __load_model(self, idactivity, idgroup):
        """Load model using joblib"""
        model_path = f"{self.models_folder}/{idactivity}/{idgroup}.joblib"
        return load(model_path)

    def __evaluate_activity(self, idactivity):
        """Evaluate activity"""
        act_row = self.activities_list[self.activities_list["idactivity"] == idactivity]
        name = act_row.name.values[0]
        data = []
        for _, row in self.dataset_encoded.iterrows():
            group = row["group"]
            model = self.__load_model(idactivity, group)
            values = row.tolist()[:-2]
            data.append({"idpeptide": row["id"].split(" ")[0],
                "group": group,
                "idactivity": idactivity,
                "activity": name,
                "prediction": model.predict([values])[0]})
        evaluation = pd.DataFrame(data)
        grouped = evaluation.groupby(
            ["idpeptide", "idactivity", "activity"],
            as_index = False
            ).sum()
        grouped["probability"] = grouped["prediction"] / self.df_encoder.shape[0]
        grouped.drop(["group", "prediction"], axis = 1, inplace=True)
        return grouped

    def evaluate(self):
        """Evaluate all specified activities"""
        df_evaluation = pd.concat(
            [self.__evaluate_activity(
                idactivity
                ) for idactivity in self.options["activities"]]
            )
        response = {}
        for idpeptide in df_evaluation.idpeptide.unique():
            sub_df = df_evaluation[df_evaluation["idpeptide"] == idpeptide][
                ["idactivity", "activity", "probability"]
            ]
            response[idpeptide] = json.loads(sub_df.to_json(orient="records"))
        return response

    def run_process(self):
        """Run all activity prediction process"""
        self.__process_encoding_stage()
        return self.evaluate()
