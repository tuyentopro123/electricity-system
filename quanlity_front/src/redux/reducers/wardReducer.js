import Action from '../actions';

export function wardReducer(
    state = {
        wardData: {},
    },
    action,
) {
    if (action.type === Action.GET_WARD) {
        return action.wardData;
    }
    return state;
}
