import MUIDataTable from "mui-datatables";

const options = {
  selectableRowsHideCheckboxes: true,
  rowsPerPageOptions: [5, 10, 100],
  responsive: "standard",
};

const DataTable = ({ title, data, columns }) => {
  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default DataTable;
