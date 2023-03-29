import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Stack } from "@mui/material";
import { ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function useGetAllActivities() {
  const [tableActivitiies, setTableActivities] =
    useState<ITable>(InitialValueTable);
  const [dataBoxplot, setDataBoxplot] = useState<any[]>([]);
  const [nameActivity, setNameActivity] = useState<string>("");
  const [showSkeletonBoxplot, setShowSkeletonBoxplot] =
    useState<boolean>(false);
  const [loadingTableActivities, setLoadingTableActivities] =
    useState<boolean>(true);

  const getSpecificActivity = async (id: string | number, name: string) => {
    try {
      setShowSkeletonBoxplot(true);

      const res = await axios.get(`/api/get_specific_act_statistics/${id}`);

      const charge = res.data["charge"];
      const charge_density = res.data["charge_density"];
      const isoelectric_point = res.data["isoelectric_point"];
      const length = res.data["length"];
      const molecular_weight = res.data["molecular_weight"];
      const aliphatic_index = res.data["aliphatic_index"];
      const aromaticity = res.data["aromaticity"];
      const boman_index = res.data["boman_index"];
      const hydrophobic_ratio = res.data["hydrophobic_ratio"];
      const instability_index = res.data["instability_index"];

      const charge_trace = {
        type: "box",
        y: [
          charge["min"],
          charge["25%"],
          charge["mean"],
          charge["75%"],
          charge["max"],
        ],
        name: "Charge",
      };

      const charge_density_trace = {
        type: "box",
        y: [
          charge_density["min"],
          charge_density["25%"],
          charge_density["mean"],
          charge_density["75%"],
          charge_density["max"],
        ],
        xaxis: "x2",
        yaxis: "y2",
        name: "Charge Density",
      };

      const isoelectric_point_trace = {
        type: "box",
        y: [
          isoelectric_point["min"],
          isoelectric_point["25%"],
          isoelectric_point["mean"],
          isoelectric_point["75%"],
          isoelectric_point["max"],
        ],
        xaxis: "x3",
        yaxis: "y3",
        name: "Isoelectric Point",
      };

      const length_trace = {
        type: "box",
        y: [
          length["min"],
          length["25%"],
          length["mean"],
          length["75%"],
          length["max"],
        ],
        xaxis: "x4",
        yaxis: "y4",
        name: "Length",
      };

      const molecular_weight_trace = {
        type: "box",
        y: [
          molecular_weight["min"],
          molecular_weight["25%"],
          molecular_weight["mean"],
          molecular_weight["75%"],
          molecular_weight["max"],
        ],
        xaxis: "x5",
        yaxis: "y5",
        name: "Molecular Weight",
      };

      const aliphattic_index_trace = {
        type: "box",
        y: [
          aliphatic_index["min"],
          aliphatic_index["25%"],
          aliphatic_index["mean"],
          aliphatic_index["75%"],
          aliphatic_index["max"],
        ],
        name: "Aliphatic Index",
        xaxis: "x6",
        yaxis: "y6",
      };

      const aromaticity_trace = {
        type: "box",
        y: [
          aromaticity["min"],
          aromaticity["25%"],
          aromaticity["mean"],
          aromaticity["75%"],
          aromaticity["max"],
        ],
        name: "Aromaticity",
        xaxis: "x7",
        yaxis: "y7",
      };

      const boman_index_trace = {
        type: "box",
        y: [
          boman_index["min"],
          boman_index["25%"],
          boman_index["mean"],
          boman_index["75%"],
          boman_index["max"],
        ],
        name: "Boman Index",
        xaxis: "x8",
        yaxis: "y8",
      };

      const hydrophobic_ratio_trace = {
        type: "box",
        y: [
          hydrophobic_ratio["min"],
          hydrophobic_ratio["25%"],
          hydrophobic_ratio["mean"],
          hydrophobic_ratio["75%"],
          hydrophobic_ratio["max"],
        ],
        name: "Hydrophobic Ratio",
        xaxis: "x9",
        yaxis: "y9",
      };

      const instability_index_trace = {
        type: "box",
        y: [
          instability_index["min"],
          instability_index["25%"],
          instability_index["mean"],
          instability_index["75%"],
          instability_index["max"],
        ],
        name: "Instability Index",
        xaxis: "x10",
        yaxis: "y10",
      };

      const data = [
        charge_trace,
        charge_density_trace,
        isoelectric_point_trace,
        length_trace,
        molecular_weight_trace,
        aliphattic_index_trace,
        aromaticity_trace,
        boman_index_trace,
        hydrophobic_ratio_trace,
        instability_index_trace,
      ];

      setDataBoxplot(data);
      setNameActivity(name);
      setShowSkeletonBoxplot(false);
    } catch (error) {
      toast.error("Server error");
    }
  };

  const getAllActivities = async () => {
    const res = await axios.get("/api/get_all_act_statistics/");
    const new_data = [];
    for (let i = 0; i < res.data.data.length; i++) {
      if (res.data.data[i].length === 3) {
        const parcial_data = [
          res.data.data[i][1],
          res.data.data[i][2],
          <Stack direction="row" spacing={2}>
            <Link
              href={`/activity/${res.data.data[i][0]}`}
              target="_blank"
              sx={{ textDecoration: "none", cursor: "pointer" }}
            >
              <RemoveRedEyeIcon />
            </Link>
            
          </Stack>,
        ];
        new_data.push(parcial_data);
      }
    }

    if (res.data.data.length > 0) {
      getSpecificActivity(res.data.data[0][0], res.data.data[0][1]);
    }

    setTableActivities({
      columns: ["Activity", "Peptides", "Details"],
      data: new_data,
    });
    setLoadingTableActivities(false);
  };

  useEffect(() => {
    try {
      getAllActivities();
    } catch (error) {
      toast.error("Server error");
      setLoadingTableActivities(false);
    }
  }, []);

  return {
    tableActivitiies,
    dataBoxplot,
    nameActivity,
    showSkeletonBoxplot,
    loadingTableActivities,
  };
}
