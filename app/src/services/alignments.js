import axios from "axios";

export const blast = async (post) => {
  const { data } = await axios.post("/api/alignment", post);

  return data;
};

export const msa = async (post) => {
  const { data } = await axios.post("/api/msaa", post);

  const { result } = data;

  return result;
};
