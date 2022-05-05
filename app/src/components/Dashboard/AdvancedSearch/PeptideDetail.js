import {
  Typography,
  Grid,
  Box,
  Button,
  FilledInput,
  InputAdornment,
  IconButton,
  Tooltip,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Badge,
} from "@mui/material";
import { useCallback, useEffect, useState, forwardRef, useRef } from "react";
import { ProSeqViewer } from "proseqviewer/dist";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";
import DataTable from "../DataTable";
import CircularLoading from "../CircularLoading";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import RemoveIcon from "@mui/icons-material/Remove";
import pv from "bio-pv";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ComponentPrint = forwardRef((props, ref) => (
  <div id="psv" ref={ref}></div>
));

export default function PeptideDetail({
  peptideID,
  setPeptideID,
  setSeverity,
  setMessage,
  setOpenSnackbar,
}) {
  const componentRef = useRef();
  const [sequence, setSequence] = useStateIfMounted("");
  const [dataInfo, setDataInfo] = useStateIfMounted([]);
  const [dataGOColumns, setDataGOColumns] = useStateIfMounted([]);
  const [dataGOData, setDataGOData] = useStateIfMounted([]);
  const [pfamColumns, setPfamColumns] = useStateIfMounted([]);
  const [pfamData, setPfamData] = useStateIfMounted([]);
  const [activitiesColumns, setActivitiesColumns] = useStateIfMounted([]);
  const [activitiesData, setActivitiesData] = useStateIfMounted([]);
  const [taxonomiesData, setTaxonomiesData] = useStateIfMounted([]);
  const [taxonomiesColumns, setTaxonomiesColumns] = useStateIfMounted([]);
  const [databasesColumns, setDatabasesColumns] = useStateIfMounted([]);
  const [databasesData, setDatabasesData] = useStateIfMounted([]);
  const [loading, setLoading] = useStateIfMounted(true);
  const [path, setPath] = useStateIfMounted("");
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const getInfoFromPeptide = useCallback(async () => {
    try {
      const res = await axios.get(`/api/get_info_from_peptide/${peptideID}`);
      setSequence(res.data.result[0].sequence);
      setDataInfo(res.data.result);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const getGOFromPeptide = useCallback(async () => {
    try {
      const res = await axios.get(`/api/get_go_from_peptide/${peptideID}`);
      const new_data = [];
      for (let i = 0; i < res.data.result.data.length; i++) {
        const id_go = res.data.result.data[i][0]
          ? res.data.result.data[i][0]
          : "";
        const new_array = [
          ...res.data.result.data[i],
          <Button>
            <a
              href={`http://amigo.geneontology.org/amigo/term/${id_go}`}
              target="_blank"
              rel="noreferrer"
            >
              <VisibilityIcon />
            </a>
          </Button>,
        ];
        new_data.push(new_array);
      }

      const new_columns = [...res.data.result.columns, "Options"];
      setDataGOColumns(new_columns);
      setDataGOData(new_data);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const getPfamFromPeptide = useCallback(async () => {
    try {
      const res = await axios.get(`/api/get_pfam_from_peptide/${peptideID}`);
      const new_data = []
      for (let i = 0; i < res.data.result.data.length; i++) {

        const accession = res.data.result.data[i][0] ? res.data.result.data[i][0] : ""
        const new_array = [
          ...res.data.result.data[i],
          <Button>
            <a
              href={`http://pfam.xfam.org/family/${accession}`}
              target="_blank"
              rel="noreferrer"
            >
              <VisibilityIcon />
            </a>
          </Button>,
        ];
        new_data.push(new_array)
      }

      const new_columns = [...res.data.result.columns, "Options"];

      setPfamColumns(new_columns);
      setPfamData(new_data);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const getActivitiesFromPeptide = useCallback(async () => {
    try {
      const res = await axios.get(`/api/get_act_from_peptide/${peptideID}`);

      let new_data = [];
      if (res.data.result.data.length > 0) {
        for (let i = 0; i < res.data.result.data.length; i++) {
          let parcial_data = [
            res.data.result.data[i][0],
            res.data.result.data[i][1] ? (
              <CheckBoxIcon color="succes" />
            ) : (
              <CancelIcon color="error" />
            ),
          ];
          new_data.push(parcial_data);
        }
      }

      setActivitiesColumns(res.data.result.columns);
      setActivitiesData(new_data);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const getTaxonomiesFromPeptide = useCallback(async () => {
    try {
      const res = await axios.get(`/api/get_tax_from_peptide/${peptideID}`);
      setTaxonomiesData(res.data.result.data);
      setTaxonomiesColumns(res.data.result.columns);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const getDatabasesFromPeptide = useCallback(async () => {
    try {
      const res = await axios.get(`/api/get_db_from_peptide/${peptideID}`);
      let new_data = [];
      if (res.data.result.data.length > 0) {
        for (let i = 0; i < res.data.result.data.length; i++) {
          let parcial_data = [
            res.data.result.data[i][0],
            res.data.result.data[i][1] === null ? (
              <RemoveIcon />
            ) : (
              res.data.result.data[i][1]
            ),
          ];
          new_data.push(parcial_data);
        }
      }

      setDatabasesColumns(res.data.result.columns);
      setDatabasesData(new_data);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const getStructureFromPeptide = useCallback(async () => {
    try {
      const res = await axios.get(`/api/get_structure/${peptideID}`);
      if (res.data.status === "success" && path === "") {
        setPath(res.data.path);

        const res_pdb = await axios.get(res.data.path);

        const options = {
          width: 700,
          height: 700,
          antialias: true,
          quality: "medium",
        };

        const structure = pv.io.pdb(res_pdb.data);
        const residues_equal = structure.select({
          rindices: res.data.equal_res,
        });
        const residues_similar = structure.select({
          rindices: res.data.similar_res,
        });
        const residues_different = structure.select({
          rindices: res.data.different_res,
        });
        const viewer = pv.Viewer(
          document.getElementById("content-pdb", options)
        );
        //viewer.cartoon("protein", structure);
        const geom_equal = viewer.cartoon("protein", residues_equal);
        geom_equal.colorBy(pv.color.uniform("darkblue"));
        const geom_similar = viewer.cartoon("protein", residues_similar);
        geom_similar.colorBy(pv.color.uniform("lightblue"));
        const geom_different = viewer.cartoon("protein", residues_different);
        geom_different.colorBy(pv.color.uniform("white"));

        // viewer.centerOn(residues_equal);
        // viewer.centerOn(residues_similar)
        // viewer.centerOn(residues_different)
        viewer.centerOn(structure);

        const options_msa = {
          sequenceColor: "clustal",
        };

        const psv = new ProSeqViewer("psv");
        psv.draw({ sequences: res.data.alignment, options: options_msa });
      }
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const handleCopied = () => {
    setCopied(true);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  useEffect(() => {
    getStructureFromPeptide();
    getInfoFromPeptide();
    getGOFromPeptide();
    getPfamFromPeptide();
    getActivitiesFromPeptide();
    getTaxonomiesFromPeptide();
    getDatabasesFromPeptide();
    setLoading(false);
  }, [
    getStructureFromPeptide,
    getInfoFromPeptide,
    getGOFromPeptide,
    getPfamFromPeptide,
    getActivitiesFromPeptide,
    getTaxonomiesFromPeptide,
    getDatabasesFromPeptide,
  ]);

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Peptide {peptideID}
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#2962ff",
                  ":hover": { backgroundColor: "#2962ff" },
                }}
                onClick={() => setPeptideID(0)}
              >
                <KeyboardBackspaceIcon sx={{ fontSize: 30 }} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Sequence
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FilledInput
              id="filled-multiline-static"
              multiline
              rows={5}
              defaultValue={sequence}
              variant="filled"
              fullWidth
              endAdornment={
                <CopyToClipboard text={sequence}>
                  <InputAdornment
                    position="end"
                    sx={{ display: "flex", alignItems: "end", marginBottom: 8 }}
                  >
                    <Tooltip
                      title={showTooltip ? "Copied sequence" : ""}
                      onClick={handleCopied}
                      open={showTooltip}
                    >
                      <IconButton edge="end">
                        <ContentCopyIcon
                          color={copied ? "primary" : "inherit"}
                        />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                </CopyToClipboard>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              PDB Structure{" "}
              {path === "" && (
                <Typography
                  variant="subtitle1"
                  sx={{ marginLeft: 1, fontWeight: "bold" }}
                >
                  (Structure not found)
                </Typography>
              )}
            </Typography>
          </Grid>
          {path !== "" && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
                <div id="content-pdb" style={{ width: "100%" }}></div>
              </Grid>
            </>
          )}
          {path !== "" && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Multiple Sequence Alignment
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ComponentPrint ref={componentRef} />
                </Paper>
              </Grid>
            </>
          )}
          {dataInfo.length === 1 && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Physicochemical Properties
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={7} xl={6}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {dataInfo[0].length && <TableCell>Length</TableCell>}
                        {dataInfo[0].molecular_weight && (
                          <TableCell>Molecular Weight</TableCell>
                        )}
                        {dataInfo[0].isoelectric_point && (
                          <TableCell>Isoelectric Point</TableCell>
                        )}
                        {dataInfo[0].charge && <TableCell>Charge</TableCell>}
                        {dataInfo[0].charge_density && (
                          <TableCell>Charge Density</TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {dataInfo[0].length && (
                          <TableCell>{dataInfo[0].length}</TableCell>
                        )}
                        {dataInfo[0].length && (
                          <TableCell>{dataInfo[0].molecular_weight}</TableCell>
                        )}
                        {dataInfo[0].length && (
                          <TableCell>{dataInfo[0].isoelectric_point}</TableCell>
                        )}
                        {dataInfo[0].length && (
                          <TableCell>{dataInfo[0].charge}</TableCell>
                        )}
                        {dataInfo[0].length && (
                          <TableCell>{dataInfo[0].charge_density}</TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </>
          )}
          {dataGOData.length > 0 && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Gene Ontology
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DataTable
                  title="Gene Ontology"
                  columns={dataGOColumns}
                  data={dataGOData}
                />
              </Grid>
            </>
          )}
          {pfamData.length > 0 && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Pfam
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DataTable title="Pfam" columns={pfamColumns} data={pfamData} />
              </Grid>
            </>
          )}
          {activitiesData.length > 0 && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Activity
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={6} xl={5}>
                <DataTable
                  title="Activitiy"
                  columns={activitiesColumns}
                  data={activitiesData}
                />
              </Grid>
            </>
          )}
          {taxonomiesData.length > 0 && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Taxonomy
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={6} xl={5}>
                <DataTable
                  title="Taxonomy"
                  columns={taxonomiesColumns}
                  data={taxonomiesData}
                />
              </Grid>
            </>
          )}
          {databasesData.length > 0 && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Databases
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={6} xl={5}>
                <DataTable
                  title="Database"
                  columns={databasesColumns}
                  data={databasesData}
                />
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
}
