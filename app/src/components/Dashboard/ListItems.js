import { useState } from "react";

import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";

import AppsIcon from "@mui/icons-material/Apps";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TransformIcon from "@mui/icons-material/Transform";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

import { FaDatabase } from "@react-icons/all-files/fa/FaDatabase" 

const ListItems = ({ section, setSection }) => {
  const [expandItemCharacterizations, setExpandItemCharacterizations] =
    useState(false);
  const [expandItemAlignments, setExpandItemAlignments] = useState(false);

  return (
    <List component="nav">
      <ListSubheader>Dashboard</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "home" ? "#2962ff" : "#fff",
            color: section === "home" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => setSection("home")}
        >
          <HomeIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography sx={{ fontWeight: section === "home" && "bold" }}>
              Home
            </Typography>
          </ListItemText>
        </ListItemButton>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "database" ? "#2962ff" : "#fff",
            color: section === "database" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => setSection("database")}
        >
          <FaDatabase sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography sx={{ fontWeight: section === "database" && "bold" }}>
              Database
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Tools</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{ pl: 2 }}
          onClick={() => setExpandItemAlignments(!expandItemAlignments)}
        >
          <ListItemIcon>
            <FormatAlignCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Alignment" />
          {expandItemAlignments ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={expandItemAlignments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              disableRipple
              sx={{
                pl: 4,
                margin: "6px 14px",
                borderRadius: "8px",
                backgroundColor: section === "blast" ? "#2962ff" : "#fff",
                color: section === "blast" ? "#fff" : "#000",
                "&:hover": {
                  background: "#2962ff",
                  color: "#fff",
                },
              }}
              onClick={() => setSection("blast")}
            >
              <DoubleArrowIcon />
              <ListItemText sx={{ marginLeft: 2 }}>
                <Typography sx={{ fontWeight: section === "blast" && "bold" }}>
                  Blast
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton
              disableRipple
              sx={{
                pl: 4,
                margin: "6px 14px",
                borderRadius: "8px",
                backgroundColor: section === "msa" ? "#2962ff" : "#fff",
                color: section === "msa" ? "#fff" : "#000",
                "&:hover": {
                  background: "#2962ff",
                  color: "#fff",
                },
              }}
              onClick={() => setSection("msa")}
            >
              <DoubleArrowIcon />
              <ListItemText sx={{ marginLeft: 2 }}>
                <Typography sx={{ fontWeight: section === "msa" && "bold" }}>
                  MSA
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          disableRipple
          sx={{ pl: 2 }}
          onClick={() =>
            setExpandItemCharacterizations(!expandItemCharacterizations)
          }
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Characterization" />
          {expandItemCharacterizations ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={expandItemCharacterizations} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              disableRipple
              sx={{
                pl: 4,
                margin: "6px 14px",
                borderRadius: "8px",
                backgroundColor:
                  section === "phisicochemical" ? "#2962ff" : "#fff",
                color: section === "phisicochemical" ? "#fff" : "#000",
                "&:hover": {
                  background: "#2962ff",
                  color: "#fff",
                },
              }}
              onClick={() => setSection("phisicochemical")}
            >
              <DoubleArrowIcon />
              <ListItemText sx={{ marginLeft: 2 }}>
                <Typography
                  sx={{ fontWeight: section === "phisicochemical" && "bold" }}
                >
                  Physicochemical
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton
              disableRipple
              sx={{
                pl: 4,
                margin: "6px 14px",
                borderRadius: "8px",
                backgroundColor:
                  section === "gene_ontology" ? "#2962ff" : "#fff",
                color: section === "gene_ontology" ? "#fff" : "#000",
                "&:hover": {
                  background: "#2962ff",
                  color: "#fff",
                },
              }}
              onClick={() => setSection("gene_ontology")}
            >
              <DoubleArrowIcon />
              <ListItemText sx={{ marginLeft: 2 }}>
                <Typography
                  sx={{ fontWeight: section === "gene_ontology" && "bold" }}
                >
                  Gene Ontology
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton
              disableRipple
              sx={{
                pl: 4,
                margin: "6px 14px",
                borderRadius: "8px",
                backgroundColor: section === "pfam" ? "#2962ff" : "#fff",
                color: section === "pfam" ? "#fff" : "#000",
                "&:hover": {
                  background: "#2962ff",
                  color: "#fff",
                },
              }}
              onClick={() => setSection("pfam")}
            >
              <DoubleArrowIcon />
              <ListItemText sx={{ marginLeft: 2 }}>
                <Typography sx={{ fontWeight: section === "pfam" && "bold" }}>
                  Pfam
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton
              disableRipple
              sx={{
                pl: 4,
                margin: "6px 14px",
                borderRadius: "8px",
                backgroundColor: section === "frequency" ? "#2962ff" : "#fff",
                color: section === "frequency" ? "#fff" : "#000",
                "&:hover": {
                  background: "#2962ff",
                  color: "#fff",
                },
              }}
              onClick={() => setSection("frequency")}
            >
              <DoubleArrowIcon />
              <ListItemText sx={{ marginLeft: 2 }}>
                <Typography
                  sx={{ fontWeight: section === "frequency" && "bold" }}
                >
                  Frequency
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "codifications" ? "#2962ff" : "#fff",
            color: section === "codifications" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => setSection("codifications")}
        >
          <TransformIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3.4 }}>
            <Typography
              sx={{ fontWeight: section === "codifications" && "bold" }}
            >
              Encoding
            </Typography>
          </ListItemText>
        </ListItemButton>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "clustering" ? "#2962ff" : "#fff",
            color: section === "clustering" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => setSection("clustering")}
        >
          <WorkspacesIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3.4 }}>
            <Typography sx={{ fontWeight: section === "clustering" && "bold" }}>
              Clustering
            </Typography>
          </ListItemText>
        </ListItemButton>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor:
              section === "supervised-learning" ? "#2962ff" : "#fff",
            color: section === "supervised-learning" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => setSection("supervised-learning")}
        >
          <PsychologyIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3.4 }}>
            <Typography
              sx={{ fontWeight: section === "supervised-learning" && "bold" }}
            >
              Supervised Learning
            </Typography>
          </ListItemText>
        </ListItemButton>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "advanced-search" ? "#2962ff" : "#fff",
            color: section === "advanced-search" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => setSection("advanced-search")}
        >
          <ManageSearchIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3.4 }}>
            <Typography
              sx={{ fontWeight: section === "advanced-search" && "bold" }}
            >
              Advanced Search
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </List>
  );
};

export default ListItems;
