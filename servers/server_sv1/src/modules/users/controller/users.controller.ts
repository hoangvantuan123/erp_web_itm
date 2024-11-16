import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { SimpleQueryResult } from 'src/common/interfaces/simple-query-result.interface';

@Controller('v1/mssql/users')
export class EmployeeController {
    constructor(private readonly usersService: UsersService) { }

    @Post('SHREmpInQuery')
    async processSHREmpInQuery(@Body() body: any): Promise<SimpleQueryResult> {
        const {
            xmlDocument,
            xmlFlags,
            serviceSeq,
            workingTag,
            companySeq,
            languageSeq,
            userSeq,
            pgmSeq,
        } = body;
        return this.usersService._SHREmpInQuery(
            xmlDocument,
            xmlFlags,
            serviceSeq,
            workingTag,
            companySeq,
            languageSeq,
            userSeq,
            pgmSeq,
        );
    }
    @Post('SCACodeHelpQuery')
    async processSCACodeHelpQuery(@Body() body: any): Promise<SimpleQueryResult> {
        const {
            workingTag,
            languageSeq,
            codeHelpSeq,
            companySeq,
            keyword,
            param1,
            param2,
            param3,
            param4,
            conditionSeq,
            pageCount,
            pageSize,
            subConditionSql,
            accUnit,
            bizUnit,
            factUnit,
            deptSeq,
            wkDeptSeq,
            empSeq,
            userSeq
        } = body;
        return this.usersService._SCACodeHelpQuery(
            workingTag,
            languageSeq,
            codeHelpSeq,
            companySeq,
            keyword,
            param1,
            param2,
            param3,
            param4,
            conditionSeq,
            pageCount,
            pageSize,
            subConditionSql,
            accUnit,
            bizUnit,
            factUnit,
            deptSeq,
            wkDeptSeq,
            empSeq,
            userSeq
        );
    }

}
