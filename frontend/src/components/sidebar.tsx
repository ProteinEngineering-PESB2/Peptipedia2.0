import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import StorageIcon from "@mui/icons-material/Storage";
import GroupsIcon from "@mui/icons-material/Groups";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import MediationIcon from "@mui/icons-material/Mediation";
import { useAppContext } from "../hooks/useAppContext";

export default function Sidebar() {
  const { section } = useAppContext();
  const navigate = useNavigate();

  return (
    <List component="nav">
      <ListSubheader>Dashboard</ListSubheader>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "home" ? "#2962ff" : "#fff",
          borderRadius: "8px",
          marginX: "6px",
          "&:hover": {
            background: "#2962ff",
            color: "#fff",
          },
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            color: section === "home" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/")}
        >
          <HomeIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{ fontWeight: section === "home" ? "bold" : "normal" }}
            >
              Home
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "team" ? "#2962ff" : "#fff",
          borderRadius: "8px",
          marginX: "6px",
          marginY: "10px",
          "&:hover": {
            background: "#2962ff",
            color: "#fff",
          },
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            color: section === "team" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/team")}
        >
          <GroupsIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "team" ? "bold" : "normal",
              }}
            >
              Peptipedia Team
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "how_to_cite" ? "#2962ff" : "#fff",
          borderRadius: "8px",
          marginX: "6px",
          marginY: "10px",
          "&:hover": {
            background: "#2962ff",
            color: "#fff",
          },
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            color: section === "how_to_cite" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/how-to-cite")}
        >
          <FormatQuoteIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "how_to_cite" ? "bold" : "normal",
              }}
            >
              How to Cite
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Database</ListSubheader>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "database" ? "#2962ff" : "#fff",
          borderRadius: "8px",
          marginX: "6px",
          "&:hover": {
            background: "#2962ff",
            color: "#fff",
          },
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            color: section === "database" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/database")}
        >
          <StorageIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{ fontWeight: section === "database" ? "bold" : "normal" }}
            >
              Database
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "advanced-search" ? "#2962ff" : "#fff",
          borderRadius: "8px",
          marginX: "6px",
          marginY: "10px",
          "&:hover": {
            background: "#2962ff",
            color: "#fff",
          },
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            color: section === "advanced-search" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/advanced-search")}
        >
          <ManageSearchIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "advanced-search" ? "bold" : "normal",
              }}
            >
              Advanced Search
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "activities" ? "#2962ff" : "#fff",
          borderRadius: "8px",
          marginX: "6px",
          marginY: "10px",
          "&:hover": {
            background: "#2962ff",
            color: "#fff",
          },
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            color: section === "activities" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/activities")}
        >
          <MediationIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "activities" ? "bold" : "normal",
              }}
            >
              Activities
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "promiscuous" ? "#2962ff" : "#fff",
          borderRadius: "8px",
          marginX: "6px",
          marginY: "10px",
          "&:hover": {
            background: "#2962ff",
            color: "#fff",
          },
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            color: section === "promiscuous" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/promiscuous")}
        >
          <StorageIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "promiscuous" ? "bold" : "normal",
              }}
            >
              Promiscuous
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Bionformatic Tools</ListSubheader>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor:
            section === "alignment-sequence" ? "#2962ff" : "#fff",
          borderRadius: "8px",
          marginX: "6px",
          "&:hover": {
            background: "#2962ff",
            color: "#fff",
          },
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            color: section === "alignment-sequence" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/alignment-sequence")}
        >
          <FormatAlignCenterIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight:
                  section === "alignment-sequence" ? "bold" : "normal",
              }}
            >
              Alignment Sequence
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </List>
  );
}
