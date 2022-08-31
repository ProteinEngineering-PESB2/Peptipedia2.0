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
import GroupsIcon from "@mui/icons-material/Groups";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import BuildIcon from "@mui/icons-material/Build";
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
      <ListSubheader>Tools</ListSubheader>
      <List
        sx={{
          p: "2px",
          backgroundColor: section === "fasta-converter" ? "#2962ff" : "#fff",
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
            color: section === "fasta-converter" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/fasta-converter")}
        >
          <TranslateIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "fasta-converter" ? "bold" : "normal",
              }}
            >
              Convert to Fasta
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List
        sx={{
          p: "2px",
          backgroundColor: section === "test-sequences" ? "#2962ff" : "#fff",
          borderRadius: "8px",
          marginX: "6px",
          "&:hover": {
            background: "#2962ff",
            color: "#fff",
          },
          marginTop: 1,
        }}
      >
        <ListItemButton
          disableRipple
          sx={{
            color: section === "test-sequences" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/test-sequences")}
        >
          <BuildIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "test-sequences" ? "bold" : "normal",
              }}
            >
              Test Sequences
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
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "msa" ? "#2962ff" : "#fff",
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
            color: section === "msa" ? "#fff" : "#000",
            "&:hover": {
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
              Multiple Sequence Alignment
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "pfam" ? "#2962ff" : "#fff",
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
            color: section === "pfam" ? "#fff" : "#000",
            "&:hover": {
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
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "gene-ontology" ? "#2962ff" : "#fff",
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
            color: section === "gene-ontology" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/gene-ontology")}
        >
          <BiotechIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "gene-ontology" ? "bold" : "normal",
              }}
            >
              GO Searching
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor:
            section === "structural_prediction" ? "#2962ff" : "#fff",
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
            color: section === "structural_prediction" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/structural-prediction")}
        >
          <BiotechIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight:
                  section === "structural_prediction" ? "bold" : "normal",
              }}
            >
              Structural Prediction
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Static Tools</ListSubheader>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "frequency" ? "#2962ff" : "#fff",
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
            color: section === "frequency" ? "#fff" : "#000",
            "&:hover": {
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
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "physicochemical" ? "#2962ff" : "#fff",
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
            color: section === "physicochemical" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/physicochemical")}
        >
          <SquareFootIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight: section === "physicochemical" ? "bold" : "normal",
              }}
            >
              Properties Estimation
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Machine Learning Tools</ListSubheader>
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "encoding" ? "#2962ff" : "#fff",
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
            color: section === "encoding" ? "#fff" : "#000",
            "&:hover": {
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
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor: section === "clustering" ? "#2962ff" : "#fff",
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
            color: section === "clustering" ? "#fff" : "#000",
            "&:hover": {
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
      <List
        component="div"
        disablePadding
        sx={{
          p: "2px",
          backgroundColor:
            section === "supervised-learning" ? "#2962ff" : "#fff",
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
            color: section === "supervised-learning" ? "#fff" : "#000",
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={() => navigate("/supervised-learning")}
        >
          <PsychologyIcon sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{
                fontWeight:
                  section === "supervised-learning" ? "bold" : "normal",
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
