import axios from "axios";

export const blastText = async (post) => {
  const { data } = await axios.post("/api/alignment", post);

  return data;
};

export const blastFile = async (post) => {
  const { data } = await axios.post("/api/alignment_file", post);

  return data;
};

export const msaText = async (post) => {   
  const { data } = await axios.post("/api/msa", post);

  const { result } = data;

  return result;
};

export const msaFile = async (post) => {
  const { data } = await axios.post("/api/msa_file", post);

  const { result } = data;

  return result;
};
