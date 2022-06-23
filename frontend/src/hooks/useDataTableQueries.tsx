import { useEffect, useState } from "react";
import { InitialValueTable } from "../utils/initial_values";
import { ITable } from "../utils/interfaces";

interface Props {
  queries: string[];
  queriesWithID: string[];
  counts: number[];
}

export default function useDataTableQueries({
  queries,
  counts,
  queriesWithID,
}: Props) {
  const [tableQueries, setTableQueries] = useState<ITable>(InitialValueTable);

  useEffect(() => {
    const d: any = [];
    let cont = 1;
    queries.forEach((q: any) => {
      let query = queriesWithID[cont - 1];
      let count = counts[cont - 1];
      let position = cont - 1;

      d.push([
        cont,
        q,
        counts[cont - 1],
        // <Box>
        //   <Button
        //     variant="text"
        //     color="primary"
        //     onClick={() =>
        //       searchDatabase({ query: query, page: 0, count: count })
        //     }
        //   >
        //     <PlayArrowIcon />
        //   </Button>
        //   <Button variant="text" color="error" onClick={() => reset(position)}>
        //     <DeleteIcon />
        //   </Button>
        // </Box>,
      ]);
      cont++;
    });
    setTableQueries({ data: d, columns: ["#", "Query", "Results", "Options"] });
  }, [queries, counts, queriesWithID]);

  return {
    tableQueries,
  };
}
