import FormContainer from "../form/form_container";
import InputFileType from "../form/input_file_type";
import InputFileFasta from "../form/input_file_fasta";
import TextFieldFasta from "../form/text_field_fasta";
import ButtonRun from "../form/button_run";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IAlign, ITable, PostData } from "../../utils/interfaces";
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

interface Props {
  setPath: Dispatch<SetStateAction<string>>;
  setTable: Dispatch<SetStateAction<ITable>>;
  setSequences: Dispatch<SetStateAction<IAlign[]>>;
}

export default function AlignmentSequenceForm({
  setPath,
  setTable,
  setSequences,
}: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const handleSequences = (aligns: IAlign[]) => {
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
        const { path, table, aligns } = data;

        for (let row in table.data) {
          const id = table.data[row][0];
          const filter_aligns = aligns[id];

          table.data[row].push(
            <Button
              variant="text"
              onClick={() => handleSequences(filter_aligns)}
            >
              <FormatAlignCenterIcon />
            </Button>
          );
        }

        table.columns.push("Options");

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
      <FormContainer>
        <form onSubmit={onSubmit}>
          <InputFileType data={data} setData={setData} />
          <TextFieldFasta data={data} setData={setData} />
          <InputFileFasta data={data} setData={setData} />
          <ButtonRun data={data} />
        </form>
      </FormContainer>
    </>
  );
}
