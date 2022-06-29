import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  peptideId: string | undefined;
}

export interface IDataInfo {
  length: number;
  molecular_weight: number;
  isoelectric_point: number;
  charge: number;
  charge_density: number;
  sequence: string;
}

export default function useGetInfoPeptideDetail({ peptideId }: Props) {
  const [dataInfo, setDataInfo] = useState<IDataInfo>({
    charge: 0,
    charge_density: 0,
    isoelectric_point: 0,
    length: 0,
    molecular_weight: 0,
    sequence: "",
  });

  const getInfoFromPeptide = async () => {
    try {
      const { data } = await axios.get(
        `/api/get_info_from_peptide/${peptideId}`
      );
      setDataInfo({
        charge: data.result[0].charge,
        charge_density: data.result[0].charge_density,
        isoelectric_point: data.result[0].isoelectric_point,
        length: data.result[0].length,
        molecular_weight: data.result[0].molecular_weight,
        sequence: data.result[0].sequence,
      });
    } catch (error) {
      toast.error("Server Error");
      setDataInfo({
        charge: 0,
        charge_density: 0,
        isoelectric_point: 0,
        length: 0,
        molecular_weight: 0,
        sequence: "",
      });
    }
  };

  useEffect(() => {
    getInfoFromPeptide();
  }, []);

  return {
    dataInfo,
  };
}
