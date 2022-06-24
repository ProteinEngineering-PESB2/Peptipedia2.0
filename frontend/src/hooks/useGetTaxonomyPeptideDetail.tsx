import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { InitialValueTable } from "../utils/initial_values";
import { ITable } from "../utils/interfaces";

interface Props {
  peptideId: string | undefined;
}

export default function useGetTaxonomyPeptideDetail({ peptideId }: Props) {
  const [tableTaxonomy, setTableTaxonomy] = useState<ITable>(InitialValueTable);

  const getTaxonomiesFromPeptide = async () => {
    try {
      const { data } = await axios.get(
        `/api/get_tax_from_peptide/${peptideId}`
      );
      setTableTaxonomy({
        columns: data.result.columns,
        data: data.result.data,
      });
    } catch (error) {
      toast.error("Server Error");
      setTableTaxonomy(InitialValueTable);
    }
  };

  useEffect(() => {
    getTaxonomiesFromPeptide();
  }, []);

  return {
    tableTaxonomy,
  };
}
