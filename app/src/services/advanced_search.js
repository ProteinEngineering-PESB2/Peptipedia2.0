import axios from "axios";

export const getTaxonomies = async (term) => {
  const res = await axios.get(`/api/taxonomy_list/${term}`);
  return res.data;
};

export const getDatabases = async () => {
  const res = await axios.get("/api/database_list");
  return res.data;
};

export const getPfam = async (term) => {
  const res = await axios.get(`/api/pfam_list/${term}`);
  return res.data;
};

export const getGeneOntology = async (term) => {
  const res = await axios.get(`/api/gene_ontology_list/${term}`);
  return res.data;
};
