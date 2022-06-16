import { Grid } from "@mui/material";
import { useState } from "react";
import { useSelectAffinityClustering } from "../../hooks/useSelectAffinityClustering";
import { useSelectAlgorithmClustering } from "../../hooks/useSelectAlgorithmClustering";
import { useSelectEncoding } from "../../hooks/useSelectEncoding";
import { useSelectLinkageClustering } from "../../hooks/useSelectLinkageClustering";
import { useSelectProperty } from "../../hooks/useSelectProperty";
import { useTextFieldKValue } from "../../hooks/useTextFieldKValue";
import { useTextFieldMinClusterSize } from "../../hooks/useTextFieldMinClusterSize";
import { useTextFieldMinSamples } from "../../hooks/useTextFieldMinSamples";
import { useTextFieldXi } from "../../hooks/useTextFieldXi";
import { InitialValuePostData } from "../../utils/initial_values";
import { PostData } from "../../utils/interfaces";
import ButtonRun from "../form/button_run";
import FormContainer from "../form/form_container";
import InputFileFasta from "../form/input_file_fasta";
import InputFileType from "../form/input_file_type";
import SelectComponent from "../form/select_component";
import TextFieldComponent from "../form/text_field_component";
import TextFieldFasta from "../form/text_field_fasta";

export default function ClusteringForm() {
  const [data, setData] = useState<PostData>(InitialValuePostData);
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

  return (
    <>
      <FormContainer>
        <form>
          <InputFileType data={data} setData={setData} />
          <TextFieldFasta data={data} setData={setData} />
          <InputFileFasta data={data} setData={setData} />
          <Grid container spacing={2} marginTop={0}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
              <SelectComponent
                items={encodings}
                title="Encoding Type"
                value={selectedEncoding}
                handleChange={handleChangeSelectedEncoding}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
              <SelectComponent
                items={properties}
                title="Property"
                value={selectedProperty}
                handleChange={handleChangeSelectedProperty}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
              <SelectComponent
                items={algorithms}
                title="Algorithm"
                value={selectedAlgorithm}
                handleChange={handleChangeSelectedAlgorithm}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
              <SelectComponent
                items={linkages}
                title="Linkage"
                value={selectedLinkage}
                handleChange={handleChangeSelectedLinkage}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
              <SelectComponent
                items={affinities}
                title="Affinity"
                value={selectedAffinity}
                handleChange={handleChangeSelectedAffinity}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
              <TextFieldComponent
                title="K-Value"
                value={kvalue}
                handleChange={handleChangeKValue}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
              <TextFieldComponent
                title="Xi"
                value={xi}
                handleChange={handleChangeXi}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
              <TextFieldComponent
                title="Min Samples"
                value={minSamples}
                handleChange={handleChangeMinSamples}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={2}>
              <TextFieldComponent
                title="Min Cluster Size"
                value={minClusterSize}
                handleChange={handleChangeMinClusterSize}
              />
            </Grid>
          </Grid>
          <ButtonRun data={data} />
        </form>
      </FormContainer>
    </>
  );
}
