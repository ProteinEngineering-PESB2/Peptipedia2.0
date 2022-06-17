import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { requestPost } from "../services/api";

interface Props {
  path: string;
  kernel: string;
  is_normal: boolean;
  setOpenBackdropPCA: Dispatch<SetStateAction<boolean>>;
}

export const usePCAClustering = ({
  path,
  kernel,
  is_normal,
  setOpenBackdropPCA,
}: Props) => {
  const [pathPCA, setPathPCA] = useState<string>("");

  const handlePCA = async () => {
    setOpenBackdropPCA(true);
    setPathPCA("");

    let post;

    if (is_normal) {
      post = {
        params: {
          path,
        },
      };
    } else {
      post = {
        params: {
          path,
          kernel,
        },
      };
    }

    try {
      const { data } = await requestPost({ url: "/api/pca", postData: post });

      console.log(data.path);

      setPathPCA(data.path);
      setOpenBackdropPCA(false);
    } catch (error) {
      toast.error("Server error");
      setPathPCA("");
      setOpenBackdropPCA(false);
    }
  };

  return {
    pathPCA,
    handlePCA,
  };
};
