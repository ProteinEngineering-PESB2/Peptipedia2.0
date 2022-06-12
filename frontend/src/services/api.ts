import axios from "axios";

interface RequestPost {
  url: string;
  postData: any;
}

export const requestPost = async ({
  url,
  postData,
}: RequestPost): Promise<any> => await axios.post(url, postData);
