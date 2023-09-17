import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    // 基础路径
    base: 'reactApp/',
    plugins: [react()],
    resolve: {
        //配置别名
        alias: {
            // eslint-disable-next-line no-undef
            '@': path.resolve(__dirname, 'src'),
        }
    },
    //生产模式打包配置
    build: {
        //指定输出路径
        outDir: 'dist',
        //生成静态资源的存放路径
        assetsDir: "assets",
        //是否禁用最小化混淆，esbuild打包速度最快，terser打包体积最小。
        minify: 'terser',
        terserOptions: {
            compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true,
            }
        },
        rollupOptions: {
            output: {
                // manualChunks 配置
                manualChunks: {
                    // 将 React 相关库打包成单独的 chunk 中
                    'react-vendor': ['react', 'react-dom'],
                    // 将 Lodash 库的代码单独打包
                    'lodash': ['lodash-es'],
                    // 将组件库的代码打包
                    'library': ['antd'],
                },
            },
        }
    },
    //静态资源服务的文件夹
    publicDir: "public",
    // 对css的行为进行配置
    css: {
        preprocessorOptions: {
            less: {
                // 整个的配置对象都会最终给到less的执行参数（全局参数）中去
                math: 'always',
                globalVars: {
                    // 全局变量
                    mainColor: 'red'
                }
            }
        }
    },
    server: {
        // 是否开启 https
        https: false,
        // 端口号
        port: 3000,
        // 监听所有地址
        host: '0.0.0.0',
        // 服务启动时是否自动打开浏览器
        open: true,
        // 允许跨域
        cors: true,
        // 反向代理配置
        proxy: {
            '/api': {
                target: 'http://xxxxxx',
                changeOrigin: true,
            },
        },
    },
})
