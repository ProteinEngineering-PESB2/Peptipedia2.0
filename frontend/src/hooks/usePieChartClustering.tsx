import { useEffect, useState } from "react";
import { IDataClustering } from "../utils/interfaces";

interface Props {
  result: IDataClustering;
}

export const usePieChartClustering = ({ result }: Props) => {
  const [values, setValues] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const values_list: number[] = [];
    const labels_list: string[] = [];

    for (let row in result.resume) {
      values_list.push(result.resume[row].value);
      labels_list.push(`Cluster ${result.resume[row].category}`);
    }

    setValues(values_list);
    setLabels(labels_list);
  }, []);

  return {
    values,
    labels,
  };
};
