import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import useAuth from './useAuth';
import { useState } from 'react';
import Helmet from '../Helmet/Helmet';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { grey } from '@mui/material/colors';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
    const auth = useSelector((state) => state.auth);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const { authLogin } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            doLogin();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (document.activeElement === usernameRef.current) {
                passwordRef.current.focus();
            } else if (document.activeElement === passwordRef.current) {
                usernameRef.current.focus();
            }
        }
    };
    console.log(error);
    const doLogin = () => {
        setError(null);
        if (!user.email || !user.password) {
            setError('Tên đăng nhập và mật khẩu không được để trống');
            return;
        }
        if (!isValidEmail(user.email)) {
            setError('Vui lòng nhập đúng định dạng email "Abc@gmail.com"');
            return;
        }
        return authLogin(user);
    };
    const isValidEmail = (email) => {
        // Biểu thức chính quy kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Kiểm tra email có đúng định dạng không
        if (!emailRegex.test(email)) {
            return false;
        }

        // Kiểm tra từng ký tự trong email xem có phải là ký tự tiếng Anh không
        for (let i = 0; i < email.length; i++) {
            const charCode = email.charCodeAt(i);
            if (
                (charCode < 65 || charCode > 90) && // A-Z
                (charCode < 97 || charCode > 122) && // a-z
                (charCode < 48 || charCode > 57) && // 0-9
                email[i] !== '@' &&
                email[i] !== '.' &&
                email[i] !== '-'
            ) {
                // Các ký tự đặc biệt phổ biến trong email
                return false; // Nếu có ký tự không phải tiếng Anh hoặc số, không phải ký tự @, . hoặc -, email không hợp lệ
            }
        }

        return true; // Nếu không có ký tự không phải tiếng Anh hoặc số, email được coi là hợp lệ
    };
    useEffect(() => {
        if (auth?.code) {
            setError('Tài khoản hoặc mật khẩu không chính xác');
        }
    }, [auth]);

    useEffect(() => {
        document.title = 'Login';
    }, []);

    return (
        <div className="loginn">
            <div className="login-table">
                <div className="login_contaniner">
                    <div className="login-header">
                        <p className="login_name active">Đăng nhập</p>
                    </div>
                    <form className="login__acc-content">
                        <div className={`login__acc-input ${error ? 'err' : ''}`}>
                            <input
                                type="text"
                                value={user.email}
                                placeholder="Tên đăng nhập hoặc Email"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                onKeyDown={handleKeyDown}
                                ref={usernameRef}
                            />
                        </div>
                        <div className={`login__acc-input ${error ? 'err' : ''} password`}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={user.password}
                                placeholder="Mật khẩu"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                onKeyDown={handleKeyDown}
                                ref={passwordRef}
                            />
                            {!showPassword ? (
                                <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                    <VisibilityIcon sx={{ color: grey[600] }} />
                                </div>
                            ) : (
                                <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                    <VisibilityOffIcon sx={{ color: grey[600] }} />
                                </div>
                            )}
                        </div>
                        {error && <p className="error-message">Lỗi: {error}</p>}
                    </form>
                    <button className="login_btn" onClick={doLogin}>
                        Đăng nhập
                    </button>
                    <p className="login-help">
                        Chúng tôi không sử dụng thông tin của bạn với bất kỳ mục đích nào. Bằng cách đăng nhập hoặc đăng
                        ký, bạn đồng ý với
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
