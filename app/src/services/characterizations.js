import axios from "axios";

export const phisicochemical = async (post) => {
  const { data } = await axios.post(`/api/phisicochemical`, post);

  return data;
};

export const geneOntology = async (post) => {
  const { data } = await axios.post("/api/gene_ontology", post);

  return data;
};

export const pfam = async (post) => {
  const { data } = await axios.post("/api/pfam", post);

  return data;
};

export const frequency = async (post) => {
  const { data } = await axios.post("/api/frequency", post);

  return data;
};
