import FormContainer from "../form/form_container";
import InputFileType from "../form/input_file_type";
import InputFileFasta from "../form/input_file_fasta";
import TextFieldFasta from "../form/text_field_fasta";
import ButtonRun from "../form/button_run";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IOneAlign, ITable, PostData } from "../../utils/interfaces";
import {
  InitialValuePostData,
  InitialValueTable,
} from "../../utils/initial_values";
import { parserFormDataWithoutOptions } from "../../helpers/parserFormData";
import { requestPost } from "../../services/api";
import toast from "react-hot-toast";
import BackdropComponent from "../backdrop_component";
import { Button } from "@mui/material";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { Link } from "react-router-dom";

interface Props {
  setPath: Dispatch<SetStateAction<string>>;
  setTable: Dispatch<SetStateAction<ITable>>;
  setSequences: Dispatch<SetStateAction<IOneAlign[]>>;
}

const markdownText = `
  + **Input**: 
    + One amino acid sequence with fasta format.
    + Sequence with maxium length 150.
  + **Blast Strategy**
    + Blastp
    + E-value = 0.5
`;

const placeholder = `
>sp|P40337|VHL_HUMAN von Hippel-Lindau disease tumor suppressor OS=Homo sapiens OX=9606 GN=VHL PE=1 SV=2
MPRRAENWDEAEVGAEEAGVEEYGPEEDGGEESGAEESGPEESGPEELGAEEEMEAGRPRPVLRSVNSREPSQVIFCNRSPRVVLPVWLNFDGEPQPYPTLPPGTGRRIHSYRGHLWLFR
`;

export default function AlignmentSequenceForm({
  setPath,
  setTable,
  setSequences,
}: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const handleSequences = (aligns: IOneAlign[]) => {
    setSequences(aligns);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenBackdrop(true);
    setPath("");
    setTable(InitialValueTable);
    setSequences([]);

    const postData = parserFormDataWithoutOptions(data);

    try {
      const { data } = await requestPost({
        url: "/api/alignment",
        postData: postData,
      });

      if (data.status === "error") {
        toast.error(data.description);
      } else {
        console.log(data);
        const { path, table, aligns } = data;

        for (let row in table.data) {
          const id = table.data[row][0];
          const filter_aligns = aligns[id];

          table.data[row][0] = (
            <Link
              to={`/peptide/${id}`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {id}
            </Link>
          );

          table.data[row].push(
            <Button
              variant="text"
              onClick={() => handleSequences(filter_aligns)}
            >
              <FormatAlignCenterIcon />
            </Button>
          );
        }

        table.columns.push("details");

        setPath(path);
        setTable({
          columns: table.columns,
          data: table.data,
        });
      }

      setOpenBackdrop(false);
    } catch (error) {
      toast.error("Server error");
      setPath("");
      setTable(InitialValueTable);
      setSequences([]);
      setOpenBackdrop(false);
    }
  };

  return (
    <>
      <BackdropComponent open={openBackdrop} />
      <FormContainer markdownText={markdownText}>
        <form onSubmit={onSubmit}>
          <InputFileType data={data} setData={setData} />
          <TextFieldFasta
            data={data}
            setData={setData}
            placeholder={placeholder}
          />
          <InputFileFasta data={data} setData={setData} />
          <ButtonRun data={data} />
        </form>
      </FormContainer>
    </>
  );
}
