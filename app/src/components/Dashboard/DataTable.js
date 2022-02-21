import MUIDataTable from "mui-datatables";

const options = {
  selectableRowsHideCheckboxes: true,
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
