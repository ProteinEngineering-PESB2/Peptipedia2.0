import { Grid } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { parserFormDataWithOptions } from "../../helpers/parserFormData";
import { useSelectAffinityClustering } from "../../hooks/useSelectAffinityClustering";
import { useSelectAlgorithmClustering } from "../../hooks/useSelectAlgorithmClustering";
import { useSelectEncoding } from "../../hooks/useSelectEncoding";
import { useSelectLinkageClustering } from "../../hooks/useSelectLinkageClustering";
import { useSelectProperty } from "../../hooks/useSelectProperty";
import { useTextFieldKValue } from "../../hooks/useTextFieldKValue";
import { useTextFieldMinClusterSize } from "../../hooks/useTextFieldMinClusterSize";
import { useTextFieldMinSamples } from "../../hooks/useTextFieldMinSamples";
import { useTextFieldXi } from "../../hooks/useTextFieldXi";
import { requestPost } from "../../services/api";
import { InitialValuePostData } from "../../utils/initial_values";
import { IDataClustering, PostData } from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonRun from "../form/button_run";
import FormContainer from "../form/form_container";
import InputFileFasta from "../form/input_file_fasta";
import InputFileType from "../form/input_file_type";
import SelectComponent from "../form/select_component";
import TextFieldComponent from "../form/text_field_component";
import TextFieldFasta from "../form/text_field_fasta";

interface Props {
  setResult: Dispatch<SetStateAction<IDataClustering | null>>;
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
    + Five or more amino acid sequences with fasta format.
    + Sequences with maxium length 150.
    + K-Value >= 2
`;

export default function ClusteringForm({ setResult }: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const { encodings, selectedEncoding, handleChangeSelectedEncoding } =
    useSelectEncoding();
  const { algorithms, selectedAlgorithm, handleChangeSelectedAlgorithm } =
    useSelectAlgorithmClustering();
  const { properties, selectedProperty, handleChangeSelectedProperty } =
    useSelectProperty();
  const { linkages, selectedLinkage, handleChangeSelectedLinkage } =
    useSelectLinkageClustering();
  const { affinities, selectedAffinity, handleChangeSelectedAffinity } =
    useSelectAffinityClustering();
  const { kvalue, handleChangeKValue } = useTextFieldKValue();
  const { xi, handleChangeXi } = useTextFieldXi();
  const { minSamples, handleChangeMinSamples } = useTextFieldMinSamples();
  const { minClusterSize, handleChangeMinClusterSize } =
    useTextFieldMinClusterSize();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setOpenBackdrop(true);
    setResult(null);

    const options = {
      encoding: selectedEncoding,
      selected_property: selectedProperty,
      algorithm: selectedAlgorithm,
      params: {
        k_value: parseFloat(kvalue),
        min_samples: parseFloat(minSamples),
        xi: parseFloat(xi),
        min_cluster_size: parseFloat(minClusterSize),
        linkage: selectedLinkage,
        affinity: selectedAffinity,
      },
    };

    const postData = parserFormDataWithOptions(data, options);

    try {
      const { data } = await requestPost({ url: "/api/clustering/", postData });

      if (data.status === "error") {
        toast.error(data.description);
      } else {
        const { result } = data;
        console.log(data)
        setResult(result);
      }

      setOpenBackdrop(false);
    } catch (error) {
      toast.error("Server error");
      setOpenBackdrop(false);
      setResult(null);
    }
  };

  return (
    <>
      <BackdropComponent open={openBackdrop} />
      <FormContainer markdownText={markdownText}>
        <form onSubmit={handleSubmit}>
          <InputFileType data={data} setData={setData} />
          <TextFieldFasta
            data={data}
            setData={setData}
            placeholder={placeholder}
          />
          <InputFileFasta data={data} setData={setData} />
          <Grid container spacing={2} marginTop={0}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <SelectComponent
                items={encodings}
                title="Encoding Type"
                value={selectedEncoding}
                handleChange={handleChangeSelectedEncoding}
              />
            </Grid>
            {selectedEncoding !== "one_hot_encoding" && (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <SelectComponent
                  items={properties}
                  title="Property"
                  value={selectedProperty}
                  handleChange={handleChangeSelectedProperty}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <SelectComponent
                items={algorithms}
                title="Algorithm"
                value={selectedAlgorithm}
                handleChange={handleChangeSelectedAlgorithm}
              />
            </Grid>
            {(selectedAlgorithm === "kmeans" ||
              selectedAlgorithm === "birch" ||
              selectedAlgorithm === "agglomerative") && (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <TextFieldComponent
                  title="K-Value"
                  value={kvalue}
                  handleChange={handleChangeKValue}
                />
              </Grid>
            )}
            {selectedAlgorithm === "agglomerative" && (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <SelectComponent
                  items={linkages}
                  title="Linkage"
                  value={selectedLinkage}
                  handleChange={handleChangeSelectedLinkage}
                />
              </Grid>
            )}
            {selectedAlgorithm === "agglomerative" && (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <SelectComponent
                  items={affinities}
                  title="Affinity"
                  value={
                    selectedLinkage === "ward" ? "euclidean" : selectedAffinity
                  }
                  handleChange={handleChangeSelectedAffinity}
                  disabled={selectedLinkage === "ward" ? true : false}
                />
              </Grid>
            )}
            {selectedAlgorithm === "optics" && (
              <>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <TextFieldComponent
                    title="Xi"
                    value={xi}
                    handleChange={handleChangeXi}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <TextFieldComponent
                    title="Min Samples"
                    value={minSamples}
                    handleChange={handleChangeMinSamples}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <TextFieldComponent
                    title="Min Cluster Size"
                    value={minClusterSize}
                    handleChange={handleChangeMinClusterSize}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <ButtonRun data={data} />
        </form>
      </FormContainer>
    </>
  );
}
