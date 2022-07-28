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
  const [xmin, setXmin] = useState<number>(0);
  const [xmax, setXmax] = useState<number>(0);
  const [ymin, setYmin] = useState<number>(0);
  const [ymax, setYmax] = useState<number>(0);

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
      const { data } = await requestPost({ url: "/api/pca", postData: post });

      const { path, result } = data;

      const uniqueLabels: any[] = [];
      const x_values: any[] = [];
      const y_values: any[] = [];
      result.forEach((r: any) => {
        if (uniqueLabels.includes(r.label) === false) {
          uniqueLabels.push(r.label);
        }

        x_values.push(r.X);
        y_values.push(r.Y);
      });

      const traces = [];

      for (let label in uniqueLabels) {
        const x: any[] = [];
        const y: any[] = [];
        const text: any[] = [];

        result.forEach((r: any) => {
          if (r.label === parseInt(label)) {
            x.push(r.X);
            y.push(r.Y);
            text.push(r.id);
          }
        });

        const trace = {
          x: x,
          y: y,
          mode: "markers",
          type: "scatter",
          name: `Label ${label}`,
          text: text,
          marker: { size: 12 },
        };

        traces.push(trace);
      }

      let x_max: any = Math.max(...x_values);
      let x_min: any = Math.min(...x_values);
      let y_max: any = Math.max(...y_values);
      let y_min: any = Math.min(...y_values);

      x_max = parseInt(x_max) + 5;
      x_min = parseInt(x_min) - 5;
      y_max = parseInt(y_max) + 5;
      y_min = parseInt(y_min) - 5;

      setPathPCA(path);
      setDataScatter(traces);
      setXmin(x_min);
      setXmax(x_max);
      setYmin(y_min);
      setYmax(y_max);
      setOpenBackdropPCA(false);
    } catch (error) {
      toast.error("Server error");
      setPathPCA("");
      setDataScatter([]);
      setXmin(0);
      setXmax(0);
      setYmin(0);
      setYmax(0);
      setOpenBackdropPCA(false);
    }
  };

  return {
    pathPCA,
    handlePCA,
    dataScatter,
    xmin,
    xmax,
    ymin,
    ymax,
  };
};
