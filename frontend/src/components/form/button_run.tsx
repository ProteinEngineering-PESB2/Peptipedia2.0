import { FormControl, Button } from "@mui/material";
import { PostData } from "../../utils/interfaces";

interface Props {
  data: PostData;
}

export default function ButtonRun({ data }: Props) {
  return (
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: { xl: "12rem", lg: "12rem", md: "12rem", sm: "12rem", xs: "12rem" },
          backgroundColor: "#2962ff",
          ":hover": { backgroundColor: "#3A6CF6" },
        }}
        size="medium"
        disabled={data.fastaText === "" && data.fastaFile === null && true}
      >
        run
      </Button>
    </FormControl>
  );
}
