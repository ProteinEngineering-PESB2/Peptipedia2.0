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

const markdownText = `
  + **Input**: 
    + One or more amino acid sequences with fasta format.
    + Sequence with maxium length 150.
  + **GO Tool**
    + Metastudent
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

export default function GeneOntologyForm({ setResult }: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenBackdrop(true);
    setResult([]);

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
      setResult([]);
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
