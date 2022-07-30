import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function useGetTaxonomies() {
  const [taxonomies, setTaxonomies] = useState([]);

  const initialTaxonomies = async () => {
    try {
      const { data } = await axios.get(`/api/taxonomy_list/`);
      setTaxonomies(data.result);
    } catch (error) {
      toast.error("Server error");
      setTaxonomies([])
    }
  };

  useEffect(() => {
    initialTaxonomies()
  }, [])

  return {
    taxonomies,
  };
}
