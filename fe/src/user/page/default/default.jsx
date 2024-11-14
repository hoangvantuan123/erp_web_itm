import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { Input, Space, Table, Typography, message, Tabs } from 'antd'
const { Search } = Input
import BG from '../../../assets/ItmLogo.png'
import decodeJWT from '../../utils/decode-JWT'
const { Title, Text } = Typography
const { TabPane } = Tabs
import 'moment/locale/vi'
import '../../static/css/scroll_container.css'

export default function Default() {
    const { t } = useTranslation()
    return (
        <div className="w-full h-screen bg-slate-50">
            <Helmet>
                <title>ITM - {t('Default')}</title>
            </Helmet>


            <div className="grid h-screen place-content-center bg-white px-4">
                <div className="text-center">
                    <img src={BG} className=" w-full  opacity-45 h-auto mb-10" />

                </div>
            </div>
        </div>
    )
}