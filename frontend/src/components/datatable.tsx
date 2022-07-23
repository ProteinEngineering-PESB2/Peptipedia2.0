import MUIDataTable from "mui-datatables";
import { ITable } from "../utils/interfaces";

interface Props {
  table: ITable;
  title: string;
}

export default function DataTable({ table, title }: Props) {
  return (
    <MUIDataTable
      data={table.data}
      columns={table.columns}
      title={title}
      options={{
        selectableRowsHideCheckboxes: true,
        rowsPerPageOptions: [5, 10, 100],
        download: false,
        print: false
      }}
    />
  );
}
