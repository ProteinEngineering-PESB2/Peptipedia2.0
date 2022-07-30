import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function useGetGeneOntologoies() {
  const [geneOntologies, setGeneOntologies] = useState([]);

  const initialGeneOntology = async () => {
    try {
      const { data } = await axios.get("/api/gene_ontology_list/");
      setGeneOntologies(data.result);
    } catch (error) {
      toast.error("Server error");
      setGeneOntologies([]);
    }
  };

  useEffect(() => {
    initialGeneOntology();
  }, []);

  return {
    geneOntologies,
  };
}
