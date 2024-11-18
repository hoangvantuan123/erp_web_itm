import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import moment from 'moment';
import UMEmpType from '../tags/UMEmpType';

const columnDefs = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
    },
    {
        headerName: 'STT',
        valueGetter: 'node.rowIndex + 1',
        sortable: false,
        filter: false,
        width: 100,
    },

    { field: 'EmpFamilyName', headerName: 'Họ', sortable: true, filter: true },
    { field: 'EmpFirstName', headerName: 'Tên', sortable: true, filter: true },
    { field: 'EmpName', headerName: 'Họ và Tên', sortable: true, filter: true },
    { field: 'EmpID', headerName: 'Mã nhân viên', sortable: true, filter: true },
    { field: 'ResidID', headerName: 'ResidID', sortable: true, filter: true },
    {
        field: 'EntDate',
        headerName: 'Ngày gia nhập',
        sortable: true,
        filter: true,
        valueFormatter: (params) => params.value ? moment(params.value, 'YYYYMMDD').format('DD-MM-YYYY') : ''
    },
    {
        field: 'UMEmpType',
        headerName: 'Loại nhân viên',
        sortable: true,
        filter: true,
        cellRenderer: (params) => <UMEmpType status={params.value} />
    },
    {
        field: 'BirthDate',
        headerName: 'Ngày sinh',
        sortable: true,
        filter: true,
        valueFormatter: (params) => params.value ? moment(params.value, 'YYYYMMDD').format('DD-MM-YYYY') : ''
    },
    { field: 'EmpEngFirstName', headerName: 'EmpEngFirstName', sortable: true, filter: true },
    { field: 'EmpEngLastName', headerName: 'EmpEngLastName', sortable: true, filter: true },
    { field: 'Remark', headerName: 'Ghi chú', sortable: true, filter: true }
];

export default function TableUsers({ data, setSelectedEmpIDs }) {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const navigate = useNavigate()
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };
    const onSelectionChanged = () => {
        if (gridApi) {
            const selectedNodes = gridApi.getSelectedNodes();
            const selectedIds = selectedNodes.map(node => node.data);
            setSelectedEmpIDs(selectedIds);
        }
    };
    const onRowClicked = (event) => {
        navigate(`/u/action=gen-info-1-2/from=detail/user/${event.data.EmpSeq}`)
    };

    const defaultColDef = useMemo(() => ({
        resizable: true,
        flex: 1,
        minWidth: 100,
    }), []);

    return (
        <div className="ag-theme-quartz h-full cursor-pointer">
            <AgGridReact
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                onRowDoubleClicked={onRowClicked}
                rowSelection="multiple"
                pagination={true}
                paginationPageSize={1000}
                onSelectionChanged={onSelectionChanged}
            />
        </div>
    );
}
