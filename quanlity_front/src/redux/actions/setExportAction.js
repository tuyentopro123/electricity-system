import Action from '../actions';

export function setExportAction(excelData) {
    return {
        type: Action.EXPORT_EXCEL,
        excelData: excelData,
    };
}
