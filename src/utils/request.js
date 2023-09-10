import axios from 'axios';
// import { useUserInfoStore } from '@/stores'

const SUCCESS_CODE = 1000;

class Request {
    constructor(config) {
        this.instance = axios.create(config);
        this.abortControllerMap = new Map();

        this.instance.interceptors.request.use((config) => {
            // if (config.url !== '/login') {
            //     const token = useUserInfoStore.getState().userInfo?.token;
            //     if (token) config.headers['x-token'] = token;
            // }
            const controller = new AbortController();
            const url = config.url || '';
            config.signal = controller.signal;
            this.abortControllerMap.set(url, controller);
            return config;
        }, Promise.reject);

        this.instance.interceptors.response.use(
            (response) => {
                const url = response.config.url || '';
                this.abortControllerMap.delete(url);
                const successCode = response.config.successCode || SUCCESS_CODE;
                if (response.data.code !== successCode) {
                    return Promise.reject(response.data);
                }
                return response.data;
            },
            (err) => {
                if (err.response?.status === 401) {
                    // useUserInfoStore.setState({ userInfo: null });
                    // window.location.href = `/login?redirect=${window.location.pathname}`;
                }
                return Promise.reject(err);
            }
        );
    }

    // 取消全部请求
    cancelAllRequest() {
        for (const [, controller] of this.abortControllerMap) {
            controller.abort();
        }
        this.abortControllerMap.clear();
    }

    //  取消指定的请求
    cancelRequest(url) {
        const urlList = Array.isArray(url) ? url : [url];
        for (const _url of urlList) {
            this.abortControllerMap.get(_url)?.abort();
            this.abortControllerMap.delete(_url);
        }
    }

    request(config) {
        return this.instance.request(config);
    }

    get(url, config) {
        return this.instance.get(url, config);
    }

    post(url, data, config) {
        return this.instance.post(url, data, config);
    }
}

export const http = new Request({
    timeout: 20 * 1000,
    baseURL: import.meta.env.VITE_API_URL,
});