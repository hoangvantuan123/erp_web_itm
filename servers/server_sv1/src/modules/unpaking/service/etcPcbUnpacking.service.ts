import { Injectable } from '@nestjs/common';
import { CreateService } from 'src/common/database/oracle11/create.service';
import { FindService } from 'src/common/database/oracle11/find.service';
import { ERROR_MESSAGES } from 'src/common/utils/constants';
import { CreatesImportService } from 'src/common/database/oracle11/creates.service';

@Injectable()
export class UnpackingService {
  constructor(private readonly findService: FindService, private readonly createService: CreateService,

    private readonly createServiceImport: CreatesImportService
  ) { }

  async getPaginatedData(
    page: number,
    limit: number,
    filters: Record<string, any>,
  ) {
    try {
      const { page: _, limit: __, ...validFilters } = filters;

      const result = await this.findService.findAllWithPagination11(
        'ETC_PCB_UNPACKING_WEB',
        page,
        limit,
        validFilters,
      );

      return result;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

  async createUnpacking(data: any) {
    try {

      if (data.hasOwnProperty('data')) {
        data = data.data;
      }

      const columns = Object.keys(data);
      const values = Object.values(data);


      const records = [values];

      return await this.createService.createRecords('ETC_PCB_UNPACKING_WEB', columns, records);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.INVALID_DATA);
    }
  }

  async createUnpackingImport(data: any) {
    try {
      return await this.createServiceImport.insertDataIntoDB('ETC_PCB_UNPACKING_WEB', data);
    } catch (error) {
      console.error('Service Error:', error);
      throw new Error(ERROR_MESSAGES.INVALID_DATA);
    }
  }



}
