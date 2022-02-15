import { useState } from "react";

import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AppsIcon from "@mui/icons-material/Apps";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";

const ListItems = ({ setSection }) => {
  const [expandItemApps, setExpandItemApps] = useState(false);
  const [expandItemCharacterizations, setExpandItemCharacterizations] = useState(false)

  return (
    <List>
      <ListItemButton onClick={() => setExpandItemApps(!expandItemApps)}>
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Tools" />
        {expandItemApps ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={expandItemApps} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2.2 }} onClick={() => setSection("alignments")}>
            <ListItemIcon>
              <FormatAlignCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Alignment" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 2.2 }} onClick={() => setExpandItemCharacterizations(!expandItemCharacterizations)}>
            <ListItemIcon>
            <AppsIcon />
            </ListItemIcon>
            <ListItemText primary="Characterization"/>
            {expandItemCharacterizations ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandItemCharacterizations} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => setSection("phisicochemical")}>
                <ListItemIcon>
                  <DoubleArrowIcon />
                </ListItemIcon>
                <ListItemText primary="Phisicochemical" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => setSection("gene_ontology")}>
                <ListItemIcon>
                  <DoubleArrowIcon />
                </ListItemIcon>
                <ListItemText primary="Gene Ontology" />
              </ListItemButton> 
            </List>
          </Collapse>
        </List>
      </Collapse>
    </List>
  );
};

export default ListItems;
