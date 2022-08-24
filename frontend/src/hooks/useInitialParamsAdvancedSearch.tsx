import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  setValueLength: Dispatch<SetStateAction<number | number[]>>;
  setValueMolecularWeight: Dispatch<SetStateAction<number | number[]>>;
  setValueIsoelectricPoint: Dispatch<SetStateAction<number | number[]>>;
  setValueCharge: Dispatch<SetStateAction<number | number[]>>;
  setValueChargeDensity: Dispatch<SetStateAction<number | number[]>>;
  setValueInstabilityIndex: Dispatch<SetStateAction<number | number[]>>;
  setValueAliphaticIndex: Dispatch<SetStateAction<number | number[]>>;
  setValueAromaticity: Dispatch<SetStateAction<number | number[]>>;
  setValueBomanIndex: Dispatch<SetStateAction<number | number[]>>;
  setValueHydrophobicRatio: Dispatch<SetStateAction<number | number[]>>;
}

interface IParams {
  min_length: number;
  max_length: number;
  min_molecular_weigth: number;
  max_molecular_weight: number;
  min_isoelectric_point: number;
  max_isoelectric_point: number;
  min_charge: number;
  max_charge: number;
  min_charge_density: number;
  max_charge_density: number;
  max_aliphatic_index: number;
  min_aliphatic_index: number;
  max_aromaticity: number;
  min_aromaticity: number;
  max_boman_index: number;
  min_boman_index: number;
  max_instability_index: number;
  min_instability_index: number;
  max_hydrophobic_ratio: number;
  min_hydrophobic_ratio: number;
}

export default function useInitialParamsAdvancedSearch({
  setValueLength,
  setValueCharge,
  setValueChargeDensity,
  setValueIsoelectricPoint,
  setValueMolecularWeight,
  setValueInstabilityIndex,
  setValueAliphaticIndex,
  setValueAromaticity,
  setValueBomanIndex,
  setValueHydrophobicRatio,
}: Props) {
  const [params, setParams] = useState<IParams>({
    max_charge: 0,
    max_charge_density: 0,
    max_isoelectric_point: 0,
    max_length: 0,
    max_molecular_weight: 0,
    min_charge: 0,
    min_charge_density: 0,
    min_isoelectric_point: 0,
    min_length: 0,
    min_molecular_weigth: 0,
    max_aliphatic_index: 0,
    max_aromaticity: 0,
    max_boman_index: 0,
    max_hydrophobic_ratio: 0,
    max_instability_index: 0,
    min_aliphatic_index: 0,
    min_aromaticity: 0,
    min_boman_index: 0,
    min_hydrophobic_ratio: 0,
    min_instability_index: 0,
  });

  const initialParameters = async () => {
    try {
      const { data } = await axios.get("/api/min_max_parameters/");
      setParams(data.result);
      console.log(data.result);
      setValueLength([data.result.min_length, data.result.max_length]);
      setValueMolecularWeight([
        data.result.min_molecular_weigth,
        data.result.max_molecular_weight,
      ]);
      setValueIsoelectricPoint([
        data.result.min_isoelectric_point,
        data.result.max_isoelectric_point,
      ]);
      setValueCharge([data.result.min_charge, data.result.max_charge]);
      setValueChargeDensity([
        data.result.min_charge_density,
        data.result.max_charge_density,
      ]);
      setValueInstabilityIndex([
        data.result.min_instability_index,
        data.result.max_instability_index,
      ]);
      setValueAromaticity([
        data.result.min_aromaticity,
        data.result.max_aromaticity,
      ]);
      setValueAliphaticIndex([
        data.result.min_aliphatic_index,
        data.result.max_aliphatic_index,
      ]);
      setValueBomanIndex([
        data.result.min_boman_index,
        data.result.max_boman_index,
      ]);
      setValueHydrophobicRatio([
        data.result.min_hydrophobic_ratio,
        data.result.max_hydrophobic_ratio,
      ]);
    } catch (error) {
      toast.error("Server error");
      setParams({
        max_charge: 0,
        max_charge_density: 0,
        max_isoelectric_point: 0,
        max_length: 0,
        max_molecular_weight: 0,
        min_charge: 0,
        min_charge_density: 0,
        min_isoelectric_point: 0,
        min_length: 0,
        min_molecular_weigth: 0,
        max_aliphatic_index: 0,
        max_aromaticity: 0,
        max_boman_index: 0,
        max_hydrophobic_ratio: 0,
        max_instability_index: 0,
        min_aliphatic_index: 0,
        min_aromaticity: 0,
        min_boman_index: 0,
        min_hydrophobic_ratio: 0,
        min_instability_index: 0,
      });
    }
  };

  useEffect(() => {
    initialParameters();
  }, []);

  return {
    params,
  };
}
