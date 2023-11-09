import axios from "axios";
import getConfig from "next/config";

const { 
    publicRuntimeConfig: { apiRoot }, 
} = getConfig();

axios.defaults.baseURL = apiRoot;

const instance = axios.create();

// 後攔截器
instance.interceptors.response.use(
    ({ data: { data } }) => ({ status: 200, data }), 
    ({
        response: {
            status,
            statusText,
            data: {
                message: errorMessage
            } = {},
        } = {},
    } = {}) => ({ status, statusText, errorMessage })
);

export default instance;
