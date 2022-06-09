import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IService } from "./services";

interface Props {
  service: IService;
}

export default function ServiceCard({ service }: Props) {
  const navigate = useNavigate();

  return (
    <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
      <Card
        variant="elevation"
        className="ho"
        sx={{
          height: "100%",
          backgroundColor: service.color ? "#2962ff" : "#fff",
          color: service.color ? "#fff" : "#000",
        }}
        onClick={() => navigate(`/${service.url}`)}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <service.logo fontSize="large" />
          <Typography marginY={3} fontWeight="bold" variant="h5">
            {service.title}
          </Typography>
          <Typography variant="subtitle1" fontSize={18} fontWeight="medium">
            {service.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
