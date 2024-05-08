import Action from "../actions";

export function requestManagerReducer(state = {
    isLoading: false,
    isError: false,
    code: '',
    message: '',
    detail: ''
}, action) {
    if (action.type === Action.REQUEST_MANAGER) {
        return action.requestData;
    }
    return state;
}
