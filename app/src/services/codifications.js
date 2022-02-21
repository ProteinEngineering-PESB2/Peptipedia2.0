import axios from "axios";

export const codificationForText = async (post) => {
  const { data } = await axios.post("/api/codification", post);

  const { result } = data;

  return result;
};
