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
  return await axios.post(url, postData, {
    onDownloadProgress: (progressEvent) => {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setPercentage(percentCompleted);
    },
  });
};
