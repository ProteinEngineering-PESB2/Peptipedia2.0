import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InitialValueTable } from "../utils/initial_values";
import { ITable } from "../utils/interfaces";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  queries: string[];
  queriesWithID: string[];
  counts: number[];
  setOpenBackdrop: Dispatch<SetStateAction<boolean>>;
}

interface IValues {
  query: string;
  page: number;
  count: number;
}

export default function useDataTableQueries({
  queries,
  counts,
  queriesWithID,
  setOpenBackdrop,
}: Props) {
  const [tableQueries, setTableQueries] = useState<ITable>(InitialValueTable);
  const [tableResultQueries, setTableResultQueries] =
    useState<ITable>(InitialValueTable);
  const [pageTable, setPageTable] = useState(0);
  const [totalTable, setTotalTable] = useState(20);
  const [querySelected, setQuerySelected] = useState("");

  const options = {
    selectableRowsHideCheckboxes: true,
    rowsPerPage: 20,
    rowsPerPageOptions: [20],
    serverSide: true,
    count: totalTable,
    page: pageTable,
    sort: false,
    search: false,
    filter: false,
    viewColumns: false,
    onTableChange: (action: any, tableState: any) => {
      if (action === "changePage") {
        searchDatabase({ query: "", page: tableState.page, count: 0 });
      }
    },
  };

  const searchDatabase = async (values: IValues) => {
    setOpenBackdrop(true);
    if (values.query !== "") {
      setQuerySelected(values.query);
    }

    setPageTable(values.page);

    if (values.count !== 0) {
      setTotalTable(values.count);
    }

    const post = {
      query: values.query !== "" ? values.query : querySelected,
      limit: 20,
      page: values.page + 1,
    };

    try {
      const { data } = await axios.post("/api/search", post);

      if (data.status === "error") {
        toast.error(data.description);
      } else if (data.status === "success") {
        let new_data = [];
        for (let d = 0; d < data.data.length; d++) {
          let parcial_data = data.data[d];
          //   parcial_data.push(
          //     <Button variant="text" color="info">
          //       <InfoIcon onClick={() => setPeptideID(res.data[d][0])} />
          //     </Button>
          //   );
          new_data.push(parcial_data);
        }

        const new_columns = data.columns;
        new_columns.push("Options");

        setTableResultQueries({ columns: new_columns, data: new_data });
        setOpenBackdrop(false);
      }
    } catch (error) {
      toast.error("Server Error");
      setOpenBackdrop(false);
    }
  };

  useEffect(() => {
    setOpenBackdrop(true);
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
        <Box>
          <Button
            variant="text"
            color="primary"
            onClick={() =>
              searchDatabase({ query: query, page: 0, count: count })
            }
          >
            <PlayArrowIcon />
          </Button>
          {/* <Button variant="text" color="error" onClick={() => reset(position)}>
            <DeleteIcon />
          </Button> */}
        </Box>,
      ]);
      cont++;
    });
    setTableQueries({ data: d, columns: ["#", "Query", "Results", "Options"] });
    setOpenBackdrop(false);
  }, [queries, counts, queriesWithID]);

  return {
    tableQueries,
    options,
    tableResultQueries,
  };
}
