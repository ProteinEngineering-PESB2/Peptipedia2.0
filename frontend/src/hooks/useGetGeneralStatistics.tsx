import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useGetGeneralStatistics() {
  const [dataPie, setDataPie] = useState<any[]>([]);
  const [loadingDataPie, setLoadingDataPie] = useState<boolean>(true)

  const getGeneralStatistics = async () => {
    const res = await axios.get("/api/get_general_act_statistic/");

    const data = [
      {
        values: res.data.values,
        labels: res.data.labels,
        type: "pie",
      },
    ];

    setDataPie(data);
    setLoadingDataPie(false)
  };

  useEffect(() => {
    try {
      getGeneralStatistics();
    } catch (error) {
      toast.error("Server error");
      setLoadingDataPie(false)
    }
  }, []);

  return {
    dataPie,
    loadingDataPie
  };
}
