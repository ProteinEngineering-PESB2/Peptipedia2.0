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
  const [dataScatter, setDataScatter] = useState<any[]>([]);

  const handlePCA = async () => {
    setOpenBackdropPCA(true);
    setPathPCA("");

    let post;

    if (is_normal === true) {
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
      const { data } = await requestPost({ url: "/api/pca/", postData: post });

      const { path, result } = data;

      setPathPCA(path);
      setDataScatter(result);
      setOpenBackdropPCA(false);
    } catch (error) {
      toast.error("Server error");
      setPathPCA("");
      setDataScatter([]);
      setOpenBackdropPCA(false);
    }
  };

  return {
    pathPCA,
    handlePCA,
    dataScatter,
  };
};
