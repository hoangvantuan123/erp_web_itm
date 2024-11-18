import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, QueryRunner } from 'typeorm';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/common/utils/constants';

@Injectable()
export class DatabaseService {
  private queryRunner: QueryRunner;

  constructor(@InjectConnection('ITMV20240117') private readonly ITMV20240117: Connection) {
    this.queryRunner = this.ITMV20240117.createQueryRunner();
    this.checkConnection();
  }

  private async checkConnection() {
    try {
      if (this.ITMV20240117.isConnected) {
        console.log(SUCCESS_MESSAGES.SUCCESS_ITMV20240117);
      } else {
        console.error(ERROR_MESSAGES.ERROR_ITMV20240117);
      }
    } catch (error) {
      console.error(ERROR_MESSAGES.DATABASE_ERROR, error);
    }
  }

  async executeQuery(query: string): Promise<any> {
    try {
      return await this.queryRunner.query(query);
    } catch (error) {
      throw error;
    }
  }

  async executeQueryTest(query: string): Promise<any> {
    try {
      const result = await this.queryRunner.query(query);

      if (Array.isArray(result)) {
        return result;
      }

      return { message: 'Query executed successfully', result: result };
    } catch (error) {
      throw error;
    }
  }

}
