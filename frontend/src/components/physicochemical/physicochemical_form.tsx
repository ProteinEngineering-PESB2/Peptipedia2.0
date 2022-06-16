import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { parserFormDataWithOptions } from "../../helpers/parserFormData";
import { requestPost } from "../../services/api";
import { InitialValuePostData } from "../../utils/initial_values";
import { IDataPhysichochemical, PostData } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonRun from "../form/button_run";
import Checkboxs from "../form/checkboxs";
import FormContainer from "../form/form_container";
import InputFileFasta from "../form/input_file_fasta";
import InputFileType from "../form/input_file_type";
import TextFieldFasta from "../form/text_field_fasta";

interface Props {
  setResult: Dispatch<SetStateAction<IDataPhysichochemical[]>>;
}

export default function PhysichochemicalForm({ setResult }: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenBackdrop(true);
    setResult([]);

    const options = {
      length: data.checkboxs.length ? 1 : 0,
      molecular_weight: data.checkboxs.molecular_weight ? 1 : 0,
      isoelectric_point: data.checkboxs.isoelectric_point ? 1 : 0,
      charge: data.checkboxs.charge ? 1 : 0,
      charge_density: data.checkboxs.charge_density ? 1 : 0,
    };

    const postData = parserFormDataWithOptions(data, options);

    try {
      const { data } = await requestPost({
        url: "/api/phisicochemical",
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
      setResult([]);
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
              "length",
              "molecular_weight",
              "isoelectric_point",
              "charge",
              "charge_density",
            ]}
          />
          <ButtonRun data={data} />
        </form>
      </FormContainer>
    </>
  );
}
