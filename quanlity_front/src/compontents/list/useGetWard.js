// Trong file hooks/useAuth.js
import Request from '../../request';
import { useDispatch } from 'react-redux';
import { setList } from '../../redux/actions/setList';

const useGetWard = () => {
    const dispatch = useDispatch();

    const getWard = () => {
        let r = new Request();
        return r.get(
            'customers',
            null,
            'https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=01&limit=-1',
            setList,
            dispatch,
        );
    };

    return { getWard };
};

export default useGetWard;
