import Action from "../actions";

export function setRequestManagerAction(requestData) {
    return {
        type: Action.REQUEST_MANAGER,
        requestData
    }
}
