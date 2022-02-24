import axios from "axios";

import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid";

const CodificationContent = ({ fileName }) => {

  const onClickDownloadAsZip = async () => {
    const res = await axios.get(`/files/${fileName}`, { responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'codifications.zip')
    document.body.appendChild(link)
    link.click()
  }

  return (
    <>
      <Grid container spacing={3}>
          <Grid item lg={3} xs={12}>
            <Button variant="contained" color="primary" onClick={onClickDownloadAsZip}>Download as Zip</Button>
          </Grid>
        </Grid>
    </>
  );
};

export default CodificationContent;
