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
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";

const ListItems = ({ setSection }) => {
  const [expandItemCharacterizations, setExpandItemCharacterizations] =
    useState(false);
  const [expandItemAlignments, setExpandItemAlignments] = useState(false);

  return (
    <List
      component="nav"
      aria-labelledby="tools-sub-header"
      subheader={
        <ListSubheader component="div" id="tools-sub-header">
          Tools
        </ListSubheader>
      }
    >
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
            <ListItemButton sx={{ pl: 4 }} onClick={() => setSection("blast")}>
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary="Blast" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setSection("msa")}>
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary="MSA" />
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
              sx={{ pl: 4 }}
              onClick={() => setSection("phisicochemical")}
            >
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary="Phisicochemical" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setSection("gene_ontology")}
            >
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary="Gene Ontology" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
              }}
              onClick={() => setSection("pfam")}
            >
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary="Pfam" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          sx={{ pl: 2 }}
          onClick={() => setSection("codifications")}
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Codification" />
        </ListItemButton>
      </List>
    </List>
  );
};

export default ListItems;
