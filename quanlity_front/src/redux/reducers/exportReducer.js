import Action from '../actions';

export function exportReducer(
    state = {
        excelData: {},
    },
    action,
) {
    if (action.type === Action.EXPORT_EXCEL) {
        return action.excelData;
    }
    return state;
}
