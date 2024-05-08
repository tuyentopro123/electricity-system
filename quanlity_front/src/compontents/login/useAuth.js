// Trong file hooks/useAuth.js
import Request from '../../request';
import { useDispatch } from 'react-redux';
import { setAuthenticationAction, setErrorAuthenticationAction } from '../../redux/actions/setAuthAction';

const useAuth = () => {
    const dispatch = useDispatch();

    const authLogin = (user) => {
        const data = {
            email: user.email,
            password: user.password,
        };
        let r = new Request();
        return r.post('auth/login', null, data, setAuthenticationAction, setErrorAuthenticationAction, dispatch);
    };

    return { authLogin };
};

export default useAuth;
