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

export default function useInitialParamsAdvancedSearch({
  setValueLength,
  setValueCharge,
  setValueChargeDensity,
  setValueIsoelectricPoint,
  setValueMolecularWeight,
}: Props) {
  const [params, setParams] = useState({});

  const initialParameters = async () => {
    try {
      const { data } = await axios.get("/api/min_max_parameters");
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
      setParams([]);
    }
  };

  useEffect(() => {
    initialParameters()
  }, []);

  return {
    params,
  };
}
