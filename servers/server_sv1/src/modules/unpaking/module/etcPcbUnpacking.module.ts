import { Module } from '@nestjs/common';
import { UnpackingController } from '../controller/etcPcbUnpacking.controller';
import { UnpackingService } from '../service/etcPcbUnpacking.service';
import { CreateService } from 'src/common/database/oracle11/create.service';
import { FindService } from 'src/common/database/oracle11/find.service';
import { UpdateService } from 'src/common/database/oracle11/update.service';
import { DeleteService } from 'src/common/database/oracle11/delete.service';
import { DatabaseService } from 'src/common/database/oracle11/database.service';
import { CreatesImportService } from 'src/common/database/oracle11/creates.service';

@Module({
  imports: [],
  providers: [
    UnpackingService,
    CreateService,
    FindService,
    UpdateService,
    DeleteService,
    DatabaseService,
    CreatesImportService
  ],
  controllers: [UnpackingController],
  exports: [UnpackingService],
})
export class UnpackingModule { }
