import MUIDataTable from "mui-datatables";

const options = {
  selectableRowsHeader: false,
  selectableRowsHideCheckboxes: true,
};

const DataTable = ({ title, columns, data }) => {
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
