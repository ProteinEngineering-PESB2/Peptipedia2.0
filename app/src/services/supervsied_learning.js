import axios from "axios";

export const supervisedLearning = async (post) => {
  const res = await axios.post("/api/supervised_learning", post);

  return res.data;
};
