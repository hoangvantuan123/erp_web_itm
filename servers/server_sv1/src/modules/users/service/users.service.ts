// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { SimpleQueryResult } from 'src/common/interfaces/simple-query-result.interface';
import { DatabaseService } from 'src/common/database/sqlServer/ITMV20240117/database.service';
import { ERROR_MESSAGES } from 'src/common/utils/constants';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }

  async _SHREmpInQuery(
    xmlDocument: string,
    xmlFlags: number,
    serviceSeq: number,
    workingTag: string,
    companySeq: number,
    languageSeq: number,
    userSeq: number,
    pgmSeq: number,
  ): Promise<SimpleQueryResult> {
    const escapedXmlDocument = xmlDocument.replace(/'/g, "''");

    const query = `
      EXEC dbo._SHREmpInQuery
        @xmlDocument = N'${escapedXmlDocument}',
        @xmlFlags = ${xmlFlags},
        @ServiceSeq = ${serviceSeq},
        @WorkingTag = N'${workingTag}',
        @CompanySeq = ${companySeq},
        @LanguageSeq = ${languageSeq},
        @UserSeq = ${userSeq},
        @PgmSeq = ${pgmSeq};
    `;

    try {
      const result = await this.databaseService.executeQuery(query);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: ERROR_MESSAGES.DATABASE_ERROR };
    }
  }
}
