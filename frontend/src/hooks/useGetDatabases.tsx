import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function useGetDatabases() {
  const [databases, setDatabases] = useState([]);

  const initialDatabases = async () => {
    try {
      const { data } = await axios.get("/api/database_list/");
      setDatabases(data.result);
    } catch (error) {
      toast.error("Server Error");
      setDatabases([]);
    }
  };

  useEffect(() => {
    initialDatabases();
  }, []);

  return {
    databases,
  };
}
