# Sử dụng phiên bản nhẹ của Node.js
FROM node:20-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và yarn.lock trước để tận dụng Docker cache
COPY package.json yarn.lock ./

# Cài đặt dependencies
RUN yarn install --frozen-lockfile && yarn cache clean

# Sao chép toàn bộ mã nguồn
COPY . .

# Cài đặt PM2
RUN yarn global add pm2

# Mở cổng ứng dụng
EXPOSE 3000

# Lệnh khởi chạy ứng dụng bằng PM2
CMD ["pm2-runtime", "start", "npm", "--", "run", "start"]





# yarn global add http-server


## pm2 start http-server --name "my-react-app" -- -p 3000 ./dist




```
import { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import pako from 'pako';

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('sheetDatabase', 1);
        request.onerror = () => reject('Failed to open IndexedDB');
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('sheetData')) {
                db.createObjectStore('sheetData', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
};

const saveDataToDatabase = async (data) => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction('sheetData', 'readwrite');
        const store = transaction.objectStore('sheetData');

        const request = store.get(1);
        request.onsuccess = (e) => {
            const record = e.target.result;
            if (record) {
                store.put({ ...record, data: JSON.stringify(data) });
            } else {
                store.add({ id: 1, data: JSON.stringify(data) });
            }
        };

        request.onerror = () => {
            console.error('Error while saving data to IndexedDB');
        };
    } catch (error) {
        console.error('Failed to save data to IndexedDB', error);
    }
};

const createDefaultData = () => {
    const numRows = 30;
    const numCols = 10;
    const columns = Array.from({ length: numCols }, (_, index) => `Column ${index + 1}`);
    const rows = Array.from({ length: numRows }, () => Array(numCols).fill(''));

    return [{ columns, data: rows }];
};

export default function SheetView({ dbData: compressedData }) {
    const hotTableRef = useRef(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (compressedData) {
            try {
                const decompressedData = pako.ungzip(compressedData, { to: 'string' });
                const parsedData = JSON.parse(decompressedData);
                setData(parsedData);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                setData([]);
            }
        } else {
            const defaultData = createDefaultData();
            setData(defaultData);
            setIsLoading(false);
        }
    }, [compressedData]);

    useEffect(() => {
        if (hotTableRef.current && data.length > 0) {
            const sheet = data[0];
            const columns = sheet.columns || [];
            const rowData = sheet.data || [];
            const columnsObject = columns.reduce((obj, column) => {
                obj[column] = column;
                return obj;
            }, {});
            const tableData = [columnsObject, ...rowData];

            const hot = new Handsontable(hotTableRef.current, {
                data: tableData,
                colHeaders: true,
                rowHeaders: true,
                height: '100%',
                licenseKey: 'non-commercial-and-evaluation',
                stretchH: 'all',
                contextMenu: true,
                manualColumnResize: true,
                manualRowResize: true,
                afterChange(changes, source) {
                    if (source !== 'loadData') {
                        const updatedData = hot.getData();
                        saveDataToDatabase(updatedData);
                    }
                },
            });

            return () => {
                hot.destroy();
            };
        }
    }, [data]);

    const clearDatabase = async () => {
        try {
            setData([]);
            const db = await openDatabase();
            const transaction = db.transaction('sheetData', 'readwrite');
            const store = transaction.objectStore('sheetData');
            store.clear();
        } catch (error) {
            console.error('Failed to clear IndexedDB', error);
        }
    };

    return (
        <>
            <button onClick={clearDatabase} style={{ marginTop: '20px' }}>
                Clear IndexedDB
            </button>
            
            <div ref={hotTableRef}>
                {isLoading && <p>Loading...</p>}
            </div>
        </>
    );
}


```
