import FormContainer from "../form/form_container";
import InputFileType from "../form/input_file_type";
import InputFileFasta from "../form/input_file_fasta";
import TextFieldFasta from "../form/text_field_fasta";
import ButtonRun from "../form/button_run";
import { FormEvent, useState } from "react";
import { FastaInputType } from "../../helpers/types";

export default function AlignmentSequenceForm() {
  const [fileType, setFileType] = useState<string>("text");
  const [fastaText, setFastaText] = useState<string>("");
  const [fastaInput, setFastaInput] = useState<FastaInputType>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello world");
  };

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <InputFileType fileType={fileType} setFileType={setFileType} />
        <TextFieldFasta
          fastaText={fastaText}
          setFastaText={setFastaText}
          fileType={fileType}
        />
        <InputFileFasta
          fastaInput={fastaInput}
          setFastaInput={setFastaInput}
          fileType={fileType}
        />
        <ButtonRun />
      </form>
    </FormContainer>
  );
}
