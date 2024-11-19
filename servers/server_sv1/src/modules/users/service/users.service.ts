// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { SimpleQueryResult } from 'src/common/interfaces/simple-query-result.interface';
import { DatabaseService } from 'src/common/database/sqlServer/ITMV20240117/database.service';
import { GenerateXmlService } from '../generate-xml/generate-xml.service';
import { ERROR_MESSAGES } from 'src/common/utils/constants';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService, private readonly generateXmlService: GenerateXmlService) { }

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



  async _SCACodeHelpQuery(
    workingTag: string,
    languageSeq: number,
    codeHelpSeq: number,
    companySeq: number,
    keyword: string,
    param1: string,
    param2: string,
    param3: string,
    param4: string,
    conditionSeq: number,
    pageCount: number,
    pageSize: number,
    subConditionSql: string,
    accUnit: number,
    bizUnit: number,
    factUnit: number,
    deptSeq: number,
    wkDeptSeq: number,
    empSeq: number,
    userSeq: number
  ): Promise<SimpleQueryResult> {

    const sanitizeString = (input: string | undefined | null): string => {
      return input && typeof input === 'string' ? input : '';
    };

    const sanitizedKeyword = sanitizeString(keyword);
    const sanitizedParam1 = sanitizeString(param1);
    const sanitizedParam2 = sanitizeString(param2);
    const sanitizedParam3 = sanitizeString(param3);
    const sanitizedParam4 = sanitizeString(param4);
    const sanitizedSubConditionSql = sanitizeString(subConditionSql);

    const query = `
    EXEC dbo._SCACodeHelpQuery
    @WorkingTag = N'${workingTag}',
    @LanguageSeq = ${languageSeq},
    @CodeHelpSeq = ${codeHelpSeq},
    @CompanySeq = ${companySeq},
    @Keyword = N'${sanitizedKeyword}',
    @Param1 = N'${sanitizedParam1}',
    @Param2 = N'${sanitizedParam2}',
    @Param3 = N'${sanitizedParam3}',
    @Param4 = N'${sanitizedParam4}',
    @ConditionSeq = ${conditionSeq},
    @PageCount = ${pageCount},
    @PageSize = ${pageSize},
    @SubConditionSql = N'${sanitizedSubConditionSql}',
    @AccUnit = ${accUnit},
    @BizUnit = ${bizUnit},
    @FactUnit = ${factUnit},
    @DeptSeq = ${deptSeq},
    @WkDeptSeq = ${wkDeptSeq},
    @EmpSeq = ${empSeq},
    @UserSeq = ${userSeq};
  `;

    try {
      const result = await this.databaseService.executeQuery(query);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: ERROR_MESSAGES.DATABASE_ERROR };
    }
  }



  async _SHREmpInSave(result: any[], xmlFlags: number, serviceSeq: number, workingTag: string, companySeq: number, languageSeq: number, userSeq: number, pgmSeq: number): Promise<SimpleQueryResult> {
    const xmlDocument = await this.generateXmlService.generateUsersXml(result);
    const query = `
      EXEC _SHREmpInSave
        @xmlDocument = N'${xmlDocument}',
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
      return { success: false, message: error.message || ERROR_MESSAGES.DATABASE_ERROR };
    }
  }

  async _SHREmpInCheck(xmlDocument: string, xmlFlags: number, serviceSeq: number, workingTag: string, companySeq: number, languageSeq: number, userSeq: number, pgmSeq: number): Promise<SimpleQueryResult> {
    const escapedXmlDocument = xmlDocument.replace(/'/g, "''");
    const query = `
      EXEC dbo._SHREmpInCheck
        @xmlDocument = N'<ROOT> ${escapedXmlDocument} </ROOT>',
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
      const hasInvalidEmpSeq = result.some((item: any) => item.EmpSeq === 0);

      if (hasInvalidEmpSeq) {
        return { success: false, message: ERROR_MESSAGES.ERROR_DUP };
      }

      await this._SHREmpInSave(result, xmlFlags, serviceSeq, workingTag, companySeq, languageSeq, userSeq, pgmSeq);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message || ERROR_MESSAGES.DATABASE_ERROR };
    }
  }



  async SHREmpInfoQuery(
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
      EXEC dbo._SHREmpInfoQuery
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
  async SHRBasEmpPhotoQuery(
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
      EXEC dbo._SHRBasEmpPhotoQuery
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



  async SHREmpDateQuery(
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
      EXEC dbo._SHREmpDateQuery
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


  async SHREmpOneQuery(
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
      EXEC dbo._SHREmpOneQuery
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

  async _SHRBasFamilyQuery(
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
      EXEC dbo._SHRBasFamilyQuery
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
