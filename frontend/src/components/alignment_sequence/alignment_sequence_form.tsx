import { FormEvent } from "react";

import FormContainer from "../forms/form_container";
import InputFileType from "../forms/input_file_type";
import InputFileFasta from "../forms/input_file_fasta";
import TextFieldFasta from "../forms/text_field_fasta";
import ButtonRun from "../forms/button_run";

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
