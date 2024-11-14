import { Controller, Get, Post, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { UnpackingService } from '../service/etcPcbUnpacking.service';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from 'src/common/utils/constants';

@Controller('v1/unpacking')
export class UnpackingController {
  constructor(private readonly unpackingService: UnpackingService) { }


  @Get('paginated')
  async getPaginatedData(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
    @Query() filters: Record<string, any>,
  ) {
    try {
      const result = await this.unpackingService.getPaginatedData(page, limit, filters);
      return { status: true, message: SUCCESS_MESSAGES.REQUEST_SUCCESS, data: result };
    } catch (error) {
      return {
        status: false,
        message: error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }


  /* {
    "column1": "value1",
    "column2": "value2",
    "column3": "value3"
  }
   */
  @Post('create')
  async createUnpacking(@Body() data: any) {
    try {
      if (data && data.hasOwnProperty('data')) {
        data = data.data;
      }
      const result = await this.unpackingService.createUnpacking(data);

      return {
        status: true,
        message: SUCCESS_MESSAGES.RECORD_CREATED,
        data: result,
      };
    } catch (error) {

      return {
        status: false,
        message: error.message || ERROR_MESSAGES.INVALID_DATA,
        data: null,
      };
    }
  }



  @Post('unpacking-import')
  async createUnpackingImport(@Body() data: any) {
    try {
      const formattedData = this.formatData(data.data);
      const result = await this.unpackingService.createUnpackingImport(formattedData);
      return {
        status: true,
        message: result.message,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message || ERROR_MESSAGES.INVALID_DATA,
      };
    }
  }


  formatData(rawData: any[]): any[] {
    const columnNames = rawData[0];
    const formattedData = rawData.slice(1).map((row: any[]) => {
      const rowObj: any = {};
      columnNames.forEach((colName: string, index: number) => {
        rowObj[colName] = row[index];
      });
      return rowObj;
    });
    return formattedData;
  }

}
