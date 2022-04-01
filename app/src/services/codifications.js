import axios from "axios";

export const codification = async (post) => {
  const { data } = await axios.post("/api/encoding", post);

  const { result } = data;

  return result;
};
