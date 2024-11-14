import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { SimpleQueryResult } from 'src/common/interfaces/simple-query-result.interface';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly usersService: UsersService) { }

    @Post('process-data')
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
        console.log("body" , body)
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
}
