import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TransformIcon from "@mui/icons-material/Transform";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import BiotechIcon from "@mui/icons-material/Biotech";
import BarChartIcon from "@mui/icons-material/BarChart";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

export interface IService {
  title: string;
  description: string;
  logo: any;
  color: boolean;
  url: string
}

export const services: IService[] = [
  {
    title: "Alignment Sequence",
    description:
      "Use of the BLAST (Basic Local Alignment Search Tool) algorithm against the Peptipedia database.",
    logo: FormatAlignCenterIcon,
    color: false,
    url: "alignment-sequence"
  },
  {
    title: "Multi Alignment Sequence",
    description: "Use ClustalW to build an MSA from the specified sequences.",
    logo: FormatAlignCenterIcon,
    color: true,
    url: "msa"
  },
  {
    title: "Pfam Prediction",
    description:
      "Predict protein families and domains in a set of peptides entered.",
    logo: BiotechIcon,
    color: false,
    url: "pfam"
  },
  {
    title: "GO Searching",
    description:
      "Predict Gene Ontology terms (Biological process, molecular function or cellular component) in a set of entered peptides.",
    logo: BiotechIcon,
    color: true,
    url: "gene-ontology"
  },
  {
    title: "Frequency Evaluation",
    description:
      "Performs a count of amino acid frequencies in peptide sequences.",
    logo: BarChartIcon,
    color: false,
    url: "frequency"
  },
  {
    title: "Properties Estimation",
    description:
      "Performs an estimation of physicochemical properties (length, molecular weight, charge, charge density and isoelectric point) for a group of sequences.",
    logo: SquareFootIcon,
    color: true,
    url: "phisicochemical"
  },
  {
    title: "Encoding Sequences",
    description:
      "Numerically encodes the amino acid sequences entered, in order to use Machine Learning models.",
    logo: TransformIcon,
    color: false,
    url: "encoding"
  },
  {
    title: "Clustering",
    description:
      "It performs sequence clustering, using numerical coding techniques and PCA analysis.",
    logo: WorkspacesIcon,
    color: true,
    url: "clustering"
  },
  {
    title: "Training Predictive Models",
    description:
      "It employs supervised learning algorithms on sets of input sequences. Allows training, testing and prediction using new data sets.",
    logo: PsychologyIcon,
    color: false,
    url: "supervised-learning"
  },
];
