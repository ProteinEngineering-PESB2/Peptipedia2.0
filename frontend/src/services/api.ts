import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface RequestPost {
  url: string;
  postData: any;
  setPercentage: Dispatch<SetStateAction<number>>;
}

export const requestPost = async ({
  url,
  postData,
  setPercentage,
}: RequestPost): Promise<any> => {
  setPercentage(0);
  return await axios.post(url, postData, {
    onUploadProgress: (event) => {
      let percentCompleted1 = Math.round((event.loaded * 100) / event.total);
      console.log(percentCompleted1);
    },
    onDownloadProgress: (progressEvent) => {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setPercentage(percentCompleted);
    },
  });
};
