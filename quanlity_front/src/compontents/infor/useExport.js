// Trong file hooks/useAuth.js
import Request from '../../request';
import { useDispatch } from 'react-redux';
import { setExportAction } from '../../redux/actions/setExportAction';

const useExport = () => {
    const dispatch = useDispatch();

    const exportExcel = (user) => {
        const data = { ids: [10, 11], header: 'danh sach' };
        let r = new Request();
        return r.post('customers/export-to-excel', null, data, setExportAction, null, dispatch);
    };

    return { exportExcel };
};

export default useExport;
