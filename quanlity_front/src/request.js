import axios from 'axios';
import appStore from './app-store';
import { setRequestManagerAction } from './redux/actions/setRequestManagerAction';

// Request Services
export default class Request {
    // Lấy token từ localStorage

    // Sử dụng hàm để lấy token
    constructor() {
        const token = JSON.parse(localStorage.getItem('auth'))?.token;
        this.BASE_API_URL = 'http://localhost:8102/api/v1';
        this.config = {
            withCredentials: false,
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        };
    }

    async fetchData(method, url, params) {
        switch (method) {
            case 'GET':
                const resp = await axios.get(url, this.config);
                return resp.data;
            case 'POST':
                const resp_1 = await axios.post(url, params, this.config);
                return resp_1.data;
            case 'PUT':
                const resp_2 = await axios.put(url, params, this.config);
                return resp_2.data;
            case 'DELETE':
                const resp_3 = await axios.delete(url, { headers: { ...this.config.headers }, data: params });
                return resp_3.data;
            default:
                break;
        }
    }

    get(endPoint, params, api, successCallback, dispatch) {
        let self = this;
        let queryString = ``;
        if (params !== null) {
            queryString = `?`;
            for (let i = 0; i < params.length; i++) {
                queryString = `${queryString}${params[i].name}=${params[i].value}&`;
            }
        }
        const url = `${api ? api : self.BASE_API_URL}/${endPoint}${queryString}`;
        self.fetchData('GET', url)
            .then((raw_data) => {
                const data = raw_data || '';
                dispatch(successCallback(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    post(endPoint, params, data, successCallback, failedCallback, dispatch) {
        let self = this;
        let queryString = ``;
        if (params !== null) {
            queryString = '?';
            for (let i = 0; i < params.length; i++) {
                queryString = `${queryString}${params[i].name}=${params[i].value}&`;
            }
        }
        const url = `${self.BASE_API_URL}/${endPoint}${queryString}`;
        self.fetchData('POST', url, data)
            .then((raw_data) => {
                const data = raw_data || '';
                dispatch(successCallback(data));
            })
            .catch((error) => {
                dispatch(failedCallback(error));
            });
    }

    //     put(endPoint, params, data, successCallback, errorCallback, def, api = AppConfig.BASE_API_URL) {
    //         let self = this;
    //         let locale = AppSession.auth().locale;
    //         let queryString = !def ? `?locale=${locale}&` : '';
    //         if (params !== null) {
    //             for (let i = 0; i < params.length; i++) {
    //                 queryString = `${queryString}${params[i].name}=${params[i].value}&`;
    //             }
    //         }
    //         const url = `${api}/${endPoint}${queryString}`;
    //         return (dispatch) => {
    //             dispatch(
    //                 setRequestManagerAction({
    //                     ...appStore.getState().request,
    //                     code: '',
    //                     isError: false,
    //                     isLoading: true,
    //                     message: '',
    //                 }),
    //             );
    //             self.fetchData('PUT', url, data)
    //                 .then((raw_data) => {
    //                     const code = raw_data.Code || '';
    //                     const message = raw_data.Message || '';
    //                     const data = raw_data.Data || '';
    //                     const msg_code = raw_data.MsgCode;
    //                     let reqData = {
    //                         ...appStore.getState().request,
    //                         isLoading: false,
    //                         code: code,
    //                         message: message ? message : data,
    //                         msgCode: msg_code,
    //                     };
    //                     //Should use code to know when we need to show success or error message
    //                     if (code !== 'Executed_OK' || message !== '') {
    //                         reqData = { ...reqData, isError: true };
    //                     } else {
    //                         if (successCallback != null) {
    //                             dispatch(successCallback(data));
    //                         }
    //                         reqData = { ...reqData, isError: false };
    //                     }
    //                     dispatch(setRequestManagerAction(reqData));
    //                 })
    //                 .catch((error) => {
    //                     if (errorCallback != null) {
    //                         dispatch(errorCallback(error));
    //                     }
    //                     dispatch(
    //                         setRequestManagerAction({
    //                             ...appStore.getState().request,
    //                             isLoading: false,
    //                             isError: false,
    //                             message: error.toString(),
    //                             msgCode: '',
    //                         }),
    //                     );
    //                 });
    //         };
    //     }

    //     delete(endPoint, params, data, successCallback, errorCallback, paramsCallback, api = AppConfig.BASE_API_URL) {
    //         let self = this;
    //         let locale = AppSession.auth().locale;
    //         let queryString = `?locale=${locale}&`;
    //         if (params !== null) {
    //             for (let i = 0; i < params.length; i++) {
    //                 queryString = `${queryString}${params[i].name}=${params[i].value}&`;
    //             }
    //         }
    //         const url = `${api}/${endPoint}${queryString}`;
    //         return (dispatch) => {
    //             dispatch(
    //                 setRequestManagerAction({
    //                     ...appStore.getState().request,
    //                     code: '',
    //                     isError: false,
    //                     isLoading: true,
    //                     message: '',
    //                 }),
    //             );
    //             self.fetchData('DELETE', url, data)
    //                 .then((raw_data) => {
    //                     const code = raw_data.Code || '';
    //                     const message = raw_data.Message || '';
    //                     const data = raw_data.Data || '';
    //                     const msg_code = raw_data.MsgCode;
    //                     let reqData = {
    //                         ...appStore.getState().request,
    //                         isLoading: false,
    //                         code: code,
    //                         message: message ? message : data,
    //                         msgCode: msg_code,
    //                     };
    //                     //Should use code to know when we need to show success or error message
    //                     if (code !== 'Executed_OK' || message !== '') {
    //                         reqData = { ...reqData, isError: true };
    //                     } else {
    //                         if (successCallback != null) {
    //                             if (paramsCallback) {
    //                                 successCallback();
    //                             } else {
    //                                 dispatch(successCallback(data));
    //                             }
    //                         }
    //                         reqData = { ...reqData, isError: false };
    //                     }
    //                     dispatch(setRequestManagerAction(reqData));
    //                 })
    //                 .catch((error) => {
    //                     if (errorCallback != null) {
    //                         dispatch(errorCallback(error));
    //                     }
    //                     dispatch(
    //                         setRequestManagerAction({
    //                             ...appStore.getState().request,
    //                             isLoading: false,
    //                             isError: false,
    //                             message: error.toString(),
    //                             msgCode: '',
    //                         }),
    //                     );
    //                 });
    //         };
    //     }
}
