import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
} from "@mui/material";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DependecyWheel from "../components/DependecyWheel";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import BackdropComponent from "../components/backdrop_component";

interface ILevels {
  name: number;
  value: number;
}

interface IParents {
  name: string;
  value: number;
}

function Promiscuous() {
  useLoadingComponent();
  useHandleSection({ section: "promiscuous" });

  const [optionsValue, setOptionsValue] = useState<string>("level");
  const [levelsData, setLevelsData] = useState<ILevels[]>([]);
  const [parentsData, setParentsData] = useState<IParents[]>([]);
  const [selectValue, setSelectValue] = useState<string>("");
  const [dependencyWheelData, setDependencyWheelData] = useState<any>(null);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const getParentsLevels = async () => {
    try {
      const response = await axios.get("/api/get_parents_levels/");
      const { levels, parents } = response.data;
      setLevelsData(levels);
      setParentsData(parents);
      if (levels.length > 0 && parents.length > 0) {
        if (optionsValue === "parent") setSelectValue(parents[0].value);
        if (optionsValue === "level") setSelectValue(levels[0].value);
      }
    } catch (error) {
      setLevelsData([]);
      setParentsData([]);
      setSelectValue("");
    }
  };

  useEffect(() => {
    getParentsLevels();
  }, []);

  const handleChangeOptionsValue = (e: ChangeEvent<HTMLInputElement>) => {
    setOptionsValue(e.target.value);
    if (levelsData.length > 0 && parentsData.length > 0) {
      if (e.target.value === "parent")
        setSelectValue(levelsData[0].value.toString());
      if (e.target.value === "level")
        setSelectValue(parentsData[0].value.toString());
    }
  };

  const getChordDiagram = async () => {
    setDependencyWheelData(null);
    setOpenBackdrop(true);
    try {
      const response = await axios.get(
        `/api/get_chord_diagram/${optionsValue}/${selectValue}`
      );
      const { data } = response.data;
      setDependencyWheelData(data);
    } catch (error) {
      setDependencyWheelData(null);
    }
    setOpenBackdrop(false);
  };

  useEffect(() => {
    if (levelsData.length > 0 && parentsData.length > 0 && selectValue !== "") {
      getChordDiagram();
    }
  }, [levelsData, parentsData, optionsValue, selectValue]);

  return (
    <Layout>
      <>
        <BackdropComponent open={openBackdrop} />

        <SectionTitle title="Promiscuous" description="Analysis of promiscuity (characteristic of a peptide to perform more than one activity) according to the level of activity." />

        <Grid item marginTop={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              boxShadow: 4,
            }}
          >
            <Grid container spacing={2} marginBottom={3}>
              <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                <FormControl fullWidth>
                  <FormLabel id="options-label">Options</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="options-label"
                    value={optionsValue}
                    onChange={handleChangeOptionsValue}
                  >
                    <FormControlLabel
                      value="level"
                      control={<Radio />}
                      label="Level"
                    />
                    <FormControlLabel
                      value="parent"
                      control={<Radio />}
                      label="Parent"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {levelsData.length > 0 && parentsData.length > 0 && (
                <Grid item xs={12} sm={12} md={4} lg={3} xl={2} marginTop={1}>
                  <FormControl fullWidth>
                    <InputLabel id="options-select-label">
                      {optionsValue === "level" && "Levels"}{" "}
                      {optionsValue === "parent" && "Activities"}
                    </InputLabel>
                    <Select
                      labelId="options-select-label"
                      label={
                        optionsValue === "level"
                          ? "Levels"
                          : optionsValue === "parent" && "Activities"
                      }
                      value={selectValue}
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      {optionsValue === "parent" &&
                        parentsData.map((parent: IParents) => (
                          <MenuItem key={parent.value} value={parent.value}>
                            {parent.name}
                          </MenuItem>
                        ))}
                      {optionsValue === "level" &&
                        levelsData.map((level: ILevels) => (
                          <MenuItem key={level.value} value={level.value}>
                            {level.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>

            {openBackdrop ? (
              <Skeleton
                variant="circular"
                width={380}
                height={380}
                sx={{ margin: "auto" }}
              />
            ) : (
              dependencyWheelData && (
                <DependecyWheel data={dependencyWheelData} />
              )
            )}
          </Paper>
        </Grid>
      </>
    </Layout>
  );
}

export default Promiscuous;
