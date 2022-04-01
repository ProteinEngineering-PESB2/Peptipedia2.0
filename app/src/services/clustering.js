import axios from "axios";

export const clustering = async (post) => {
  const { data } = await axios.post("/api/clustering", post);

  return data.result
};
