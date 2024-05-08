import Action from '../actions';

export function authReducer(
    state = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {
              token: '',
              error: {},
          },
    action,
) {
    if (action.type === Action.AUTHENTICATION) {
        return action.authData;
    }
    if (action.type === Action.ERROR) {
        return action.errorMsg;
    }
    return state;
}
