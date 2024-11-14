import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Input, Space, Table, Typography, message, Tabs, Button, DatePicker, Select } from 'antd'
import { SearchOutlined, SaveOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
const { Search } = Input
const { Title, Text } = Typography
const { TabPane } = Tabs
const { RangePicker } = DatePicker;
import 'moment/locale/vi'

export default function UsersSelectors() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className="mt-1" >
            <details
                className="group p-2 [&_summary::-webkit-details-marker]:hidden  bg-white border rounded-lg"
                open
            >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                    <h2 className=" text-base font-medium">{t('CÔNG CỤ')}</h2>
                    <span className="relative size-5 shrink-0">
                        <svg
                            className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </span>
                </summary>
                <div className="flex p-3 gap-4">
                    <Button type="primary" icon={<SearchOutlined />} size="large">
                        Truy vấn
                    </Button>
                    <Button type="default" icon={<SaveOutlined />} size="large">
                        Lưu
                    </Button>
                    <Button type="primary" danger icon={<DeleteOutlined />} size="large">
                        Xóa
                    </Button>
                    <Button type="dashed" icon={<PlusOutlined />} size="large">
                        Thêm
                    </Button>
                </div>
                <div className="flex p-3 gap-4">
                    <div className='flex flex-col'>
                        <label htmlFor="datePicker">Thời gian</label>
                        <RangePicker id="datePicker" size="large" />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="typeSelect">Phân loại nhân viên</label>
                        <Select
                            id="typeSelect"
                            defaultValue="official"
                            style={{
                                width: 120,
                            }}
                            size='large'
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'official',
                                    label: 'Official',
                                },
                                {
                                    value: 'seasonal',
                                    label: 'Seasonal',
                                }
                            ]}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="typeSelect">Nhân viên</label>
                        <Input size="large" />
                    </div>
                </div>

            </details>

        </div>
    )
}