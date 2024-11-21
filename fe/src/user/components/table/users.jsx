import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import UMEmpType from '../tags/UMEmpType';

function TableUsers({ data }) {
    const navigate = useNavigate();

    const columns = [
        { name: 'EmpFamilyName', header: 'Họ', align: 'center', sortable: true },
        { name: 'EmpFirstName', header: 'Tên', align: 'center', sortable: true },
        { name: 'EmpName', header: 'Họ và Tên', align: 'center', sortable: true },
        { name: 'EmpID', header: 'Mã nhân viên', align: 'center', sortable: true },
        { name: 'ResidID', header: 'ResidID', align: 'center', sortable: true },
        {
            name: 'EntDate',
            header: 'Ngày gia nhập',
            align: 'center',
            sortable: true,
            formatter: ({ value }) => value ? moment(value, 'YYYYMMDD').format('DD-MM-YYYY') : ''
        },
        {
            name: 'UMEmpType',
            header: 'Loại nhân viên',
            align: 'center',
            sortable: true,
        },
        {
            name: 'BirthDate',
            header: 'Ngày sinh',
            align: 'center',
            sortable: true,
            formatter: ({ value }) => value ? moment(value, 'YYYYMMDD').format('DD-MM-YYYY') : ''
        },
        { name: 'EmpEngFirstName', header: 'Tên Tiếng Anh', align: 'center', sortable: true },
        { name: 'EmpEngLastName', header: 'Họ Tiếng Anh', align: 'center', sortable: true },
        { name: 'Remark', header: 'Ghi chú', align: 'center', sortable: true }
    ];


    const handleRowDoubleClick = (e) => {
        const { rowKey } = e;
        const clickedRowData = e.instance.getRow(rowKey);
        console.log('Double click - Dữ liệu hàng:', clickedRowData);
    };

    return (
        <div className="w-full h-full">
            <Grid
                data={data}
                columns={columns}
                rowHeight={20}
                bodyHeight="fitToParent"
                onDblclick={handleRowDoubleClick}
                rowHeaders={['rowNum']}
                pagination={{
                    perPage: 100,
                }}
                heightResizable={true}
            />
        </div>
    );
}

export default TableUsers;

