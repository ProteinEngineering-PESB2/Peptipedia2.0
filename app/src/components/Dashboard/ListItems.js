import { useState } from "react";

import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import AppsIcon from "@mui/icons-material/Apps";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import TransformIcon from "@mui/icons-material/Transform";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

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
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: section === "home" ? "#2962ff" : "#fff",
            color: section === "home" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff"
            },
          }}
          onClick={() => setSection("home")}
        >
          <ListItemIcon>
            <HomeIcon
              sx={{
                color: section === "home" && "#fff",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </List>
      <ListSubheader>Tools</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
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
                  color: "#fff"
                },
              }}
              onClick={() => setSection("blast")}
            >
              <ListItemIcon>
                <DoubleArrowIcon
                  sx={{ color: section === "blast" && "#fff" }}
                />
              </ListItemIcon>
              <ListItemText primary="Blast" sx={{ marginLeft: -1.8 }} />
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
                },
              }}
              onClick={() => setSection("msa")}
            >
              <ListItemIcon>
                <DoubleArrowIcon sx={{ color: section === "msa" && "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="MSA" sx={{ marginLeft: -1.8 }} />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
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
                },
              }}
              onClick={() => setSection("phisicochemical")}
            >
              <ListItemIcon>
                <DoubleArrowIcon
                  sx={{
                    color: section === "phisicochemical" && "#fff",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Physicochemical"
                sx={{ marginLeft: -1.8 }}
              />
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
                },
              }}
              onClick={() => setSection("gene_ontology")}
            >
              <ListItemIcon>
                <DoubleArrowIcon
                  sx={{
                    color: section === "gene_ontology" && "#fff",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Gene Ontology" sx={{ marginLeft: -1.8 }} />
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
                },
              }}
              onClick={() => setSection("pfam")}
            >
              <ListItemIcon>
                <DoubleArrowIcon
                  sx={{
                    color: section === "pfam" && "#fff",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Pfam" sx={{ marginLeft: -1.8 }} />
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
                },
              }}
              onClick={() => setSection("frequency")}
            >
              <ListItemIcon>
                <DoubleArrowIcon
                  sx={{
                    color: section === "frequency" && "#fff",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Frequency" sx={{ marginLeft: -1.8 }} />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: section === "codifications" ? "#2962ff" : "#fff",
            color: section === "codifications" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
            },
          }}
          onClick={() => setSection("codifications")}
        >
          <ListItemIcon>
            <TransformIcon
              sx={{
                color: section === "codifications" && "#fff",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Encoding" />
        </ListItemButton>
        <ListItemButton
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: section === "clustering" ? "#2962ff" : "#fff",
            color: section === "clustering" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
            },
          }}
          onClick={() => setSection("clustering")}
        >
          <ListItemIcon>
            <WorkspacesIcon
              sx={{
                color: section === "clustering" && "#fff",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Clustering" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 2 }}
          onClick={() => setSection("advanced-search")}
        >
          <ListItemIcon>
            <ManageSearchIcon />
          </ListItemIcon>
          <ListItemText primary="Advanced Search" />
        </ListItemButton>
      </List>
    </List>
  );
};

export default ListItems;
