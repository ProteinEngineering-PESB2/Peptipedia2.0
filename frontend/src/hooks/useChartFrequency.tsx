import { useEffect, useState } from "react";
import { IDataFrequency } from "../utils/interfaces";

interface Props {
  result: IDataFrequency[];
  sequence: string | null;
}

export const useChartFrequency = ({ result, sequence }: Props) => {
  const [x, setX] = useState<string[]>([]);
  const [y, setY] = useState<number[]>([]);

  useEffect(() => {
    const x_list: string[] = [];
    const y_list: number[] = [];

    for (let row in result) {
      if (result[row]["id_seq"] === sequence) {
        for (const [key, value] of Object.entries(result[row]["counts"])) {
          x_list.push(key);
          y_list.push(value);
        }

        break;
      }
    }

    setX(x_list);
    setY(y_list);
  }, [sequence]);

  return {
    x,
    y,
  };
};
