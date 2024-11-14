import { useState, useEffect, useCallback } from 'react';
import { Table, Checkbox, Modal, Drawer, Row, Col, Tooltip, Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { GetEtcPcbUnpackingWeb } from '../../../features/unpacking/getEtcPcbUnpackingWeb';
import { Helmet } from 'react-helmet';
import EtcPcbUnpackingWebSelector from '../../components/selector/etcPcbUnpackingWebSelector';
const { Content } = Layout;

export default function PageEtcPcbUnpackingWeb({ permissions, isMobile }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const today = moment().startOf('day');

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [state, setState] = useState({
        data: [],
        loading: true,
        total: 0,
        page: 1,
        limit: 50,
        dateRange: [null, null],
        selectedRowKeys: [],
        visibleColumns: {},
    });
    const columnConfig = [
        { key: 'PLANT', label: 'PLANT' },
        { key: 'MATERIAL_LOT', label: 'MATERIAL LOT' },
        { key: 'PCB_BARCODE', label: 'PCB BARCODE' },
        { key: 'TRANS_TIME', label: 'TRANS TIME' },
        { key: 'USER_ID', label: 'USER ID' },
        { key: 'LOT_NUMBER', label: 'LOT NUMBER' },
        { key: 'XOUT_QTY', label: 'XOUT QTY' },
    ];

    const initialVisibleColumns = columnConfig.reduce((acc, { key }) => {
        acc[key] = true;
        return acc;
    }, {});

    useEffect(() => {
        const storedColumns = localStorage.getItem('visibleColumns');
        setState((prevState) => ({
            ...prevState,
            visibleColumns: storedColumns ? JSON.parse(storedColumns) : initialVisibleColumns,
        }));
    }, []);

    const fetchData = async () => {
        setState((prevState) => ({ ...prevState, loading: true }));
        try {
            const response = await GetEtcPcbUnpackingWeb(state.page, state.limit, {});
            if (response.success) {
                setState((prevState) => ({
                    ...prevState,
                    data: response.data,
                    total: response.total,
                }));
            } else {
                setState((prevState) => ({ ...prevState, data: [] }));
            }
        } catch (error) {
            setState((prevState) => ({ ...prevState, data: [] }));
        } finally {
            setState((prevState) => ({ ...prevState, loading: false }));
        }
    };

    useEffect(() => {
        fetchData();
    }, [state.page, state.limit]);

    const handleTableChange = (pagination) => {
        setState((prevState) => ({
            ...prevState,
            page: pagination.current,
            limit: pagination.pageSize,
        }));
    };

    const handleColumnVisibilityChange = useCallback((key, isVisible) => {
        const updatedColumns = { ...state.visibleColumns, [key]: isVisible };
        setState((prevState) => ({
            ...prevState,
            visibleColumns: updatedColumns,
        }));
        localStorage.setItem('visibleColumns', JSON.stringify(updatedColumns));
    }, [state.visibleColumns]);



    const onSelectChange = (newSelectedRowKeys) => {
        setState((prevState) => ({
            ...prevState,
            selectedRowKeys: newSelectedRowKeys,
        }));
    };

    const handleCheckboxChange = (id) => {
        setState((prevState) => {
            const isSelected = prevState.selectedRowKeys.includes(id);
            return {
                ...prevState,
                selectedRowKeys: isSelected
                    ? prevState.selectedRowKeys.filter((key) => key !== id)
                    : [...prevState.selectedRowKeys, id],
            };
        });
    };

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setState((prevState) => ({
            ...prevState,
            selectedRowKeys: checked ? prevState.data.map((item) => item.PCB_BARCODE) : [],
        }));
    };


    const columns = [
        {
            title: (
                <Checkbox
                    onChange={handleSelectAll}
                    checked={state.selectedRowKeys.length === state.data.length}
                />
            ),
            dataIndex: 'checkbox',
            render: (_, record) => (
                <Checkbox
                    checked={state.selectedRowKeys.includes(record.PCB_BARCODE)}
                    onChange={() => handleCheckboxChange(record.PCB_BARCODE)}
                />
            ),
        },
        ...columnConfig.map(({ key, label }) => ({
            title: t(label),
            dataIndex: key,
            key: key,
            render: (text, record) => {

                return state.visibleColumns[key] ? text : null;
            },

            sorter: (a, b) => {
                if (key === 'TRANS_TIME') {
                    return moment(a[key]).isBefore(moment(b[key])) ? -1 : 1;
                } else {
                    return (a[key] || '').localeCompare(b[key] || '');
                }
            },
        })),
    ];

    const renderDetailModal = () => (
        <Modal
            title={selectedApplicant?.full_name}
            visible={isDetailModalOpen}
            onCancel={() => setIsDetailModalOpen(false)}
        >
        </Modal>
    );

    const renderColumnVisibilityDrawer = () => (
        <Drawer
            title={t('Chọn cột hiển thị')}
            placement="right"
            closable
            onClose={() => setIsDrawerVisible(false)}
            visible={isDrawerVisible}
        >
            <Row gutter={16}>
                {columnConfig.map(({ key, label }) => (
                    <Col span={24} key={key} className="mt-3">
                        <Checkbox
                            checked={state.visibleColumns[key]}
                            onChange={(e) => handleColumnVisibilityChange(key, e.target.checked)}
                        >
                            {t(label)}
                        </Checkbox>
                    </Col>
                ))}
            </Row>
        </Drawer>
    );

    const renderTable = () => (

        <Table
            rowKey="PCB_BARCODE"
            rowSelection={{
                selectedRowKeys: state.selectedRowKeys,
                onChange: onSelectChange,
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
            }}
            columns={columns.filter((column) => state.visibleColumns[column.key])}
            dataSource={state.data}
            size="small"
            bordered

            pagination={{
                current: state.page,
                pageSize: state.limit,
                total: state.total,
                showSizeChanger: true,
                showTotal: (total) => `${t('column_table.total')} ${total} ${t('column_table.item')}`,
                onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
            }}
            loading={state.loading}
            className='cursor-pointer'
        />
    );

    const renderKanban = () => (
        <div className="pb-20">
            <Row gutter={16}>
            </Row>
        </div>
    );

    return (
        <div className="w-full h-screen flex flex-col  bg-slate-50">
            <Helmet>
                <title>ITM - {t('ETC PCB UNPACKING WEB')}</title>
            </Helmet>
            <div className="p-2 flex flex-col ">
                <h1 className=" text-base font-bold text-gray-900">{t('ETC PCB UNPACKING WEB')}</h1>
                <EtcPcbUnpackingWebSelector />
            </div>

            <Layout>
                <Content className="flex-1 overflow-auto bg-slate-50 p-2">
                    {isMobile ? renderKanban() : (
                        <div>
                            {renderTable()}
                            {renderDetailModal()}
                            {renderColumnVisibilityDrawer()}
                        </div>
                    )}
                </Content>
            </Layout>
        </div>
    );
}
