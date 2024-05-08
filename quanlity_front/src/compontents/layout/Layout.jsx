import { useNavigate } from 'react-router-dom';
import Home from '../home/Home';
import './layout.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Layout() {
    const auth = useSelector((state) => state.auth);

    return (
        <div className="layout">
            <div className="back_home">
                <div className="home-title">
                    <p>{`Admin, ${auth.user.fullname}`}</p>
                </div>
                <Home />
            </div>
        </div>
    );
}

export default Layout;
