import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { InitialValuePostData } from "../../utils/initial_values";
import { PostData } from "../../utils/interfaces";
import ButtonRun from "../form/button_run";
import FormContainer from "../form/form_container";
import InputFileFasta from "../form/input_file_fasta";
import InputFileType from "../form/input_file_type";
import TextFieldFasta from "../form/text_field_fasta";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import { parserFormDataWithoutOptions } from "../../helpers/parserFormData";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const markdownText = `
  + **Input**: 
    + Between 1 and 200 amino acid sequences with fasta format.
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

function ActivityPredictionForm() {
  const [data, setData] = useState<PostData>(InitialValuePostData);
  const [activitiesValue, setActivitiesValue] = useState<any>([]);
  const [allActivities, setAllActivities] = useState<boolean>(true);
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    try {
      const response = await axios.get("/api/activity_list");
      setActivities(response.data.result);
    } catch (error) {
      setActivities([]);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let postData = {};
    postData = parserFormDataWithoutOptions(data);
    if (allActivities) {
      postData = { ...postData, activities: activities };
    } else {
      const filterActivities = activitiesValue.map(
        (activity: any) => activity.value
      );
      postData = {
        ...postData,
        activities: filterActivities,
      };
    }
    console.log(postData);
  };

  return (
    <FormContainer markdownText={markdownText}>
      <form onSubmit={handleSubmit}>
        <InputFileType data={data} setData={setData} />
        <TextFieldFasta
          data={data}
          setData={setData}
          placeholder={placeholder}
        />
        <InputFileFasta data={data} setData={setData} />

        <FormControlLabel
          control={
            <Switch
              checked={allActivities}
              onChange={(e) => setAllActivities(e.target.checked)}
            />
          }
          label={allActivities ? "Select Activities" : "All Activities"}
        />

        {allActivities === false && (
          <Autocomplete
            multiple
            id="activities-autocomplete"
            value={activitiesValue}
            onChange={(event, newValue) => {
              setActivitiesValue([...newValue]);
            }}
            options={activities}
            getOptionLabel={(activity) => activity.label}
            disableCloseOnSelect
            renderOption={(props, activity, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {activity.label}
              </li>
            )}
            sx={{ maxWidth: 400, marginTop: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Activities"
                placeholder="Activities"
              />
            )}
          />
        )}

        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: {
                xl: "12rem",
                lg: "12rem",
                md: "12rem",
                sm: "12rem",
                xs: "100%",
              },
              backgroundColor: "#2962ff",
              ":hover": { backgroundColor: "#3A6CF6" },
            }}
            size="medium"
            disabled={
              (data.fastaText === "" && data.fastaFile === null) ||
              (allActivities === false && activitiesValue.length === 0 && true)
            }
          >
            run
          </Button>
        </FormControl>
      </form>
    </FormContainer>
  );
}

export default ActivityPredictionForm;
