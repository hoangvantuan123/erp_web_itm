// worker.js
self.onmessage = function (e) {
    const { data } = e;
    
    // Giả sử bạn muốn xử lý dữ liệu (tạo ra dữ liệu đã được cập nhật, lọc, hoặc chuyển đổi ở đây)
    const processedData = data.map(row => {
      // Thực hiện các phép toán xử lý dữ liệu ở đây, ví dụ:
      return row.map(cell => {
        // Giả sử chỉ muốn loại bỏ khoảng trắng trong mỗi cell
        return cell.trim();
      });
    });
  
    // Gửi kết quả về main thread (React)
    postMessage(processedData);
  };
  