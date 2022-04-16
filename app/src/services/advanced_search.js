import axios from "axios";

export const getTaxonomies = async (term) => {
  const res = await axios.get(`/api/taxonomy_list/${term}`);
  return res.data;
};

export const getDatabases = async () => {
  const res = await axios.get("/api/database_list");
  return res.data;
};
