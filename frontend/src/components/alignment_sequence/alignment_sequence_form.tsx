import FormContainer from "../form/form_container";
import InputFileType from "../form/input_file_type";
import InputFileFasta from "../form/input_file_fasta";
import TextFieldFasta from "../form/text_field_fasta";
import ButtonRun from "../form/button_run";
import { FormEvent, useState } from "react";
import { IBackdrop, PostData } from "../../utils/interfaces";
import {
  InitialValueBackdrop,
  InitialValuePostData,
} from "../../utils/initial_values";
import { parserFormDataWithoutOptions } from "../../helpers/parserFormData";
import { requestPost } from "../../services/api";
import toast from "react-hot-toast";
import BackdropComponent from "../backdrop_component";

export default function AlignmentSequenceForm() {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [backdrop, setBackdrop] = useState<IBackdrop>(InitialValueBackdrop);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBackdrop({ ...backdrop, open: true });

    const postData = parserFormDataWithoutOptions(data);

    try {
      const { data } = await requestPost({
        url: "/api/msa",
        postData: postData,
        backdrop,
        setBackdrop,
      });

      if (data.status === "error") {
        toast.error(data.description);
      } else {
        console.log(data);
      }

      setBackdrop({ ...backdrop, open: false });
    } catch (error) {
      toast.error("Server error");
      setBackdrop({ ...backdrop, open: false });
    }
  };

  return (
    <>
      <BackdropComponent
        open={backdrop.open}
        percentage={backdrop.percentage}
      />
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
