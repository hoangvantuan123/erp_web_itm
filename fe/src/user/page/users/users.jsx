import { useState, useEffect, useCallback } from 'react';
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import UsersSelectors from '../../components/selector/usersSelector';
import SheetUsers from '../../components/sheet/sheetUsers';

const { Content } = Layout;

export default function Users({ permissions, isMobile }) {
  const { t } = useTranslation();
  const [dataLoaded, setDataLoaded] = useState(false);

  // Lazy loading for SheetUsers component
  const loadSheetUsers = useCallback(() => {
    if (!dataLoaded) {
      setDataLoaded(true);
    }
  }, [dataLoaded]);

  useEffect(() => {
    loadSheetUsers();
  }, [loadSheetUsers]);

  return (
    <div className="w-full h-screen flex flex-col bg-slate-50">
      <Helmet>
        <title>ITM - {t('ĐĂNG KÝ THÀNH VIÊN MỚI')}</title>
      </Helmet>
      <div className="p-2 flex flex-col ">
        <h1 className="text-base font-bold text-gray-900">{t('ĐĂNG KÝ THÀNH VIÊN MỚI')}</h1>
        <UsersSelectors />
      </div>
      <Layout className="p-2 bg-slate-50">
        <Content className="flex-1 h-screen overflow-auto bg-slate-50">
          {dataLoaded && <SheetUsers />}
        </Content>
      </Layout>
    </div>
  );
}
