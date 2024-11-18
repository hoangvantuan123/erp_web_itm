
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateXmlService {

  async generateUsersXml(result: any[]): Promise<string> {
    return `<ROOT>${result.map(item => `
      <DataBlock1>
        <WorkingTag>${item.WorkingTag}</WorkingTag>
        <IDX_NO>${item.IDX_NO}</IDX_NO>
        <DataSeq>${item.DataSeq}</DataSeq>
        <Status>${item.Status}</Status>
        <Selected>${item.Selected}</Selected>
        <EmpFamilyName>${item.EmpFamilyName}</EmpFamilyName>
        <EmpFirstName>${item.EmpFirstName}</EmpFirstName>
        <EmpName>${item.EmpName}</EmpName>
        <EmpSeq>${item.EmpSeq}</EmpSeq>
        <EmpID>${item.EmpID}</EmpID>
        <ResidID>${item.ResidID}</ResidID>
        <EntDate>${item.EntDate}</EntDate>
        <UMEmpType>${item.UMEmpType}</UMEmpType>
        <EmpChnName>${item.EmpChnName}</EmpChnName>
        <EmpEngFirstName>${item.EmpEngFirstName}</EmpEngFirstName>
        <EmpEngLastName>${item.EmpEngLastName}</EmpEngLastName>
        <Remark>${item.Remark}</Remark>
        <TABLE_NAME>DataBlock1</TABLE_NAME>
      </DataBlock1>`).join('')}</ROOT>`;
  }
}
