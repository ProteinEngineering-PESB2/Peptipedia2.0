import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  setValueLength: Dispatch<SetStateAction<number | number[]>>;
  setValueMolecularWeight: Dispatch<SetStateAction<number | number[]>>;
  setValueIsoelectricPoint: Dispatch<SetStateAction<number | number[]>>;
  setValueCharge: Dispatch<SetStateAction<number | number[]>>;
  setValueChargeDensity: Dispatch<SetStateAction<number | number[]>>;
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
}

export default function useInitialParamsAdvancedSearch({
  setValueLength,
  setValueCharge,
  setValueChargeDensity,
  setValueIsoelectricPoint,
  setValueMolecularWeight,
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
  });

  const initialParameters = async () => {
    try {
      const { data } = await axios.get("/api/min_max_parameters/");
      setParams(data.result);
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
