import { useState, useEffect, useMemo, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

registerAllModules();

export default function SheetUsers({ data: propData, onDataChange }) {
  const [data, setData] = useState(propData); // Đặt dữ liệu từ props
  const [rowStatus, setRowStatus] = useState(Array(propData.length).fill('A')); // Đặt trạng thái hàng từ dữ liệu ban đầu
  const colHeaders = ['Họ', 'Tên', 'Họ và Tên', 'Mã nhân viên', 'Số CCCD', 'Ngày vào', 'Phân loại nhân viên', 'Ngày sinh', 'Xưởng', 'Bộ phận', 'Ghi chú'];
  const [loading, setLoading] = useState(false);
  const hotTableRef = useRef(null);

  const requiredColumns = useMemo(() => [0, 1, 4, 5, 6], []);
  const nonEditableColumns = useMemo(() => [2], []);

  useEffect(() => {
    if (propData) {
      setData(propData); 
      setRowStatus(Array(propData.length).fill('A')); 
    }
  }, [propData]);

  // Hàm xử lý khi có thay đổi trong bảng
  const handleAfterChange = (changes, source) => {
    if (changes && source !== 'loadData') {
      const updatedData = [...data];
      const updatedStatus = [...rowStatus];

      changes.forEach(([rowIndex, colIndex, oldValue, newValue]) => {
        if (newValue !== oldValue) {
          // Nếu thay đổi dữ liệu của hàng đã có
          if (updatedStatus[rowIndex] === 'A') {
            updatedStatus[rowIndex] = 'U'; // Đánh dấu là đã được cập nhật
          }

          // Nếu thay đổi họ hoặc tên thì cập nhật cột "Họ và Tên"
          if (colIndex === 0 || colIndex === 1) {
            updatedData[rowIndex][2] = `${updatedData[rowIndex][0]} ${updatedData[rowIndex][1]}`.trim();
          }
        }
      });

      // Cập nhật trạng thái và dữ liệu
      setRowStatus(updatedStatus);
      setData(updatedData);

      // Gọi callback từ props nếu cần
      if (onDataChange) {
        onDataChange(updatedData); // Trả lại dữ liệu đã cập nhật
      }
    }
  };

  const viewportRowRenderingOffset = 50;
  const viewportColumnRenderingOffset = 5;

  return (
    <div>
      {loading ? <div>Loading...</div> : null}

      <HotTable
        ref={hotTableRef}
        data={data} 
        rowHeaders={(index) => rowStatus[index] || index + 1} // Hiển thị trạng thái hoặc số dòng
        colHeaders={colHeaders}
        stretchH="all"
        autoWrapRow
        autoWrapCol
        licenseKey="non-commercial-and-evaluation"
        contextMenu
        manualColumnResize
        autoColumnSize
        manualRowResize
        autoRowSize
        outsideClickDeselects
        persistentState={true}
        viewportRowRenderingOffset={viewportRowRenderingOffset}
        viewportColumnRenderingOffset={viewportColumnRenderingOffset}
        afterChange={handleAfterChange} // Gọi hàm sau khi thay đổi
        cells={(row, col) => {
          const cellProperties = {};
          if (nonEditableColumns.includes(col)) {
            cellProperties.readOnly = true;
            cellProperties.renderer = (instance, td, row, col, prop, value, cellProperties) => {
              td.style.backgroundColor = '#d3d3d3';
              td.innerHTML = value;
              return td;
            };
          }
          return cellProperties;
        }}
        afterGetColHeader={(col, TH) => {
          if (requiredColumns.includes(col)) {
            TH.style.color = 'red'; // Hiển thị màu đỏ cho các cột bắt buộc
          } else {
            TH.style.color = '';
          }
        }}
      />
    </div>
  );
}
