import axios from "axios";

export const blast = async (post) => {
  const { data } = await axios.post("http://190.114.255.125:8001/api/alignment", post);

  return data;
};

export const msa = async (post) => {
  const { data } = await axios.post("/api/msa", post);

  return data;
};
