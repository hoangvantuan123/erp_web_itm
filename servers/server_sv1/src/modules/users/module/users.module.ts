import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/sqlServer/ITMV20240117/database.service';
import { UsersService } from '../service/users.service';
import { EmployeeController } from '../controller/users.controller';

@Module({
  imports: [],
  providers: [
    DatabaseService,
    UsersService
  ],
  controllers: [EmployeeController],
  exports: [],
})
export class UsersModule { }
