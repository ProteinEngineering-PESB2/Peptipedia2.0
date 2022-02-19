import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const DataTable = ({ data, columns }) => {
  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: 550 }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        paginationAutoPageSize={true}
      ></AgGridReact>
    </div>
  );
};

export default DataTable;
