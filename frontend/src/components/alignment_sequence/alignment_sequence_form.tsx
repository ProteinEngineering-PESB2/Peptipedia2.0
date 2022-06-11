import FormContainer from "../form/form_container";
import InputFileType from "../form/input_file_type";
import InputFileFasta from "../form/input_file_fasta";
import TextFieldFasta from "../form/text_field_fasta";
import ButtonRun from "../form/button_run";
import { FormEvent } from "react";

export default function AlignmentSequenceForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello world");
  };

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <InputFileType />
        <TextFieldFasta />
        <InputFileFasta />
        <ButtonRun />
      </form>
    </FormContainer>
  );
}
