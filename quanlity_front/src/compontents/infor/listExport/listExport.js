import axios from 'axios';
import '../listExport/listExport.css';

import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import useGetList from '../../list/useGetList';
import { useEffect, useState } from 'react'; // Thêm useState
import { useSelector } from 'react-redux';
import PaginationType from '../../Pagination/Pagination';
import EmptyData from 'src/assets/img/empty-data.jpg';
import Helmet from '../../Helmet/Helmet';
import unidecode from 'unidecode';
import { Toaster } from 'react-hot-toast';
import { notify } from 'src/compontents/Toaster/Toaster';

function List() {
    const list = useSelector((state) => state.listData);
    const [displayList, setDisplayList] = useState([]);
    const [defaultList, setDefaultList] = useState([]);
    const [targetUsers, setTargetUsers] = useState([]);
    const [search, setSearch] = useState(null);
    const [targetFilter, setTargetFilter] = useState({
        district: 'all',
        ward: 'all',
    });

    // get export
    const handleDownload = async () => {
        const arrList = list.map((item) => item.id);
        try {
            const token = JSON.parse(localStorage.getItem('auth'))?.token;
            const data = { ids: arrList, header: 'danh sach' };
            const config = {
                withCredentials: false,
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
            const response = await axios.post('http://localhost:8102/api/v1/customers/export-to-excel', data, {
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
            title: 'Địa chỉ',
        },
        {
            title: 'Email',
        },
        {
            title: 'Chỉ số cũ (kWh)',
        },
        {
            title: 'Chỉ số mới (kWh)',
        },
        {
            title: 'Tiền còn nợ',
        },
        {
            title: 'Trạng thái nợ',
        },
        {
            title: 'Trạng thái TK',
        },
    ];

    // Pagination
    let itemsPerPage = 10;
    let pageNumber = defaultList.length / 10;
    const HandleSetPage = async (e, value) => {
        let startIndex = (value - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        let pageItems = defaultList?.slice(startIndex, endIndex);
        setDisplayList(pageItems);
    };

    const handWarning = () => {
        notify();
    };

    useEffect(() => {
        if (list?.length) {
            setDefaultList(list);
        }
    }, [list]);

    useEffect(() => {
        if (Array.isArray(defaultList)) {
            setDisplayList(defaultList.slice(0, 10));
        }
    }, [defaultList]);

    useEffect(() => {
        getList();
    }, []);
    return (
        <Helmet title="List">
            <div className="ranking">
                <div className="ranking_titile">
                    <h2 className="ranking_name">thống kê doanh thu</h2>
                </div>

                <div className="selection">
                    <Form.Select name="distrist" className="selection-item" aria-label="Default select example">
                        <option value="all">Quận/ Huyện</option>
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
                                {displayList.length ? (
                                    displayList.map((item, index) => (
                                        <tr value={item.id} key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.email}</td>
                                            <td>{item.oldNumber}</td>
                                            <td>{item.newNumber}</td>
                                            <td>{item.totalPrice}</td>
                                            <td>{item.purchased}</td>
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
                        <button className="send_btn" onClick={handWarning}>
                            {' '}
                            Xuất báo cáo
                        </button>
                    </div>
                    <PaginationType defaultPage={1} func={HandleSetPage} numb={pageNumber > 1 ? pageNumber : 1} />
                </div>
            </div>
        </Helmet>
    );
}

export default List;
