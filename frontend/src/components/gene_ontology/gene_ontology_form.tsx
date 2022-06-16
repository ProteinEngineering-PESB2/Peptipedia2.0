import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { parserFormDataWithOptions } from "../../helpers/parserFormData";
import { InitialValuePostData } from "../../utils/initial_values";
import { IDataGeneOntology, PostData } from "../../utils/interfaces";
import ButtonRun from "../form/button_run";
import Checkboxs from "../form/checkboxs";
import FormContainer from "../form/form_container";
import InputFileFasta from "../form/input_file_fasta";
import InputFileType from "../form/input_file_type";
import TextFieldFasta from "../form/text_field_fasta";
import toast from "react-hot-toast";
import { requestPost } from "../../services/api";
import BackdropComponent from "../backdrop_component";

interface Props {
  setResult: Dispatch<SetStateAction<IDataGeneOntology[]>>;
}

export default function GeneOntologyForm({ setResult }: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenBackdrop(true);
    setResult([])

    const options = {
      molecular_function: data.checkboxs.molecular_function ? 1 : 0,
      biological_process: data.checkboxs.biological_process ? 1 : 0,
      celular_component: data.checkboxs.celular_component ? 1 : 0,
    };

    const postData = parserFormDataWithOptions(data, options);

    try {
      const { data } = await requestPost({
        url: "/api/gene_ontology",
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
      setResult([])
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
          <Checkboxs
            data={data}
            setData={setData}
            selectedCheckboxs={[
              "molecular_function",
              "biological_process",
              "celular_component",
            ]}
          />
          <ButtonRun data={data} />
        </form>
      </FormContainer>
    </>
  );
}
