import FormContainer from "../form/form_container";
import InputFileType from "../form/input_file_type";
import InputFileFasta from "../form/input_file_fasta";
import TextFieldFasta from "../form/text_field_fasta";
import ButtonRun from "../form/button_run";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { PostData } from "../../utils/interfaces";
import { InitialValuePostData } from "../../utils/initial_values";
import { parserFormDataWithoutOptions } from "../../helpers/parserFormData";
import { requestPost } from "../../services/api";
import toast from "react-hot-toast";
import BackdropComponent from "../backdrop_component";

interface Props {
  setPath: Dispatch<SetStateAction<string>>;
}

export default function AlignmentSequenceForm({ setPath }: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenBackdrop(true);
    setPath("");

    const postData = parserFormDataWithoutOptions(data);

    try {
      const { data } = await requestPost({
        url: "/api/alignment",
        postData: postData,
        setPercentage,
      });

      if (data.status === "error") {
        toast.error(data.description);
      } else {
        const { path } = data;
        setPath(path);
      }

      setOpenBackdrop(false);
    } catch (error) {
      toast.error("Server error");
      setPath("")
      setOpenBackdrop(false);
      setPercentage(0);
    }
  };

  return (
    <>
      <BackdropComponent open={openBackdrop} percentage={percentage} />
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
