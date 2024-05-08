import Action from '../actions';

export function listReducer(
    state = {
        listData: {},
    },
    action,
) {
    if (action.type === Action.GET_LIST) {
        return action.listData;
    }
    return state;
}
