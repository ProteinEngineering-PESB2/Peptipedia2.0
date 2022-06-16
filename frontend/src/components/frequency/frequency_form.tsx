import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { parserFormDataWithoutOptions } from "../../helpers/parserFormData";
import { requestPost } from "../../services/api";
import { InitialValuePostData } from "../../utils/initial_values";
import { IDataFrequency, PostData } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonRun from "../form/button_run";
import FormContainer from "../form/form_container";
import InputFileFasta from "../form/input_file_fasta";
import InputFileType from "../form/input_file_type";
import TextFieldFasta from "../form/text_field_fasta";

interface Props {
  setResult: Dispatch<SetStateAction<IDataFrequency[]>>;
}

export default function FrequencyForm({ setResult }: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setOpenBackdrop(true);
    setResult([]);

    const postData = parserFormDataWithoutOptions(data);

    try {
      const { data } = await requestPost({
        url: "/api/frequency",
        postData,
      });

      if (data.status === "error") {
        toast.error(data.description);
      } else {
        const { result } = data;
        setResult(result);
      }

      setOpenBackdrop(false);
    } catch (error) {
      toast.error("Server error");
      setOpenBackdrop(false);
      setResult([]);
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
