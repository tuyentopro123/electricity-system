import React, { useEffect, useState } from 'react';
import './Cauhinh.css';
import { port } from 'src/data/getStaticData';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

var MAX_INT = 999999;
function AddConfig({
    listConfig,
    setListConfig,
    maxConfig,
    setMaxConfig,
    lastAddConfig,
    setLastAddConfig,
    error,
    setError,
}) {
    const [currentConfig, setCurrentConfig] = useState({
        level: 1,
        price: '',
        fromNumber: 0,
        toNumber: '',
    });
    console.log(currentConfig);
    // Check value
    const isChecked = (config) => {
        for (let key in config) {
            if (config.hasOwnProperty(key)) {
                if (config[key] === '') {
                    setError('Các trường không được để trống');
                    return false;
                }
            }
        }
        const previusConfig = listConfig[listConfig.length - 1];
        if (previusConfig) {
            if (parseInt(previusConfig.price) >= parseInt(config.price)) {
                setError('đơn giá phải lớn hơn đơn giá bậc trước');
                return false;
            }
        }
        if (!maxConfig && parseInt(config.fromNumber) >= parseInt(config.toNumber)) {
            setError('Số thấp nhất phải nhỏ hơn số cao nhất');
            return false;
        }
        return true;
    };

    // Add config
    const handleAddConfig = (event) => {
        setError();
        const value = event.target.value;
        setCurrentConfig({ ...currentConfig, [event.target.name]: value });
    };

    const addConfig = () => {
        if (isChecked(currentConfig)) {
            setListConfig([...listConfig, currentConfig]);
            if (!maxConfig) {
                setCurrentConfig({
                    level: currentConfig.level + 1,
                    price: '',
                    fromNumber: parseInt(currentConfig.toNumber) + 1,
                    toNumber: '',
                });
            } else {
                setLastAddConfig(true);
            }
        }
    };

    const addMaxConfig = () => {
        setMaxConfig(!maxConfig);
    };

    // Call api add config
    const funcAddConfig = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('auth'))?.token;
            const data = {
                data: listConfig,
            };
            const config = {
                withCredentials: false,
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
            const response = await axios.post(port + '/config', data, {
                ...config,
            });
        } catch (error) {
            console.error('Lỗi :', error);
        }
    };
    const doAddConfig = () => {
        funcAddConfig();
        window.location.href = '/config';
    };

    const formatNumber = (value) => {
        var formattedNumber = parseFloat(value).toLocaleString('en-US');
        return formattedNumber;
    };

    useEffect(() => {
        if (maxConfig) {
            setCurrentConfig({
                ...currentConfig,
                toNumber: 999999,
            });
        } else {
            setCurrentConfig({
                ...currentConfig,
                toNumber: '',
            });
        }
    }, [maxConfig]);

    useEffect(() => {
        if (!listConfig.length) {
            setCurrentConfig({
                level: 1,
                price: '',
                fromNumber: 0,
                toNumber: '',
            });
        }
    }, [listConfig]);
    return (
        <div className="add-config">
            <div className="cauhinh add">
                <div className="config_title">
                    <h2 className="cauhinh_name">Thêm mới cấu hình</h2>
                </div>
                <form className="form-add">
                    <div className="form-col">
                        <div className="form-input">
                            <label>Tên mức giá:</label>
                            <input value={currentConfig.level} type="number" name="level" disabled />
                        </div>
                        <br />
                        <div className="form-input">
                            <label>Giá điện:</label>
                            <input
                                className={`${error ? 'err-input' : ''}`}
                                value={currentConfig.price}
                                type="number"
                                name="price"
                                disabled={lastAddConfig}
                                onChange={(e) => handleAddConfig(e)}
                            />
                            <span className="form-unit">(đồng/kWh)</span>
                        </div>
                    </div>
                    <div className="form-col">
                        <div className="form-input">
                            <label>Số thấp nhất:</label>
                            <input
                                disabled
                                value={currentConfig.fromNumber}
                                type="number"
                                name="fromNumber"
                                onChange={(e) => handleAddConfig(e)}
                            />
                            <span className="form-unit">(kWh)</span>
                        </div>
                        <br />
                        <div className="form-input">
                            <label>số cao nhất:</label>
                            <input
                                className={`${error && !maxConfig ? 'err-input' : ''}`}
                                value={maxConfig ? 'max' : currentConfig.toNumber}
                                type={maxConfig ? 'text' : 'number'}
                                name="toNumber"
                                disabled={maxConfig}
                                onChange={(e) => handleAddConfig(e)}
                            />
                            <span className="form-unit">(kWh)</span>
                        </div>
                    </div>
                </form>
                {error && (
                    <div className="err-config">
                        <p>{error}</p>
                    </div>
                )}
                <div className="button-config add">
                    <button
                        disabled={!listConfig.length || lastAddConfig}
                        className="btn-cauhinh btn-danger"
                        onClick={addMaxConfig}
                    >
                        {maxConfig ? 'Normal' : 'Max'}
                    </button>
                    <button
                        disabled={lastAddConfig}
                        tabIndex="1"
                        className="btn-cauhinh btn-danger"
                        onClick={addConfig}
                    >
                        Thêm mức giá
                    </button>
                </div>
                <div className="cauhinh_container add">
                    <div className="cauhinh-box">
                        <table style={{ backgroundColor: '#fff' }} className="table table-cauhinh ">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên mức giá điện</th>
                                    <th scope="col">Số điện (kWh)</th>
                                    <th scope="col">Giá điện (đồng/kWh) </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listConfig.length ? (
                                    listConfig.map((item, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>Bậc {item.level}</th>
                                            <th>
                                                {item.toNumber === MAX_INT
                                                    ? `Trên ${item.fromNumber - 1}`
                                                    : `${item.fromNumber} - ${item.toNumber}`}
                                            </th>
                                            <th>{formatNumber(item.price)}</th>
                                        </tr>
                                    ))
                                ) : (
                                    <tr></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="button-config add">
                    <button
                        disabled={!lastAddConfig}
                        tabIndex="1"
                        className="btn-cauhinh btn-danger"
                        onClick={doAddConfig}
                    >
                        Thêm cấu hình
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddConfig;
