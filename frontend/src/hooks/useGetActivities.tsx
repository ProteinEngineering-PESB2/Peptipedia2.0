import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function useGetActivities() {
  const [activities, setActivities] = useState([]);

  const initialActivities = async () => {
    try {
      const { data } = await axios.get("/api/activity_list/");
      setActivities(data.result);
    } catch (error) {
      toast.error("Server error");
      setActivities([]);
    }
  };

  useEffect(() => {
    initialActivities();
  }, []);

  return {
    activities,
  };
}
