import Action from '../actions';

export function setAuthenticationAction(authData) {
    if (!authData) {
        return;
    }
    localStorage.setItem('auth', JSON.stringify(authData));
    return {
        type: Action.AUTHENTICATION,
        authData: authData,
    };
}

export function setErrorAuthenticationAction(error) {
    return {
        type: Action.ERROR,
        errorMsg: error,
    };
}
export function setLogoutAction() {
    let data = {
        token: '',
    };
    localStorage.setItem('auth', JSON.stringify(data));
    return {
        type: Action.AUTHENTICATION,
        authData: data,
    };
}
// export function handleUnauthorizedAction(unauthorizedData) {
//     if (unauthorizedData.response && unauthorizedData.response.status === 401) {
//     }
//     let data = {
//         locale: 'vn',
//         userData: {},
//         token: '',
//         isAuthorized: false
//     };
//     localStorage.setItem('auth', JSON.stringify(data));
//     return {
//         type: unauthorizedData.response && unauthorizedData.response.status === 401 ? Action.UNAUTHORIZED : Action.UNKNOWN,
//         authData: unauthorizedData.response && unauthorizedData.response.status === 401 ? data : ''
//     }
// }
