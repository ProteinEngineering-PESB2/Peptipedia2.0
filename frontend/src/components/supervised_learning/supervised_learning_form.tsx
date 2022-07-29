import { Grid } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { parserFormDataWithOptionsForCSV } from "../../helpers/parserFormData";
import { useSelectAlgorithmSupervisedLearning } from "../../hooks/useSelectAlgorithmSupervisedLearning";
import { useSelectEncoding } from "../../hooks/useSelectEncoding";
import { useSelectLinearClustering } from "../../hooks/useSelectLinearClustering";
import { useSelectProperty } from "../../hooks/useSelectProperty";
import { useStandarization } from "../../hooks/useStandarization";
import { useTaskType } from "../../hooks/useTaskType";
import { useTestSize } from "../../hooks/useTestSize";
import { useTextFieldKValue } from "../../hooks/useTextFieldKValue";
import { requestPost } from "../../services/api";
import { InitialValuePostData } from "../../utils/initial_values";
import {
  IDataClassificationSupervisedLearning,
  IDataRegressionSupervisedLearning,
  PostData,
} from "../../utils/interfaces";
import BackdropComponent from "../backdrop_component";
import ButtonRunCsv from "../form/button_run_csv";
import FormContainer from "../form/form_container";
import InputFileCSV from "../form/input_file_csv";
import SelectComponent from "../form/select_component";
import TextFieldComponent from "../form/text_field_component";

interface Props {
  setResultClassification: Dispatch<
    SetStateAction<IDataClassificationSupervisedLearning | null>
  >;
  setResultRegression: Dispatch<
    SetStateAction<IDataRegressionSupervisedLearning | null>
  >;
  setTaskType: Dispatch<SetStateAction<string>>;
  setEncoding: Dispatch<SetStateAction<string>>;
  setProperty: Dispatch<SetStateAction<string>>;
}

const markdownText = `
  + **Input**: 
    + CSV File.
    + **Columns**: id - sequence - target.
    + 200 or more amino acid sequences.
    + Sequences with maxium length 150.
`;

export default function SupervisedLearningForm({
  setResultClassification,
  setResultRegression,
  setTaskType,
  setEncoding,
  setProperty,
}: Props) {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const { encodings, handleChangeSelectedEncoding, selectedEncoding } =
    useSelectEncoding();
  const { properties, selectedProperty, handleChangeSelectedProperty } =
    useSelectProperty();
  const { kvalue, handleChangeKValue } = useTextFieldKValue();
  const { selectedTaskType, handleChangeSelectedTaskType, taskTypes } =
    useTaskType();
  const { selectedTestSize, handleChangeSelectedTestSize, test_size } =
    useTestSize();
  const {
    kernelsSupervisedLearning,
    handleChangeSelectedKernel,
    selectedKernel,
  } = useSelectLinearClustering();
  const {
    handleChangeSelectedStandarization,
    selectedStandarization,
    standarizations,
  } = useStandarization();
  const {
    selectedAlgorithm,
    algorithms_classification_supervised_learning,
    algorithms_regression_supervised_learning,
    handleChangeSelectedAlgorithm,
  } = useSelectAlgorithmSupervisedLearning({ taskType: selectedTaskType });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setOpenBackdrop(true);
    setResultClassification(null);
    setResultRegression(null);

    const options = {
      encoding: selectedEncoding,
      selected_property: selectedProperty,
      task: selectedTaskType,
      algorithm: selectedAlgorithm,
      validation: parseInt(kvalue),
      test_size: parseFloat(selectedTestSize),
      kernel: selectedKernel,
      standardization: selectedStandarization,
    };

    const postData = parserFormDataWithOptionsForCSV(data, options);

    try {
      const { data } = await requestPost({
        postData,
        url: "/api/supervised_learning",
      });

      if (data.status === "error") {
        toast.error(data.description);
      } else {
        const { job_path, result } = data;

        if (selectedTaskType === "classification") {
          setTaskType("classification");
          setResultClassification({ job_path, result });
        }
        if (selectedTaskType === "regression") {
          setTaskType("regression");
          setResultRegression({ job_path, result });
        }
      }

      setEncoding(selectedEncoding);
      setProperty(selectedProperty);
      setOpenBackdrop(false);
    } catch (error) {
      toast.error("Server error");
      setResultClassification(null);
      setResultRegression(null);
      setOpenBackdrop(false);
    }
  };

  return (
    <>
      <BackdropComponent open={openBackdrop} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9} lg={6} xl={4}>
          <FormContainer markdownText={markdownText}>
            <form onSubmit={handleSubmit}>
              <InputFileCSV data={data} setData={setData} />
              <Grid container spacing={2} marginTop={1}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SelectComponent
                    title="Encoding Type"
                    items={encodings}
                    handleChange={handleChangeSelectedEncoding}
                    value={selectedEncoding}
                  />
                </Grid>
                {selectedEncoding !== "one_hot_encoding" && (
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <SelectComponent
                      title="Property"
                      items={properties}
                      handleChange={handleChangeSelectedProperty}
                      value={selectedProperty}
                    />
                  </Grid>
                )}
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <TextFieldComponent
                    title="Number of folds cross validation"
                    value={kvalue}
                    handleChange={handleChangeKValue}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SelectComponent
                    title="Task Type"
                    items={taskTypes}
                    handleChange={handleChangeSelectedTaskType}
                    value={selectedTaskType}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SelectComponent
                    title="Algorithm Type"
                    items={
                      selectedTaskType === "classification"
                        ? algorithms_classification_supervised_learning
                        : algorithms_regression_supervised_learning
                    }
                    handleChange={handleChangeSelectedAlgorithm}
                    value={selectedAlgorithm}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SelectComponent
                    title="Test Size"
                    items={test_size}
                    handleChange={handleChangeSelectedTestSize}
                    value={selectedTestSize}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SelectComponent
                    title="Apply PCA"
                    items={kernelsSupervisedLearning}
                    handleChange={handleChangeSelectedKernel}
                    value={selectedKernel}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SelectComponent
                    title="standardization"
                    items={standarizations}
                    handleChange={handleChangeSelectedStandarization}
                    value={selectedStandarization}
                  />
                </Grid>
              </Grid>
              <ButtonRunCsv data={data} />
            </form>
          </FormContainer>
        </Grid>
      </Grid>
    </>
  );
}
