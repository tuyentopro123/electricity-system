import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Layout from './compontents/layout/Layout';
import Ranking from './compontents/ranking/Ranking';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mail from './compontents/mail/Mail';
import List from './compontents/list/List';
import Infor from './compontents/infor/Infor';
import CauHinh from './compontents/cauhinh/CauHinh';
import Baocao1 from './compontents/infor/baocao';
import listExport from './compontents/infor/listExport/listExport';
import Login from './compontents/login/Login';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLogoutAction } from 'src/redux/actions/setAuthAction';

// material ui
import LogoutIcon from '@mui/icons-material/Logout';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EmailIcon from '@mui/icons-material/Email';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { amber } from '@mui/material/colors';
function App() {
    const auth = useSelector((state) => state.auth);
    // Hàm trung gian để kiểm tra trạng thái xác thực và điều hướng tương ứng
    const PrivateRoute = ({ element: Component }) => {
        return auth.token ? <Component /> : <Navigate to="/login" />;
    };
    return (
        <BrowserRouter>
            <SpeedDialTooltip />
            <Routes>
                <Route path="/login" element={!auth.token ? <Login /> : <Navigate to="/home" />} />
                <Route path="/" element={<Navigate to="/home" />} /> {/* Điều hướng mặc định */}
                <Route path="/home" element={<PrivateRoute element={Layout} />} />
                <Route path="/mail" element={<PrivateRoute element={Ranking} />} />
                <Route path="/list" element={<PrivateRoute element={List} />} />
                <Route path="/send" element={<PrivateRoute element={Mail} />} />
                <Route path="/export" element={<PrivateRoute element={Infor} />} />
                <Route path="/config" element={<PrivateRoute element={CauHinh} />} />
                <Route path="/report" element={<PrivateRoute element={Baocao1} />} />
                <Route path="/listExport" element={<PrivateRoute element={listExport} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
function SpeedDialTooltip({ user }) {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const handleNavigate = (e) => {
        navigate(`/${e}`);
    };
    const handleBack = () => {
        navigate(`/home`);
    };
    const handleLogout = async () => {
        setLogoutAction();
        window.location.href = '/login';
    };
    const actions = [
        {
            icon: <EmailIcon onClick={() => handleNavigate('mail')} sx={{ fontSize: 25, color: amber[500] }} />,
            name: 'Mail',
        },
        {
            icon: (
                <FileDownloadIcon onClick={() => handleNavigate('export')} sx={{ fontSize: 25, color: amber[500] }} />
            ),
            name: 'Export',
        },
        {
            icon: <SettingsIcon onClick={() => handleNavigate('config')} sx={{ fontSize: 25, color: amber[500] }} />,
            name: 'Config',
        },
        {
            icon: <ListAltIcon onClick={() => handleNavigate('list')} sx={{ fontSize: 25, color: amber[500] }} />,
            name: 'List',
        },
        {
            icon: <LogoutIcon onClick={() => handleLogout()} sx={{ fontSize: 25, color: amber[500] }} />,
            name: 'Logout',
        },
    ];

    return (
        <SpeedDial
            ariaLabel="SpeedDial openIcon"
            sx={{
                position: 'fixed',
                bottom: 15,
                right: 15,
                color: 'black',
                display: location.pathname === '/login' ? 'none' : 'flex',
            }}
            FabProps={{
                size: 'larger',
            }}
            icon={
                <SpeedDialIcon
                    sx={{ height: 33 }}
                    onClick={handleBack}
                    icon={<AddIcon sx={{ fontSize: 30 }} />}
                    openIcon={<ArrowBackIcon sx={{ fontSize: 30 }} />}
                />
            }
        >
            {actions.map((action) => (
                <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} tooltipOpen />
            ))}
        </SpeedDial>
    );
}
