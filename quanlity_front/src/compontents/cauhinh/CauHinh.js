import React, { useEffect, useState } from 'react';
import Helmet from '../Helmet/Helmet';
import './Cauhinh.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import useConfig from './useConfig';
import { useSelector } from 'react-redux';
import EmptyData from 'src/assets/img/empty-data.jpg';
import AddConfig from 'src/compontents/cauhinh/addConfig';
import { Toaster } from 'react-hot-toast';
import { notify } from 'src/compontents/Toaster/Toaster';

var MAX_INT = 999999;
function CauHinh() {
    const configData = useSelector((state) => state.configData);
    const [error, setError] = useState();

    const [update, setUpdate] = useState(false);
    const [maxConfig, setMaxConfig] = useState(false);
    const [lastAddConfig, setLastAddConfig] = useState(false);
    const [listConfig, setListConfig] = useState([]);
    const { getConfig } = useConfig();
    const handleUpdate = () => {
        setUpdate(!update);
    };

    const turnOffAdd = () => {
        setUpdate(false);
        setListConfig([]);
        setMaxConfig(false);
        setLastAddConfig(false);
        setError();
    };
    const formatNumber = (value) => {
        var formattedNumber = parseFloat(value).toLocaleString('en-US');
        return formattedNumber;
    };

    useEffect(() => {
        getConfig();
    }, []);

    return (
        <Helmet title="Cấu hình">
            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        padding: '16px',
                        fontSize: '14px',
                    },
                }}
            />
            <div className={`add-template ${update ? 'active' : ''}`}>
                <div className="overlay" onClick={() => turnOffAdd()}></div>
                <AddConfig
                    listConfig={listConfig}
                    setListConfig={setListConfig}
                    maxConfig={maxConfig}
                    setMaxConfig={setMaxConfig}
                    lastAddConfig={lastAddConfig}
                    setLastAddConfig={setLastAddConfig}
                    error={error}
                    setError={setError}
                    notify={notify}
                />
            </div>
            <div className="cauhinh">
                <div className="cauhinh_title">
                    <h2 className="cauhinh_name"> Cấu hình giá điện</h2>
                </div>
                <div className="button-config">
                    <button tabIndex="1" onClick={() => handleUpdate()} className="btn-cauhinh btn-danger">
                        Thêm cấu hình
                    </button>
                </div>
                <div className="cauhinh_container">
                    <table className="table table-cauhinh ">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên mức giá điện</th>
                                <th scope="col">Số điện (kWh)</th>
                                <th scope="col">Giá điện (Nghìn đồng/kWh) </th>
                            </tr>
                        </thead>
                        <tbody>
                            {configData.length ? (
                                configData.map((item, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <th>{item.name}</th>
                                        <th>
                                            {item.toNumber === MAX_INT
                                                ? `Trên ${item.fromNumber - 1}`
                                                : `${item.fromNumber} - ${item.toNumber}`}
                                        </th>
                                        <th>{formatNumber(item.price)}</th>
                                    </tr>
                                ))
                            ) : (
                                <tr className="empty">
                                    <td colSpan="11">
                                        <div className="empty-data">
                                            <img src={EmptyData} alt="" />
                                            <p>No data</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Helmet>
    );
}

export default CauHinh;
