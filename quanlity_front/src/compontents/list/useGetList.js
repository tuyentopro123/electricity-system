// Trong file hooks/useAuth.js
import Request from '../../request';
import { useDispatch } from 'react-redux';
import { setList } from '../../redux/actions/setList';

const useGetList = () => {
    const dispatch = useDispatch();

    const getList = (month = 1) => {
        let r = new Request();
        return r.get('customers', [{ name: 'month', value: month }], null, setList, dispatch);
    };

    return { getList };
};

export default useGetList;
