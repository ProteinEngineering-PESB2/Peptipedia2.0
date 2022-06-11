import FormContainer from "../form/form_container";
import InputFileType from "../form/input_file_type";
import InputFileFasta from "../form/input_file_fasta";
import TextFieldFasta from "../form/text_field_fasta";
import ButtonRun from "../form/button_run";
import { FormEvent, useState } from "react";
import { PostData } from "../../utils/interfaces";
import { InitialValuePostData } from "../../utils/initial_values";

export default function AlignmentSequenceForm() {
  const [data, setData] = useState<PostData>(InitialValuePostData);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data)
  };

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <InputFileType data={data} setData={setData} />
        <TextFieldFasta data={data} setData={setData}/>
        <InputFileFasta data={data} setData={setData} />
        <ButtonRun />
      </form>
    </FormContainer>
  );
}
