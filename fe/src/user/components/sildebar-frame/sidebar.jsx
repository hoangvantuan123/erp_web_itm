import { Layout, Menu, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' // Import useEffect để xử lý responsive
import SidebarContent from './styled-components/toggle-sidebar'
import AuthUser from '../auth'
import { useTranslation } from 'react-i18next'
import {
  checkActionPermission,
  checkMenuPermission,
} from '../../../permissions'
const { Sider, Footer } = Layout
const { SubMenu } = Menu
const menuStyle = {
  borderInlineEnd: 'none',
}
import './static/css/scroll_container.css'


const SettingIcon = () => {
  return (

    <svg className="w-5 h-5 opacity-65 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.3198 10.75H4.68977C2.79977 10.75 1.25977 9.21002 1.25977 7.32002V4.69002C1.25977 2.80002 2.79977 1.26001 4.68977 1.26001H19.3198C21.2098 1.26001 22.7498 2.80002 22.7498 4.69002V7.32002C22.7498 9.21002 21.2098 10.75 19.3198 10.75ZM4.67976 2.75002C3.60976 2.75002 2.74977 3.62001 2.74977 4.68001V7.31001C2.74977 8.38001 3.61976 9.24002 4.67976 9.24002H19.3098C20.3798 9.24002 21.2398 8.37001 21.2398 7.31001V4.68001C21.2398 3.61001 20.3698 2.75002 19.3098 2.75002H4.67976Z" fill="#292D32" />
      <path d="M19.3198 22.75H4.68977C2.79977 22.75 1.25977 21.21 1.25977 19.32V16.69C1.25977 14.8 2.79977 13.26 4.68977 13.26H19.3198C21.2098 13.26 22.7498 14.8 22.7498 16.69V19.32C22.7498 21.21 21.2098 22.75 19.3198 22.75ZM4.67976 14.75C3.60976 14.75 2.74977 15.62 2.74977 16.68V19.31C2.74977 20.38 3.61976 21.24 4.67976 21.24H19.3098C20.3798 21.24 21.2398 20.37 21.2398 19.31V16.68C21.2398 15.61 20.3698 14.75 19.3098 14.75H4.67976Z" fill="#292D32" />
      <path d="M6 7.75C5.59 7.75 5.25 7.41 5.25 7V5C5.25 4.59 5.59 4.25 6 4.25C6.41 4.25 6.75 4.59 6.75 5V7C6.75 7.41 6.41 7.75 6 7.75Z" fill="#292D32" />
      <path d="M10 7.75C9.59 7.75 9.25 7.41 9.25 7V5C9.25 4.59 9.59 4.25 10 4.25C10.41 4.25 10.75 4.59 10.75 5V7C10.75 7.41 10.41 7.75 10 7.75Z" fill="#292D32" />
      <path d="M6 19.75C5.59 19.75 5.25 19.41 5.25 19V17C5.25 16.59 5.59 16.25 6 16.25C6.41 16.25 6.75 16.59 6.75 17V19C6.75 19.41 6.41 19.75 6 19.75Z" fill="#292D32" />
      <path d="M10 19.75C9.59 19.75 9.25 19.41 9.25 19V17C9.25 16.59 9.59 16.25 10 16.25C10.41 16.25 10.75 16.59 10.75 17V19C10.75 19.41 10.41 19.75 10 19.75Z" fill="#292D32" />
      <path d="M18 6.75H14C13.59 6.75 13.25 6.41 13.25 6C13.25 5.59 13.59 5.25 14 5.25H18C18.41 5.25 18.75 5.59 18.75 6C18.75 6.41 18.41 6.75 18 6.75Z" fill="#292D32" />
      <path d="M18 18.75H14C13.59 18.75 13.25 18.41 13.25 18C13.25 17.59 13.59 17.25 14 17.25H18C18.41 17.25 18.75 17.59 18.75 18C18.75 18.41 18.41 18.75 18 18.75Z" fill="#292D32" />
    </svg>

  )
}
const ScanIcon = () => {
  return <svg className="w-5 h-5 opacity-65 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9.75C1.59 9.75 1.25 9.41 1.25 9V6.5C1.25 3.6 3.61 1.25 6.5 1.25H9C9.41 1.25 9.75 1.59 9.75 2C9.75 2.41 9.41 2.75 9 2.75H6.5C4.43 2.75 2.75 4.43 2.75 6.5V9C2.75 9.41 2.41 9.75 2 9.75Z" fill="#292D32" />
    <path d="M22 9.75C21.59 9.75 21.25 9.41 21.25 9V6.5C21.25 4.43 19.57 2.75 17.5 2.75H15C14.59 2.75 14.25 2.41 14.25 2C14.25 1.59 14.59 1.25 15 1.25H17.5C20.39 1.25 22.75 3.6 22.75 6.5V9C22.75 9.41 22.41 9.75 22 9.75Z" fill="#292D32" />
    <path d="M17.5 22.75H16C15.59 22.75 15.25 22.41 15.25 22C15.25 21.59 15.59 21.25 16 21.25H17.5C19.57 21.25 21.25 19.57 21.25 17.5V16C21.25 15.59 21.59 15.25 22 15.25C22.41 15.25 22.75 15.59 22.75 16V17.5C22.75 20.4 20.39 22.75 17.5 22.75Z" fill="#292D32" />
    <path d="M9 22.75H6.5C3.61 22.75 1.25 20.4 1.25 17.5V15C1.25 14.59 1.59 14.25 2 14.25C2.41 14.25 2.75 14.59 2.75 15V17.5C2.75 19.57 4.43 21.25 6.5 21.25H9C9.41 21.25 9.75 21.59 9.75 22C9.75 22.41 9.41 22.75 9 22.75Z" fill="#292D32" />
    <path d="M14 18.25H10C7.58 18.25 6.25 16.92 6.25 14.5V9.5C6.25 7.08 7.58 5.75 10 5.75H14C16.42 5.75 17.75 7.08 17.75 9.5V14.5C17.75 16.92 16.42 18.25 14 18.25ZM10 7.25C8.42 7.25 7.75 7.92 7.75 9.5V14.5C7.75 16.08 8.42 16.75 10 16.75H14C15.58 16.75 16.25 16.08 16.25 14.5V9.5C16.25 7.92 15.58 7.25 14 7.25H10Z" fill="#292D32" />
    <path d="M19 12.75H5C4.59 12.75 4.25 12.41 4.25 12C4.25 11.59 4.59 11.25 5 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75Z" fill="#292D32" />
  </svg>

}





const Sidebar = ({ permissions }) => {
  const location = useLocation()
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('COLLAPSED_STATE')
    return savedState ? JSON.parse(savedState) : false
  })
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem('current_action_phone'),
  )
  const [currentAction, setCurrentAction] = useState(
    sessionStorage.getItem('current_action'),
  )

  const toggleSidebar = () => {
    setCollapsed(prevState => {
      const newState = !prevState
      localStorage.setItem('COLLAPSED_STATE', JSON.stringify(newState))
      return newState
    })
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (location.pathname === '/u/login') {
    return null
  }
  const handleOnClickMenuItem = (e) => {
    sessionStorage.setItem('current_action', e.key)
    setCurrentAction(e.key)
  }

  const handleOnClickMenuItemPhone = (e) => {
    sessionStorage.setItem('current_action_phone', e)
    setActiveTab(e)
  }
  return (
    <>
      {!isMobile ? (
        <Sider
          width={270}
          theme="light"
          collapsed={collapsed}
          onCollapse={toggleSidebar}
          className="p-1 border-r-[1px] h-screen overflow-auto scroll-container"
        >
          <SidebarContent collapsed={collapsed} toggleSidebar={toggleSidebar} />
          <div className='mb-5'></div>
          <Menu
            style={menuStyle}
            mode="inline"
            defaultSelectedKeys={[`${currentAction}`]}
            className="border-r-0"
            onClick={(e) => handleOnClickMenuItem(e)}
          >
            <SubMenu
              key="gen-info"
              title={
                <span className="flex items-center gap-3">
                  <span
                    className={`icon-wrapper ${collapsed ? ' justify-center mt-2' : ''}`}
                  >
                    <SettingIcon />
                  </span>
                  {!collapsed && <span>{t('THÔNG TIN NHÂN SỰ')}</span>}
                </span>
              }
            >

              <Menu.Item key="gen-info-1-2">
                <Link
                  to="/u/action=gen-info-1-2/from=view"
                  className="flex items-center justify-start"
                >
                  {t('ĐĂNG KÝ NHÂN VIÊN MỚI')}
                </Link>
              </Menu.Item>
            </SubMenu>


          </Menu>
        </Sider>
      ) : (
        <Footer className="fixed bottom-0 z-50 w-full bg-white border-t-[1px] border-b-0 pt-3 pb-6 p-0">
          <div className="flex justify-around w-full space-x-4">
            <div className="flex-1 text-center">
              <Link
                to="/u/home"
                className="flex flex-col items-center"
                onClick={() => handleOnClickMenuItemPhone('home')}
              >
                {activeTab === 'home' ? <ScanIcon /> : <ScanIcon />}
                <span
                  className={`mt-2  text-[10px] ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-500'
                    }`}
                >
                  {t('Scan')}
                </span>
              </Link>
            </div>

          </div>
        </Footer>
      )}
    </>
  )
}

export default Sidebar
