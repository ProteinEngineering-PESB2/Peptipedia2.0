import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { parserFormDataWithoutOptions } from "../../helpers/parserFormData";
import { InitialValuePostData } from "../../utils/initial_values";
import { IAlign, PostData } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonRun from "../form/button_run";
import FormContainer from "../form/form_container";
import InputFileFasta from "../form/input_file_fasta";
import InputFileType from "../form/input_file_type";
import TextFieldFasta from "../form/text_field_fasta";
import toast from "react-hot-toast";
import { requestPost } from "../../services/api";

interface Props {
  setResult: Dispatch<SetStateAction<IAlign>>;
}

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

const markdownText = `
  + **Input**: 
    + Two or more amino acid sequences with fasta format.
    + Sequences with maxium length 150.
`;

export default function MSAForm({ setResult }: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult({
      alignment: [],
      output_file: "",
      distances_file: "",
      image_heatmap: "",
      dendrogram: ""
    });
    setOpenBackdrop(true);

    const postData = parserFormDataWithoutOptions(data);

    try {
      const { data } = await requestPost({
        url: "/api/msa",
        postData,
      });

      if (data.status === "error") {
        toast.error(data.description);
      } else {
        const { result } = data;
        setResult({
          alignment: result.alignment,
          output_file: result.output_file,
          distances_file: result.distances_file,
          image_heatmap: result.image_heatmap,
          dendrogram: result.dendrogram
        });
      }

      setOpenBackdrop(false);
    } catch (error) {
      toast.error("Server error");
      setResult({
        alignment: [],
        output_file: "",
        distances_file: "",
        image_heatmap: "",
        dendrogram: ""
      });
      setOpenBackdrop(false);
    }
  };

  return (
    <>
      <BackdropComponent open={openBackdrop} />
      <FormContainer markdownText={markdownText}>
        <form onSubmit={onSubmit}>
          <InputFileType data={data} setData={setData} />
          <TextFieldFasta
            data={data}
            setData={setData}
            placeholder={placeholder}
          />
          <InputFileFasta data={data} setData={setData} />
          <ButtonRun data={data} />
        </form>
      </FormContainer>
    </>
  );
}
