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

const markdownText = `
  + **Input**: 
    + Two or more amino acid sequences with fasta format.
    + Sequence with maxium length 150.
`;

const placeholder = `
>as:U24-ctenitoxin-Pn1a|sp:P84032|10 Toxin from venom of the spider Phoneutria nigriventer with unknown molecular target
ARPKSDCEKHRESTEKTGTIMKLIPKCKENSDYEELQCYEDSKFCVCYDKKGHAASPISTKVKECGCYLKQKERKDSGRESAIIPQCEEDGKWAKKQLWEFNKSCWCVDEKGEQVGKIHHDCDSLKCE
>as:delta-ctenitoxin-Asp2e|sp:P84028|16 Toxin from venom of the spider Ancylometes spec. with unknown molecular target
ATCAGQDKPCKVNCDCCGERGECVCGGPCICRQGNVFIAWSKLMTCK
>as:U1-ctenitoxin-Asp1a|sp:P84027|15 Toxin from venom of the spider Ancylometes spec. with unknown molecular target
SDNEFPSGCIEFGKECDLDKGNCQCCRRNGYCSCAVN
>as:omega-hexatoxin-Ar1a_1|20 Translation omega-hexatoxin-Ar1a insecticidal toxin (XenFW194) from Sydney funnel-web spider Atrax robustus.
MNTATGFIVLLVLATVLGAIEAEDAVPDFEGGFASHAREDTVGGKIRRSSVCIPSGQPCPYNEHCCSGSCTYKENENGNTVQRCD
>as:omega-hexatoxin-Ar1a_3|sp:P83580|20 Insecticidal toxin from Sydney funnel-web spider Atrax robustus
SSVCIPSGQPCPYNEHCCSGSCTYKENENGNTVQRCD
>as:omega-hexatoxin-Ar1b_1|gb:ABP63654|21 Translation omega-hexatoxin-Ar1b Insecticidal toxin (XenFW208) from Sydney funnel-web spider Atrax robustus.
MNTATGFIVLLVLATVLGCIEAGESHVREDAMGRARRGACTPTGQPCPYNESCCSGSCQEQLNENGHTVKRCV
>as:omega-hexatoxin-Ar1c|gb:ABP63655|22 Translation omega-hexatoxin-Ar1c Insecticidal toxin (XenFW137) from Sydney funnel-web spider Atrax robustus.
MNTATGVIALLVLATVIGCIEAEDTRADLQGGEAAEKVFRRSPTCIPSGQPCPYNENYCSQSCTFKENENANTVKRCD
`;

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
      <FormContainer markdownText={markdownText}>
        <form onSubmit={onSubmit}>
          <InputFileType data={data} setData={setData} />
          <TextFieldFasta
            data={data}
            setData={setData}
            placeholder={placeholder}
          />
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
