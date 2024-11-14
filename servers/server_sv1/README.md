qr-code-microservice/
├── src/
│   ├── app.module.ts               # Module chính, import các module khác
│   ├── main.ts                      # Điểm khởi đầu của ứng dụng NestJS
│   ├── config/                      # Cấu hình hệ thống (CORS, rate-limiting, logger)
│   │   ├── database.config.ts       # Cấu hình kết nối DB Oracle
│   │   ├── security.config.ts       # Cấu hình bảo mật (JWT, rate limiting, etc.)
│   │   └── app.config.ts            # Các cấu hình chung của ứng dụng (port, prefix, etc.)
│   ├── common/                      # Thư mục chứa các thành phần tái sử dụng
│   │   ├── decorators/              # Các custom decorators
│   │   ├── interceptors/            # Các interceptors cho logging, error handling
│   │   ├── guards/                  # Các guards cho bảo mật
│   │   ├── filters/                 # Các exception filters
│   │   └── utils/
|    |    |   database/                # Module tái sử dụng các hàm database
│   │   │   ├── database.module.ts   # Module của Database
│   │   │   ├── database.service.ts  # Service xử lý truy vấn DB
│   │   │   ├── find.service.ts      # Xử lý logic tìm kiếm dữ liệu
│   │   │   ├── create.service.ts    # Xử lý logic thêm dữ liệu
│   │   │   ├── update.service.ts    # Xử lý logic cập nhật dữ liệu
│   │   │   └── delete.service.ts                     # Các tiện ích chung (helpers)
│   ├── qr-code/                     # Module QR Code
│   │   ├── qr-code.module.ts        # Định nghĩa module
│   │   ├── qr-code.controller.ts    # Controller cho QR Code
│   │   ├── qr-code.service.ts       # Service xử lý logic cho QR Code
│   │   ├── entities/
│   │   │   └── qr-code.entity.ts    # Định nghĩa entity QR Code
│   │   └── dto/                     # Định nghĩa các DTO (Data Transfer Object)
│   │       └── create-qr-code.dto.ts
├── .env                             # Các biến môi trường
├── .env.example                     # Mẫu file .env cho môi trường dev
├── package.json
└── yarn.lock



# get image
$ docker pull gvenzl/oracle-xe:21-full

# build oracle image and detached (it gonna take while)
$ docker run -d -p 1521:1521 --name ora21cFull -e ORACLE_PASSWORD=SysPassword1 -v oracle-volume:/opt/oracle/XEORA21CFull/oradata gvenzl/oracle-xe



<!-- Ban 11 -->

docker pull gvenzl/oracle-xe:11

docker run -d -p 1521:1521 --name ora11gFull -e ORACLE_PASSWORD=SysPassword1 -v oracle-volume:/opt/oracle/XEORA11GFull/oradata gvenzl/oracle-xe:11


<!--  Kết nối DB 2  -->


```

@Injectable()
export class SecondDatabaseService {
  // Inject kết nối với tên cụ thể 'secondConnection'
  constructor(@InjectConnection('secondConnection') private readonly connection: Connection) {}

  async executeQuery(query: string, parameters: any[] = []) {
    try {
      return await this.connection.query(query, parameters);
    } catch (error) {
      console.error(ERROR_MESSAGES.EXECUTING_QUERY, error);
      throw error;
    }
  }

  async executeMultipleQueries(queries: string[], parameters: any[][]) {
    try {
      const promises = queries.map((query, index) =>
        this.executeQuery(query, parameters[index])
      );
      return await Promise.all(promises);
    } catch (error) {
      console.error(ERROR_MESSAGES.MULTIPLE_QUERIES, error);
      throw error;
    }
  }
}

```

{
    "PLANT": "ITMVPSG",
    "MATERIAL_LOT": "FPC0113/D403200800/849/2442/1P4NBN",
    "PCB_BARCODE": "DK3244138704039640B1000",
    "TRANS_TIME": "20241101083640",
    "USER_ID": "VM1305",
    "LOT_NUMBER": "U444OS",
    "XOUT_QTY": null
}


ITMVPSGTEST