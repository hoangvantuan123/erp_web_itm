import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Input, Space, Table, Typography, message, Tabs , Button} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { Search } = Input
const { Title, Text } = Typography
const { TabPane } = Tabs
import 'moment/locale/vi'
import AddEpuw from '../add/addEpuw'

export default function EtcPcbUnpackingWebSelector() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const handleNavigateToDetail = (record) => {
        navigate(`/u/action=import/ETC_PCB_UNPACKING_WEB`)
      }
    return (
        <div className="mt-1" >
            <details
                className="group p-2 [&_summary::-webkit-details-marker]:hidden  bg-white border rounded-lg"
                open
            >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                    <h2 className=" text-base font-medium">{t('Selector')}</h2>
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

                <div className="flex p-3 gap-2 ">
                    <AddEpuw />
                    <Button icon={<UploadOutlined />}  onClick={handleNavigateToDetail}  className=" text-sm"
                size="large">
                    Import Data
                    </Button>
                </div>
            </details>

        </div>
    )
}