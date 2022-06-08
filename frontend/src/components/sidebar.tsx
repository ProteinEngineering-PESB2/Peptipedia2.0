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
import PsychologyIcon from "@mui/icons-material/Psychology";
import TransformIcon from "@mui/icons-material/Transform";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import StorageIcon from "@mui/icons-material/Storage";
import BiotechIcon from "@mui/icons-material/Biotech";
import BarChartIcon from "@mui/icons-material/BarChart";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import TranslateIcon from "@mui/icons-material/Translate";
import { useAppContext } from "../hooks/useAppContext";

export default function Sidebar() {
  const { section } = useAppContext();
  const navigate = useNavigate();

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
      <ListSubheader>Database</ListSubheader>
      <List component="div" disablePadding>
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
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "advanced_search" ? "#2962ff" : "#fff",
            color: section === "advanced_search" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/advanced-search")}
        >
          <ManageSearchIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "advanced_search" ? "bold" : "normal",
              }}
            >
              Advanced Search
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Tools</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "converter-fasta" ? "#2962ff" : "#fff",
            color: section === "converter-fasta" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/converter-fasta")}
        >
          <TranslateIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{ 
                fontWeight: section === "converter-fasta" ? "bold" : "normal",
              }}
            >
              Converter Fasta
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Bionformatic Tools</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "blast" ? "#2962ff" : "#fff",
            color: section === "blast" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/blast")}
        >
          <FormatAlignCenterIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "blast" ? "bold" : "normal",
              }}
            >
              Alignment Sequence
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "msa" ? "#2962ff" : "#fff",
            color: section === "msa" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/msa")}
        >
          <FormatAlignCenterIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "msa" ? "bold" : "normal",
              }}
            >
              Multi Alignment Sequence
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "pfam" ? "#2962ff" : "#fff",
            color: section === "pfam" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/pfam")}
        >
          <BiotechIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "pfam" ? "bold" : "normal",
              }}
            >
              Pfam Prediction
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "gene_ontology" ? "#2962ff" : "#fff",
            color: section === "gene_ontology" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/gene-ontology")}
        >
          <BiotechIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "gene_ontology" ? "bold" : "normal",
              }}
            >
              GO Searching
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Static Tools</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "frequency" ? "#2962ff" : "#fff",
            color: section === "frequency" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/frequency")}
        >
          <BarChartIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "frequency" ? "bold" : "normal",
              }}
            >
              Frequency Evaluation
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "phisicochemical" ? "#2962ff" : "#fff",
            color: section === "phisicochemical" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/phisicochemical")}
        >
          <SquareFootIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "phisicochemical" ? "bold" : "normal",
              }}
            >
              Properties Estimation
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Machine Learning Tools</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "encoding" ? "#2962ff" : "#fff",
            color: section === "encoding" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/encoding")}
        >
          <TransformIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "encoding" ? "bold" : "normal",
              }}
            >
              Encoding Sequences
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List component="div" disablePadding>
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
          onClick={() => navigate("/clustering")}
        >
          <WorkspacesIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "clustering" ? "bold" : "normal",
              }}
            >
              Clustering
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "supervised-learning" ? "#2962ff" : "#fff",
            color: section === "supervised-learning" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/supervised-learning")}
        >
          <PsychologyIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "supervised-learning" ? "bold" : "normal",
              }}
            >
              Training Predictive Models
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </List>
  );
}
