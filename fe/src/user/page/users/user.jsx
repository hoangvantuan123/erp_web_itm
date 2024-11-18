import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { Input, Row, Col, Form, Button, Typography, Radio, Tabs } from 'antd'
import { SearchOutlined, SaveOutlined, DeleteOutlined, PlusOutlined, UserOutlined, BarsOutlined, TableOutlined, PrinterOutlined } from '@ant-design/icons';
const { Title } = Typography
import '../../../static/css/style.css'

export default function InfoUser() {
    const { t } = useTranslation()
    const { id } = useParams()
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Ngày bắt đầu',
            children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: 'Bổ nhiệm, Chỉ thị',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Gia đình',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Địa chỉ',
            children: 'Content of Tab Pane 4',
        },
        {
            key: '5',
            label: 'Nghĩa vụ đi lính',
            children: 'Content of Tab Pane 5',
        },
        {
            key: '6',
            label: 'Học lực, trình độ học vấn',
            children: 'Content of Tab Pane 6',
        },
        {
            key: '7',
            label: 'Ngôn ngữ học',
            children: 'Content of Tab Pane 7',
        },
        {
            key: '8',
            label: 'Khen thưởng kỷ luật',
            children: 'Content of Tab Pane 8',
        },
        {
            key: '9',
            label: 'Giấy phép',
            children: 'Content of Tab Pane 9',
        },
        {
            key: '10',
            label: 'Sức khỏe',
            children: 'Content of Tab Pane 10',
        },
        {
            key: '11',
            label: 'Công tác',
            children: 'Content of Tab Pane 11',
        },
        {
            key: '12',
            label: 'Kinh nghiệm bên ngoài',
            children: 'Content of Tab Pane 12',
        },
        {
            key: '13',
            label: 'Thông tin bổ sung nhân viên',
            children: 'Content of Tab Pane 13',
        },
        {
            key: '14',
            label: 'Quản lý tập tin đính kèm',
            children: 'Content of Tab Pane 14',
        },
    ];
    return (
        <div className="w-full h-full bg-slate-50 p-3 overflow-hidden">
            <Helmet>
                <title>ITM - {t('User')}</title>
            </Helmet>

            <div className="parent h-full flex flex-col">
                <Row gutter={[12, 12]} className="h-[70px]">
                    <Col span={24} className="h-full p-2">
                        <div className="w-full p-2 h-full border bg-white rounded-lg">
                            <div className="flex items-center gap-2">

                                <Button type="default" icon={<SaveOutlined />} size="middle">
                                    Lưu
                                </Button>
                                <Button type="primary" danger icon={<DeleteOutlined />} size="middle" >
                                    Xóa
                                </Button>
                                <Button type="default"  icon={<PrinterOutlined />} size="middle" >
                                    In
                                </Button>

                            </div>

                        </div>
                    </Col>
                </Row>
                <Row gutter={[12, 12]} className=" h-full flex-grow">
                    <Col xs={24} sm={6} md={4} lg={6} className="h-full">
                        <div className="w-full p-2  h-screen overflow-auto scroll-container pb-20 border bg-white rounded-lg">
                            <Title level={5}>{t('Personal Information')}</Title>
                            <Row gutter={[12, 12]} className="">
                                <Col span={24}>
                                    <div className="w-24 h-24 bg-slate-400" />
                                </Col>
                                <Col span={24}>
                                    <Form layout="vertical">
                                        <Row gutter={16}>
                                            <Col span={14}>
                                                <Form.Item label={t('Họ Tên')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={10}>
                                                <Form.Item label={t('Mã nhân viên')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Thuộc bộ phận')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Bộ phận làm việc')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Cấp bậc')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Bậc lương')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Trạng thái làm việc')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Nhóm lương')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Tiếng anh')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Chữ Hán')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Vị trí')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Chức vị')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Part')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Section')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Só CCCD')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Team')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={t('Hình thái lương')}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col xs={24} sm={18} md={20} lg={18} className="h-full overflow-auto">
                        <div className="w-full p-2 h-full border bg-white rounded-lg"><Tabs defaultActiveKey="1" size='small' type="card" items={items} onChange={onChange} /></div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
