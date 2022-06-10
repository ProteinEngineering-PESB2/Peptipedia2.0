import axios from "axios";

interface Props {
  data: string;
}

export const fasta_converter = async (props: Props) => {
  const { data } = await axios.post("/api/fasta_convertor", props);

  return data;
};
