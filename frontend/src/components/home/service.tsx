import { Box, Typography, Grid } from "@mui/material" 

import ServiceCard from "./service_card";

import { services, IService } from "./services";

export default function Services() {
  return (
    <>
      <Box marginTop={8}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Services
        </Typography>
      </Box>
      <Box marginTop={5}>
        <Grid container spacing={3}>
          {services.map((s: IService) => (
            <ServiceCard service={s} key={s.title}/>
          ))}
        </Grid>
      </Box>
    </>
  );
}
