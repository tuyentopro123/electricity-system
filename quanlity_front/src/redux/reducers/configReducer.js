import Action from '../actions';

export function configReducer(
    state = {
        configData: {},
    },
    action,
) {
    if (action.type === Action.CONFIG) {
        return action.configData;
    }
    return state;
}
