import axios from "axios";

export const phisicochemical = async (post) => {
  const { data } = await axios.post(`/api/phisicochemical`, post);

  const { result } = data;

  return result;
};

export const geneOntology = async (post) => {
  const { data } = await axios.post("/api/gene_ontology", post);

  const { result } = data;

  return result;
};

export const pfam = async (post) => {
  const { data } = await axios.post("/api/pfam", post);

  const { result } = data;

  return result;
};

export const frequency = async (post) => {
  const { data } = await axios.post("/api/frequency", post);

  const { result } = data;

  return result;
};
