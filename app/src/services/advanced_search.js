import axios from "axios";

export const getTaxonomies = async (term) => {
  const res = await axios.get(`/api/gene_ontology_list/${term}`);

  console.log(res);
};
