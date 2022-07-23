import { Box, Paper, Tooltip } from "@mui/material";
import { ReactElement } from "react";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ReactTooltip from "react-tooltip";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  children: ReactElement;
  markdownText: string;
}

export default function FormContainer({ children, markdownText }: Props) {
  return (
    <Box marginTop={3} boxShadow={4}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box marginBottom={1} sx={{ display: "flex", justifyContent: "end" }}>
          <HelpCenterIcon
            sx={{ fontSize: "2rem" }}
            color="primary"
            data-tip=""
            data-for="test"
          />
          <ReactTooltip id="test" multiline={true} resizeHide={true}>
            <ReactMarkdown
              children={markdownText}
              remarkPlugins={[remarkGfm]}
            />
          </ReactTooltip>
        </Box>
        {children}
      </Paper>
    </Box>
  );
}
