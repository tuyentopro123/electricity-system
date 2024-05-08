// Trong file hooks/useAuth.js
import Request from '../../request';
import { useDispatch } from 'react-redux';
import { setConfigAction } from '../../redux/actions/setConfigAction';

const useConfig = () => {
    const dispatch = useDispatch();

    const getConfig = () => {
        let r = new Request();
        return r.get('config', null, null, setConfigAction, dispatch);
    };

    return { getConfig };
};

export default useConfig;
