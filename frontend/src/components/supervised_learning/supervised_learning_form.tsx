import { Grid } from "@mui/material";
import { useState } from "react";
import { useSelectAlgorithmSupervisedLearning } from "../../hooks/useSelectAlgorithmSupervisedLearning";
import { useSelectEncoding } from "../../hooks/useSelectEncoding";
import { useSelectProperty } from "../../hooks/useSelectProperty";
import { useTaskType } from "../../hooks/useTaskType";
import { useTestSize } from "../../hooks/useTestSize";
import { useTextFieldKValue } from "../../hooks/useTextFieldKValue";
import { InitialValuePostData } from "../../utils/initial_values";
import { PostData } from "../../utils/interfaces";
import ButtonRunCsv from "../form/button_run_csv";
import FormContainer from "../form/form_container";
import InputFileCSV from "../form/input_file_csv";
import SelectComponent from "../form/select_component";
import TextFieldComponent from "../form/text_field_component";

export default function SupervisedLearningForm() {
  const [data, setData] = useState<PostData>(InitialValuePostData);

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
    selectedAlgorithm,
    algorithms_supervised_learning,
    handleChangeSelectedAlgorithm,
  } = useSelectAlgorithmSupervisedLearning();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={4}>
          <FormContainer>
            <form>
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
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SelectComponent
                    title="Property"
                    items={properties}
                    handleChange={handleChangeSelectedProperty}
                    value={selectedProperty}
                  />
                </Grid>
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
                    items={algorithms_supervised_learning}
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
              </Grid>
              <ButtonRunCsv data={data} />
            </form>
          </FormContainer>
        </Grid>
      </Grid>
    </>
  );
}
