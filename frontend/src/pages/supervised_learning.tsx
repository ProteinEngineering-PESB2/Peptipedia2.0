import { Box, Grid, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import BackdropComponent from "../components/backdrop_component";
import DataTable from "../components/datatable";
import ButtonRun from "../components/form/button_run";
import FormContainer from "../components/form/form_container";
import InputFileFasta from "../components/form/input_file_fasta";
import InputFileType from "../components/form/input_file_type";
import TextFieldFasta from "../components/form/text_field_fasta";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import SupervisedLearningContentClassification from "../components/supervised_learning/supervised_learning_content_classification";
import SupervisedLearningContentRegression from "../components/supervised_learning/supervised_learning_content_regression";
import SupervisedLearningForm from "../components/supervised_learning/supervised_learning_form";
import { parserFormDataWithOptions } from "../helpers/parserFormData";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { requestPost } from "../services/api";
import {
  InitialValuePostData,
  InitialValueTable,
} from "../utils/initial_values";
import {
  IDataClassificationSupervisedLearning,
  IDataRegressionSupervisedLearning,
  ITable,
  PostData,
} from "../utils/interfaces";

export default function SupervisedLearning() {
  const [tableNewModel, setTableNewModel] = useState<ITable>(InitialValueTable);
  const [taskType, setTaskType] = useState<string>("");
  const [encoding, setEncoding] = useState<string>("");
  const [property, setProperty] = useState<string>("");
  const [openBackdropNewModel, setOpenBackdropNewModel] =
    useState<boolean>(false);
  const [dataNewModel, setDataNewModel] =
    useState<PostData>(InitialValuePostData);
  const [resultClassification, setResultClassification] =
    useState<IDataClassificationSupervisedLearning | null>(null);
  const [resultRegression, setResultRegression] =
    useState<IDataRegressionSupervisedLearning | null>(null);

  useHandleSection({ section: "supervised-learning" });
  useLoadingComponent();

  const handleSubmitNewModel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenBackdropNewModel(true);

    const options = {
      job_path:
        taskType === "classification"
          ? resultClassification?.job_path
          : resultRegression?.job_path,
      encoding: encoding,
      selected_property: property,
    };

    const postData = parserFormDataWithOptions(dataNewModel, options);

    try {
      const { data } = await requestPost({ postData, url: "/api/use_model/" });

      if (data.status === "error") {
        toast.error(data.description);
      } else {
        setTableNewModel({
          columns: data.result.columns,
          data: data.result.data,
        });
      }

      setOpenBackdropNewModel(false);
    } catch (error) {
      toast.error("Server error");
      setOpenBackdropNewModel(false);
    }
  };

  return (
    <Layout>
      <>
        <BackdropComponent open={openBackdropNewModel} />
        <SectionTitle
          title="Supervised Learning"
          description="It employs supervised learning algorithms on sets of input sequences. Allows training, testing and prediction using new data sets."
        />

        <SupervisedLearningForm
          setResultClassification={setResultClassification}
          setResultRegression={setResultRegression}
          setTaskType={setTaskType}
          setEncoding={setEncoding}
          setProperty={setProperty}
        />

        {resultClassification && (
          <SupervisedLearningContentClassification
            result={resultClassification}
          />
        )}
        {resultRegression && (
          <SupervisedLearningContentRegression result={resultRegression} />
        )}

        {/* {taskType !== "" && (
          <Box marginTop={3}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold" }}
              sx={{
                textAlign: {
                  xs: "center",
                  sm: "start",
                  md: "start",
                  lg: "start",
                  xl: "start",
                },
              }}
            >
              Use Model with New Data
            </Typography>
            <FormContainer>
              <form onSubmit={handleSubmitNewModel}>
                <InputFileType data={dataNewModel} setData={setDataNewModel} />
                <TextFieldFasta data={dataNewModel} setData={setDataNewModel} />
                <InputFileFasta data={dataNewModel} setData={setDataNewModel} />
                <ButtonRun data={dataNewModel} />
              </form>
            </FormContainer>
            {tableNewModel.data.length > 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box boxShadow={4} marginTop={3}>
                    <DataTable
                      table={tableNewModel}
                      title="Model with New Data"
                    />
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        )} */}
      </>
    </Layout>
  );
}
