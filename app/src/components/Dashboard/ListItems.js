import { useState } from "react";

import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AppsIcon from "@mui/icons-material/Apps";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";

const ListItems = ({ setSection }) => {
  const [expandItemApps, setExpandItemApps] = useState(false);

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
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSection("alignments")}>
            <ListItemIcon>
              <FormatAlignCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Alignments" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default ListItems;
