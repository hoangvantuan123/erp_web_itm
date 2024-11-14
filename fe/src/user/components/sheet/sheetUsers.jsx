import  { useState, useEffect, useMemo, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { debounce } from 'lodash';

registerAllModules();

// Hàm tạo dữ liệu trống
const generateEmptyData = (rows, cols) => {
  let data = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push('');
    }
    data.push(row);
  }
  return data;
};

export default function SheetUsers() {
  const [data, setData] = useState(generateEmptyData(50, 11)); 
  const [loading, setLoading] = useState(false);
  const hotTableRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    const newData = generateEmptyData(200, 11);
    setData(newData);
    setLoading(false);
  };

  const debouncedSetData = useMemo(
    () => debounce((newData) => {
      setData(newData);
    }, 300),
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  const viewportRowRenderingOffset = 50; 
  const viewportColumnRenderingOffset = 5; 

  return (
    <div>
      {loading ? <div>Loading...</div> : null}

      <HotTable
        ref={hotTableRef}
        data={data}
        rowHeaders
        colHeaders
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
        onAfterChange={debouncedSetData} 
      />
    </div>
  );
}
