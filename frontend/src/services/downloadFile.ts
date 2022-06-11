import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import toast from "react-hot-toast";

interface Props {
  url: string;
  name: string;
  setOpenBackdrop: Dispatch<SetStateAction<boolean>>;
  setPercentage: Dispatch<SetStateAction<number>>;
}

export const downloadFile = async ({
  url,
  name,
  setOpenBackdrop,
  setPercentage,
}: Props): Promise<any> => {
  setOpenBackdrop(true);
  try {
    const res = await axios({
      url: url,
      method: "GET",
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setPercentage(percentCompleted);
      },
    });
    fileDownload(res.data, name);
    setOpenBackdrop(false);
  } catch (error) {
    toast.error("Error downloading file");
    setOpenBackdrop(false);
    setPercentage(0);
  }
};
