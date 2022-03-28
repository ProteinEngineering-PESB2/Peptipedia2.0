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
import HomeIcon from '@mui/icons-material/Home';
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const ListItems = ({ setSection }) => {
  const [expandItemCharacterizations, setExpandItemCharacterizations] =
    useState(false);
  const [expandItemAlignments, setExpandItemAlignments] = useState(false);

  return (
    <List
      component="nav"
    >
      <ListSubheader>Dashboard</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
          sx={{ pl: 2 }}
          onClick={() => setSection("home")}
        >
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary="Home"/>
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
            <ListItemButton
              sx={{
                pl: 4,
              }}
              onClick={() => setSection("frequency")}
            >
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary="Frequency" />
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
          <ListItemText primary="Encoding" />
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
