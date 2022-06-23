import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function useGetPfam() {
  const [pfams, setPfams] = useState([]);

  const initialPfams = async () => {
    try {
      const { data } = await axios.get("/api/pfam_list");
      setPfams(data.result);
    } catch (error) {
      toast.error("Server error");
      setPfams([]);
    }
  };

  useEffect(() => {
    initialPfams();
  }, []);

  return {
    pfams,
  };
}
