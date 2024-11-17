import { useState, useMemo, useRef, useCallback } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { message } from 'antd';
import { debounce } from 'lodash';

registerAllModules();

export default function AddUserSheetDrawer({ data: propData, onDataChange }) {
  const colHeaders = ['Họ', 'Tên', 'Mã nhân viên', 'Số CCCD', 'Ngày vào', 'Phân loại nhân viên', 'Ngày sinh', 'Xưởng', 'Bộ phận', 'Ghi chú'];
  
  const createEmptyData = () => Array(20).fill().map(() => Array(colHeaders.length).fill(''));

  const [data, setData] = useState(propData || createEmptyData());
  const [rowStatus, setRowStatus] = useState(Array((propData && propData.length) || 20).fill('A'));
  const [invalidColumns, setInvalidColumns] = useState(new Set()); 
  
  const requiredColumns = useMemo(() => [0, 1, 2, 3, 4, 5, 6], []);
  const hotTableRef = useRef(null);

  const isSampleRow = (row) => row.every(cell => cell === '' || cell === null);

  const validateRowData = (row, rowIndex) => {
    const missingColumns = requiredColumns.filter(colIndex => typeof row[colIndex] !== 'string' || row[colIndex].trim() === '');
    if (missingColumns.length > 0) {
      missingColumns.forEach((colIndex) => {
        setInvalidColumns(prev => new Set(prev.add(colIndex))); 
      });
      return false;
    }

    return row.some(cell => typeof cell === 'string' && cell.trim() !== '');
  };

  // Định nghĩa danh sách phân loại nhân viên dưới dạng key-value
  const employeeTypes = {
    1: "Nhân viên chính thức",
    2: "Nhân viên thử việc",
    3: "Nhân viên hợp đồng",
    4: "Nhân viên bán thời gian"
  };

  const employeeTypeValues = Object.values(employeeTypes); // Các giá trị hiển thị trong dropdown
  
  // Sử dụng debounce để giảm tần suất gọi handleSave
  const handleSaveDebounced = useCallback(debounce(() => {
    const validData = data.filter((row, rowIndex) => {
      if (isSampleRow(row)) return false;
      return validateRowData(row, rowIndex);
    });

    console.log('Dữ liệu hợp lệ để lưu:', validData);
  
    if (validData.length === 0) {
      message.error('Không có dữ liệu hợp lệ để lưu!');
      return;
    }
  
    const xmlData = validData.map((row, index) => {
        const empTypeValue = row[5]
        let empTypeKey = '';  
      
        for (const key in employeeTypes) {
          if (employeeTypes[key] === empTypeValue) {
            empTypeKey = key;  
            break;  
          }
        }
      
        const empTypeToUse = empTypeKey ? empTypeKey : '0';
      
        return `
          <DataBlock1>
            <WorkingTag>A</WorkingTag>
            <IDX_NO>${index + 1}</IDX_NO>
            <DataSeq>${index + 1}</DataSeq>
            <Status>0</Status>
            <Selected>0</Selected>
            <EmpFamilyName>${row[0]}</EmpFamilyName>  
            <EmpFirstName>${row[1]}</EmpFirstName>  
            <EmpName>${row[2]}</EmpName> 
            <EmpSeq>0</EmpSeq>
            <EmpID>${row[3]}</EmpID>  
            <ResidID>${row[4]}</ResidID> 
            <EntDate>${row[5]}</EntDate>  
            <UMEmpType>${empTypeToUse}</UMEmpType>  <!-- Lưu key nếu có, nếu không thì lưu text -->
            <EmpChnName /> 
            <EmpEngFirstName /> 
            <EmpEngLastName /> 
            <Remark /> 
            <TABLE_NAME>DataBlock1</TABLE_NAME>
          </DataBlock1>
        `;
      }).join('\n');
      
  
    const finalXml = `<?xml version="1.0" encoding="UTF-8"?>
    <Data>
      ${xmlData}
    </Data>`;
  
    console.log('Dữ liệu XML:', xmlData);
  
    if (onDataChange) onDataChange(finalXml); 
  
    message.success('Dữ liệu đã được lưu thành công!');
  }, 1000), [data]);

  const handleAfterChange = (changes, source) => {
    if (changes && source !== 'loadData') {
      const updatedData = [...data];
      const updatedStatus = [...rowStatus];

      changes.forEach(([rowIndex, colIndex, oldValue, newValue]) => {
        if (newValue !== oldValue && updatedStatus[rowIndex] === 'A') {
          updatedStatus[rowIndex] = 'U';
        }
      });

      setRowStatus(updatedStatus);
      setData(updatedData);
    }
  };

  const handleAddRow = () => {
    const newRow = Array(colHeaders.length).fill('');
    setData(prevData => [...prevData, newRow]);
    setRowStatus(prevStatus => [...prevStatus, 'A']);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = [...data];
    const updatedStatus = [...rowStatus];
    
    updatedData.splice(rowIndex, 1);
    updatedStatus.splice(rowIndex, 1);

    setData(updatedData);
    setRowStatus(updatedStatus);
  };

// Cấu hình các cột cho HotTable, đặc biệt là cột "Phân loại nhân viên"
const columns = Array(colHeaders.length).fill({});

columns[5] = {
  type: 'dropdown',
  source: employeeTypeValues, // Danh sách giá trị hiển thị trong dropdown
  validator: (value, callback) => {
    callback(value !== ''); // Kiểm tra giá trị không được để trống
  }
};



  return (
    <div className="h-screen overflow-auto p-3">
      <button onClick={handleSaveDebounced}>Lưu Dữ Liệu</button>
      <button onClick={handleAddRow}>Thêm Hàng Mới</button>

      <HotTable
  ref={hotTableRef}
  data={data}
  colHeaders={colHeaders}
  rowHeaders="A"
  autoWrapRow
  autoWrapCol
  licenseKey="non-commercial-and-evaluation"
  contextMenu={{
    items: {
      'remove_row': { name: 'Xóa Hàng', disabled: false },
      'insert_row': { name: 'Thêm Hàng Mới', callback: handleAddRow },
      'duplicate_row': { name: 'Sao Chép Hàng', disabled: true },
      'insert_column': { name: 'Thêm Cột', disabled: true },
      'remove_column': { name: 'Xóa Cột', disabled: true },
    }
  }}
  manualColumnResize
  autoColumnSize
  manualRowResize
  autoRowSize
  outsideClickDeselects
  persistentState={true}
  afterChange={handleAfterChange}
  columns={columns} // Đảm bảo rằng cột "Phân loại nhân viên" đã được cấu hình đúng
/>

    </div>
  );
}
