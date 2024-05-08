import Action from '../actions';

export function setConfigAction(configData) {
    return {
        type: Action.CONFIG,
        configData: configData,
    };
}
