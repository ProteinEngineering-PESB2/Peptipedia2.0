import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { parserFormDataWithOptions } from "../../helpers/parserFormData";
import { requestPost } from "../../services/api";
import { downloadFile } from "../../services/downloadFile";
import { InitialValuePostData } from "../../utils/initial_values";
import { PostData } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonRun from "../form/button_run";
import Checkboxs from "../form/checkboxs";
import FormContainer from "../form/form_container";
import InputFileFasta from "../form/input_file_fasta";
import InputFileType from "../form/input_file_type";
import TextFieldFasta from "../form/text_field_fasta";

export default function EncodingForm() {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [openBackdropFile, setOpenBackdropFile] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenBackdrop(true);

    const options = {
      one_hot_encoding: data.checkboxs.one_hot_encoding ? 1 : 0,
      phisicochemical_properties: data.checkboxs.physicochemical_properties
        ? 1
        : 0,
      digital_signal_processing: data.checkboxs.digital_signal_processing
        ? 1
        : 0,
    };

    const postData = parserFormDataWithOptions(data, options);

    try {
      const { data } = await requestPost({
        postData,
        url: "/api/encoding",
      });

      if (data.status === "error") {
        toast.error(data.description);
      } else {
        const { result } = data;
        downloadFile({
          url: result,
          name: "encoding.zip",
          setOpenBackdrop: setOpenBackdropFile,
          setPercentage,
        });
      }

      setOpenBackdrop(false);
    } catch (error) {
      toast.error("Server error");
      setOpenBackdrop(false);
    }
  };

  return (
    <>
      <BackdropComponent open={openBackdrop} />
      <BackdropComponent open={openBackdropFile} percentage={percentage} />
      <FormContainer>
        <form onSubmit={onSubmit}>
          <InputFileType data={data} setData={setData} />
          <TextFieldFasta data={data} setData={setData} />
          <InputFileFasta data={data} setData={setData} />
          <Checkboxs
            data={data}
            setData={setData}
            selectedCheckboxs={[
              "one_hot_encoding",
              "physicochemical_properties",
              "digital_signal_processing",
            ]}
          />
          <ButtonRun data={data} />
        </form>
      </FormContainer>
    </>
  );
}
