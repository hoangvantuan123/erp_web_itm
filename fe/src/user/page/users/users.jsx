import { useState, useEffect, useCallback, useMemo } from 'react';
import { Layout, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import UsersSelectors from '../../components/selector/usersSelector';
import { lazy, Suspense } from 'react';
import TableUsers from '../../components/table/users';
import Spinner from '../default/load';
import { SHREmpInQuery } from '../../../features/users/SHREmpInQuery';
import { SCACodeHelpQuery } from '../../../features/users/SCACodeHelpQuery';
import { SHREmpInCheck } from '../../../features/users/SHREmpInCheck';
import CodeHelpAddUsers from '../../components/modal/codeHelpUsers';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../../utils/constants';
import { debounce } from 'lodash';
const { Content } = Layout;
const SheetUsers = lazy(() => import('../../components/sheet/sheetUsers'));

export default function Users({ permissions, isMobile }) {
  const { t } = useTranslation();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [value, setValue] = useState('Table');
  const [loading, setLoading] = useState(true);
  const [loadingCodeHelp, setLoadingCodeHelp] = useState(false);
  const [errorCodeHelp, setErrorCodeHelp] = useState('');
  const [keyword, setKeyword] = useState('');
  const [keyEmIDWord, setKeyEmIDword] = useState('');
  const [subConditionSql, setSubConditionSql] = useState('');
  const [data, setData] = useState([]);
  const [dataCodeHelp, setDataCodeHelp] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [umEmpType, setUmEmpType] = useState(0);
  const [empSeq, setEmpSeq] = useState(null);
  const [conditionSeq, setConditionSeq] = useState(1)
  const [dateRange, setDateRange] = useState([null, null]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmpIDs, setSelectedEmpIDs] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  let today = new Date();
  let year = today.getFullYear();
  let month = (today.getMonth() + 1).toString().padStart(2, '0');
  let day = today.getDate().toString().padStart(2, '0');
  let formattedDate = `${year}${month}${day}`;
  const [startDate, endDate] = Array.isArray(dateRange) && dateRange.length === 2
    ? dateRange.map((date, index) => {
      if (date) {
        return date.format('YYYYMMDD');
      } else {
        return index === 0 ? formattedDate : '';
      }
    })
    : [null, null];

  const onRowClickedCodeHelp = (event) => {
    const { EmpID, EmpName, EmpSeq } = event.data;
    setKeyword(EmpName);
    setKeyEmIDword(EmpID);
    setEmpSeq(EmpSeq)
    setModalVisible(false);
  };


  const loadSheetUsers = useCallback(() => {
    if (!dataLoaded) {
      setDataLoaded(true);
    }
  }, [dataLoaded]);

  const formData = {
    workingTag: 'A',
    idx_no: '1',
    status: '0',
    dataSeq: '1',
    selected: '1',
    isChangedMst: '0',
    umEmpType: umEmpType,
    empSeq: '',
    frEntDate: startDate,
    toEntDate: endDate,
  };

  const formDataEmpSeq = {
    workingTag: 'A',
    idx_no: '1',
    status: '0',
    dataSeq: '1',
    selected: '1',
    isChangedMst: '0',
    umEmpType: '',
    empSeq: empSeq,
    frEntDate: '',
    toEntDate: '',
  };


  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      SHREmpInQuery(formData)
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    }, 100);

    return () => clearTimeout(timer);
  }, [umEmpType, startDate, endDate]);


  useEffect(() => {
    loadSheetUsers();
  }, [loadSheetUsers]);



  const handleSearch = async () => {
    setLoadingCodeHelp(true);
    setModalVisible(true);
    setErrorCodeHelp('');
    try {
      const response = await SCACodeHelpQuery(keyword, conditionSeq, subConditionSql);
      if (response.success) {
        setDataCodeHelp(response.data);
      }
    } catch (err) {
      setErrorCodeHelp('Error from API: ' + (err.response ? err.response.data.message : err.message));
    } finally {
      setLoadingCodeHelp(false);
    }
  };
  const handleEmpSeqQuery = () => {
    if (empSeq !== null) {
      SHREmpInQuery(formDataEmpSeq)
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    }
  };



  const handleDeleteDebounced = useCallback(debounce(() => {
    if (selectedEmpIDs.length === 0) {
      message.warning('Chưa có nhân viên nào để xóa.');
      return;
    }
    const loadingMessage = message.loading('Đang xóa...', 0);

    const xmlData = selectedEmpIDs.map((row, index) => {
      return `
        <DataBlock1>
          <WorkingTag>D</WorkingTag>
          <IDX_NO>${index + 1}</IDX_NO>
          <DataSeq>${index + 1}</DataSeq>
          <Status>0</Status>
          <Selected>0</Selected>
          <EmpFamilyName>${row.EmpFamilyName}</EmpFamilyName>
          <EmpFirstName>${row.EmpFirstName}</EmpFirstName>
          <EmpName>${row.EmpName}</EmpName>
          <EmpSeq>${row.EmpSeq}</EmpSeq>
          <EmpID>${row.EmpID}</EmpID>
          <ResidID>${row.ResidID}</ResidID>
          <EntDate>${row.EntDate}</EntDate>
          <UMEmpType>${row.UMEmpType}</UMEmpType>
          <EmpChnName>${row.EmpChnName}</EmpChnName>
          <EmpEngFirstName>${row.EmpEngFirstName}</EmpEngFirstName>
          <EmpEngLastName>${row.EmpEngLastName}</EmpEngLastName>
          <Remark>${row.Remark}</Remark>
          <TABLE_NAME>DataBlock1</TABLE_NAME>
        </DataBlock1>
      `;
    }).join('\n');

    const workingTag = 'D';

    SHREmpInCheck(xmlData, workingTag)
      .then((req) => {
        if (req.success === true) {
          loadingMessage();
          message.success(SUCCESS_MESSAGES.DELETE_DATA);
          SHREmpInQuery(formData)
            .then(response => {
              setData(response.data);
              setLoadingDelete(false);
            })
            .catch(error => {
              setLoadingDelete(false);
              message.error(ERROR_MESSAGES.ERROR_FE);
            });
        } else {
          loadingMessage();
          message.error(req.message);
          setLoadingDelete(false);
        }
      })
      .catch((err) => {
        loadingMessage();
        message.error(ERROR_MESSAGES.ERROR_FE);
        setLoadingDelete(false);
      });
  }, 300), [selectedEmpIDs]);



  const content = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }
    return value === "Table"
      ? <TableUsers isDrawerVisible={isDrawerVisible} data={data} loading={loading} setIsDrawerVisible={setIsDrawerVisible} setSelectedEmpIDs={setSelectedEmpIDs} />
      : dataLoaded && (
        <Suspense fallback={<Spinner />}>
          <SheetUsers data={data} loading={loading} />
        </Suspense>
      );
  }, [value, data, loading, dataLoaded, isDrawerVisible]);

  return (
    <div className="w-full h-screen flex flex-col bg-slate-50">
      <Helmet>
        <title>ITM - {t('ĐĂNG KÝ THÀNH VIÊN MỚI')}</title>
      </Helmet>
      <div className="p-2 flex flex-col">
        <h1 className="text-base font-bold text-gray-900">{t('ĐĂNG KÝ THÀNH VIÊN MỚI')}</h1>
        <UsersSelectors
          setValue={setValue}
          value={value}
          setIsDrawerVisible={setIsDrawerVisible}
          isDrawerVisible={isDrawerVisible}
          setUmEmpType={setUmEmpType}
          setDateRange={setDateRange}
          dateRange={dateRange}
          handleSearch={handleSearch}
          loadingCodeHelp={loadingCodeHelp}
          setKeyword={setKeyword}
          keyword={keyword}
          setKeyEmIDword={setKeyEmIDword}
          keyEmIDWord={keyEmIDWord}
          setConditionSeq={setConditionSeq}
          handleEmpSeqQuery={handleEmpSeqQuery}
          handleDeleteDebounced={handleDeleteDebounced}
        />
      </div>
      <Layout className="p-2 bg-slate-50">
        <Content className="flex-1  bg-slate-50">
          {content}
        </Content>
      </Layout>

      {modalVisible && <CodeHelpAddUsers
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        data={dataCodeHelp}
        keyword={keyword}
        setKeyword={setKeyword}
        loadingCodeHelp={loadingCodeHelp}
        handleSearch={handleSearch} onRowClickedCodeHelp={onRowClickedCodeHelp} setConditionSeq={setConditionSeq} conditionSeq={conditionSeq} subConditionSql={subConditionSql} setSubConditionSql={setSubConditionSql} />}
    </div>
  );
}
