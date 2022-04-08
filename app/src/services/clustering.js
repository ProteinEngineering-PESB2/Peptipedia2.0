import axios from "axios";

export const clustering = async (post) => {
  const { data } = await axios.post("/api/clustering", post);

  return data;
};

export const pca = async (post) => {
  const { data } = await axios.post("/api/pca", post);

  return data.result;
};
