import Action from '../actions';

export function setList(listData) {
    return {
        type: Action.GET_LIST,
        listData: listData,
    };
}
