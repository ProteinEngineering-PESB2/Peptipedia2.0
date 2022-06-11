import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { IBackdrop } from "../utils/interfaces";

interface RequestPost {
    url: string
    postData: any
    backdrop: IBackdrop
    setBackdrop: Dispatch<SetStateAction<IBackdrop>>
}

export const requestPost = async ({ url, postData, backdrop, setBackdrop }: RequestPost): Promise<any> => {
  return await axios.post(url, postData, {
    onDownloadProgress: (progressEvent) => {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setBackdrop({ ...backdrop, percentage: percentCompleted })
    },
  });
};
