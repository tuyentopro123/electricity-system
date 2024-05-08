import Action from '../actions';

export function setWard(wardData) {
    return {
        type: Action.GET_WARD,
        wardData: wardData,
    };
}
