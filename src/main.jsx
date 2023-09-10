import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/base.css'
import router from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider
        // 语言
        locale={zhCN}
        // 主题色
        theme={{
            token: {
                colorPrimary: 'red',
            },
        }}
    >
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    </ConfigProvider>
)
