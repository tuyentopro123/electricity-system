import axios from 'axios';
import './Infor.css';

import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import useGetList from '../list/useGetList';
import { useEffect, useState } from 'react'; // Thêm useState
import { useSelector } from 'react-redux';
import PaginationType from '../Pagination/Pagination';
import EmptyData from 'src/assets/img/empty-data.jpg';
import Helmet from '../Helmet/Helmet';
import unidecode from 'unidecode';
import { Toaster } from 'react-hot-toast';
import { notify } from 'src/compontents/Toaster/Toaster';
import DialogComponent from '../Dialog/Dialog';
import { port } from 'src/data/getStaticData';

function Info() {
    const list = useSelector((state) => state.listData);
    console.log(list);
    const [displayList, setDisplayList] = useState({
        list: [],
        currentPage: 0,
    });
    const [defaultList, setDefaultList] = useState([]);
    const [month, setMonth] = useState(3);
    const [visible, setVisible] = useState(false);

    // get export
    const handleDownload = async () => {
        const arrList = defaultList.map((item) => item.id);
        try {
            const token = JSON.parse(localStorage.getItem('auth'))?.token;
            const data = { ids: arrList, header: 'danh sach' };
            const config = {
                withCredentials: false,
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
            const response = await axios.post(port + '/customers/export-to-excel', data, {
                ...config,
                responseType: 'arraybuffer',
            });

            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.xlsx');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            window.location.href = '/home';
        } catch (error) {
            console.error('Lỗi khi tải xuống file Excel:', error);
        }
    };

    const { getList } = useGetList();
    const params = [
        {
            title: 'STT',
        },
        {
            title: 'Tên khách hàng',
        },
        {
            title: 'Email',
        },
        {
            title: 'Quận/huyện',
        },
        {
            title: 'Xã/phường',
        },
        {
            title: 'Địa chỉ',
        },
        {
            title: 'Chỉ số cũ (kWh)',
        },
        {
            title: 'Chỉ số mới (kWh)',
        },
        {
            title: 'Tổng tiền',
        },
        {
            title: 'Ngày nhập số',
        },
        {
            title: 'Trạng thái thanh toán',
        },
    ];
    const listMonth = [1, 2, 3];

    // Pagination
    let itemsPerPage = 10;
    let pageNumber = Math.floor(defaultList.length / 10) + +(defaultList.length % 10 === 0 ? 0 : 1);
    const HandleSetPage = async (e, value) => {
        let startIndex = (value - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        let pageItems = defaultList?.slice(startIndex, endIndex);
        setDisplayList({ currentPage: value - 1, list: pageItems });
    };

    const handWarning = () => {
        setVisible(true);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    // Convert date
    const convertDate = (dateString) => {
        var date = new Date(dateString);
        return (date.getMonth() + 1).toString();
    };

    // Event click choose month
    const getMonth = (event) => {
        const month = event.target.value;
        setMonth(parseInt(month));
    };

    // Event click change status
    const setStatus = (event) => {
        const status = event.target.value;
        const checked = status === '1' ? true : false;
        const filteredList = status !== 'all' ? list.filter((cus) => cus.purchased === checked) : list;
        setDefaultList(filteredList);
    };

    // Use Effect
    useEffect(() => {
        setDefaultList(list);
    }, [list]);

    useEffect(() => {
        if (Array.isArray(defaultList)) {
            setDisplayList({ ...displayList, list: defaultList.slice(0, 10) });
        }
    }, [defaultList]);

    useEffect(() => {
        getList(month);
    }, [month]);
    return (
        <Helmet title="Xuất báo cáo">
            <div className="ranking">
                <div className="ranking_titile">
                    <h2 className="ranking_name">Xuất báo cáo thống kê</h2>
                </div>

                <div className="selection" style={{ justifyContent: 'center' }}>
                    <Form.Select
                        onChange={getMonth}
                        name="distrist"
                        className="selection-item"
                        aria-label="Default select example"
                    >
                        <option value="all">Tháng</option>
                        {listMonth.map((item, index) => (
                            <option key={index} value={item}>
                                Tháng {item}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Select
                        onChange={setStatus}
                        name="distrist"
                        className="selection-item"
                        aria-label="Default select example"
                    >
                        <option value="all">Trạng thái</option>
                        <option value="0">Chưa thanh toán</option>
                        <option value="1">Đã thanh toán</option>
                    </Form.Select>
                </div>
                <div className="ranking_container">
                    <div className="table-container">
                        <table className="table table-list table-hover table-bordered">
                            <thead>
                                <tr>
                                    {params.map((item, index) => (
                                        <th key={index} scope="col">
                                            {item.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Duyệt qua danh sách hiển thị */}
                                {displayList.list.length ? (
                                    displayList.list.map((item, index) => (
                                        <tr value={item.id} key={index}>
                                            <td style={{ textAlign: 'center' }}>
                                                {index + 1 + displayList.currentPage * 10}
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td style={{ textAlign: 'center' }}>{item.district}</td>
                                            <td style={{ textAlign: 'center' }}>{item.ward}</td>
                                            <td>{item.address}</td>
                                            <td style={{ textAlign: 'end' }}>{item.oldNumber}</td>
                                            <td style={{ textAlign: 'end' }}>{item.newNumber}</td>
                                            <td>{item.totalPrice === 0 ? '0' : item.totalPrice?.toFixed(3)}</td>
                                            <td style={{ textAlign: 'end' }}>{formatDate(item.numberUpdate)}</td>
                                            <td>{item.purchased ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
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
                    <div className="send_mail">
                        <button disabled={defaultList.length === 0} className="send_btn" onClick={handWarning}>
                            {' '}
                            Xuất báo cáo
                        </button>
                        <DialogComponent
                            setVisible={setVisible}
                            callBackFunc={handleDownload}
                            description={' Bạn có chắc muốn xuất báo cáo ?'}
                            title={'Xuất báo cáo!'}
                            visible={visible}
                        />
                    </div>
                    <PaginationType defaultPage={1} func={HandleSetPage} numb={pageNumber > 1 ? pageNumber : 1} />
                </div>
            </div>
        </Helmet>
    );
}

export default Info;
