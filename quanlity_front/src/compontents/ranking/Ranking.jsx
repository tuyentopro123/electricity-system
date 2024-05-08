import '../ranking/ranking.css';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import useGetList from '../list/useGetList';
import { useEffect, useState } from 'react'; // Thêm useState
import { useSelector } from 'react-redux';
import PaginationType from '../Pagination/Pagination';
import { districtNames, findWard } from 'src/data/getStaticData';
import EmptyData from 'src/assets/img/empty-data.jpg';
import Helmet from '../Helmet/Helmet';
import unidecode from 'unidecode';
import { Toaster } from 'react-hot-toast';
import { notify, uppercase } from 'src/compontents/Toaster/Toaster';
import ListTemplate from './ListTemplate/ListTemplate';

function Ranking() {
    const list = useSelector((state) => state.listData);
    const [currentPage, setCurrentPage] = useState(1);
    const [listTemplate, setListTemplate] = useState(false);
    const [displayList, setDisplayList] = useState([]);
    const [defaultList, setDefaultList] = useState([]);
    const [targetUsers, setTargetUsers] = useState([]);
    const [search, setSearch] = useState(null);
    const [targetFilter, setTargetFilter] = useState({
        district: 'all',
        ward: 'all',
        result: 'all',
        status: 'all',
    });
    const { getList } = useGetList();
    const params = [
        {
            title: 'STT',
            width: '3%',
        },
        {
            title: 'Tên khách hàng',
            width: '12%',
        },

        {
            title: 'Địa chỉ',
            width: '20%',
        },
        {
            title: 'Email',
            width: '9%',
        },
        {
            title: 'Trạng thái thanh toán',
            width: '12%',
        },
        {
            title: 'Trạng thái gửi mail',
            width: '10%',
        },
    ];

    const handleChooseMail = () => {
        setListTemplate(!listTemplate);
    };

    // Pagination
    let itemsPerPage = 10;
    let pageNumber = Math.floor(defaultList.length / 10) + +(defaultList.length % 10 === 0 ? 0 : 1);
    const HandleSetPage = async (e, value) => {
        setCurrentPage(value);
        let startIndex = (value - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        let pageItems = defaultList?.slice(startIndex, endIndex);
        setDisplayList(pageItems);
    };

    // filter city
    const filterDistrict = (e) => {
        const target = e.target.value;
        setTargetFilter({
            ...targetFilter,
            district: target,
            ward: 'all',
        });
    };

    const filterWard = (e) => {
        const target = e.target.value;
        setTargetFilter({
            ...targetFilter,
            ward: target,
        });
    };

    // Event click change status
    const setStatus = (event) => {
        const status = event.target.value;
        setTargetFilter({
            ...targetFilter,
            status: status,
        });
    };

    // Search
    const convertString = (str) => {
        return unidecode(str)
            .normalize('NFD') // Chuẩn hóa chuỗi Unicode (NFD)
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ ký tự dấu
            .toLowerCase(); // Chuyển thành chữ thường
    };

    const handleSearch = (e) => {
        if (e.target.value === '') {
            setSearch('all');
        } else {
            setSearch(e.target.value);
        }
    };

    const onSearch = () => {
        setTargetFilter({
            ...targetFilter,
            result: search,
        });
    };

    // Action check
    const handCheck = (e) => {
        const parentElement = e.target.parentNode;
        const parentValue = parseInt(parentElement.getAttribute('value'));
        if (targetUsers.includes(parentValue)) {
            setTargetUsers(targetUsers.filter((id) => id !== parentValue));
        } else {
            setTargetUsers([...targetUsers, parentValue]);
        }
    };

    const handCheckAll = () => {
        const arr1 = targetUsers;
        const arr2 = displayList.map((item) => item.id);
        const arr1String = arr1.toString();
        const arr2String = arr2.toString();
        const newArr1 = arr1.filter((item) => !arr2.includes(item));
        if (arr1String.includes(arr2String)) {
            setTargetUsers(newArr1);
        } else {
            setTargetUsers([...newArr1, ...arr2]);
        }
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

    // checked filter
    const filterList = (list, filterParams) => {
        return list.filter((item) => {
            // Kiểm tra xem có điều kiện district không
            if (
                filterParams.district !== 'all' &&
                item.district.toLowerCase() !== filterParams.district.toLowerCase()
            ) {
                return false;
            }
            // Kiểm tra xem có điều kiện ward không
            if (filterParams.ward !== 'all' && item.ward.toLowerCase() !== filterParams.ward.toLowerCase()) {
                return false;
            }

            // Kiểm tra xem có điều kiện name không
            const convertedName = convertString(item.name);
            if (filterParams.result !== 'all' && !convertedName.includes(convertString(filterParams.result))) {
                return false;
            }

            const checked = filterParams.status === '1' ? true : false;
            if (filterParams.status !== 'all' && !item.purchased === checked) {
                return false;
            }

            // Nếu không có bất kỳ điều kiện nào áp dụng, trả về true
            return true;
        });
    };
    useEffect(() => {
        setCurrentPage(1);
        let arrResult = [];
        if (Array.isArray(list)) {
            arrResult = filterList(list, targetFilter);
        }

        setDefaultList(arrResult);
    }, [targetFilter]);

    useEffect(() => {
        getList();
    }, []);
    return (
        <Helmet title="Thông báo qua mail">
            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        padding: '16px',
                        fontSize: '14px',
                    },
                }}
            />
            <div className={`add-template ${listTemplate ? 'active' : ''}`}>
                <div className="overlay" onClick={() => setListTemplate(false)}></div>
                <ListTemplate listUsers={targetUsers} list={list} />
            </div>
            <div className="ranking">
                <div className="ranking_titile">
                    <h2 className="ranking_name"> Thông báo khách hàng qua mail</h2>
                </div>

                <div className="selection-ranking" style={{ width: '45%' }}>
                    <Form.Select disabled name="city" aria-label="Default select example">
                        <option selected disabled defaultValue="Hà Nội">
                            Hà Nội
                        </option>
                    </Form.Select>
                    <Form.Select
                        name="distrist"
                        className="selection-item"
                        aria-label="Default select example"
                        onChange={filterDistrict}
                    >
                        <option value="all">Quận/ Huyện</option>
                        {districtNames.map((item, index) => (
                            <option key={index} value={item}>
                                {uppercase(item)}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Select
                        name="ward"
                        className="selection-item"
                        aria-label="Default select example"
                        disabled={targetFilter.district === 'all'}
                        onChange={filterWard}
                        value={targetFilter.ward}
                    >
                        <option value="all">Phường/ Xã</option>
                        {targetFilter.district !== 'all'
                            ? findWard(targetFilter.district).wards.map((item, index) => (
                                  <option key={index} value={item.name}>
                                      {uppercase(item.name)}
                                  </option>
                              ))
                            : null}
                    </Form.Select>
                    <Form.Select onChange={setStatus} className="selection-item" aria-label="Default select example">
                        <option value="all" className="option-item">
                            Trạng thái
                        </option>
                        <option value="1" className="option-item">
                            Đã thanh toán
                        </option>
                        <option value="2" className="option-item">
                            Chưa thanh toán
                        </option>
                    </Form.Select>
                </div>
                <Form className="d-flex search">
                    <Form.Control
                        onChange={(e) => handleSearch(e)}
                        type="search"
                        placeholder="Tìm kiếm theo tên..."
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button onClick={onSearch} variant="danger outline-success">
                        Search
                    </Button>
                </Form>
                <div className="ranking_container">
                    <div className="table-container-selection">
                        <table className="table table-ranking table-hover table-bordered">
                            <thead>
                                <tr>
                                    {params.map((item, index) => (
                                        <th key={index} scope="col" style={{ width: `${item.width}` }}>
                                            {item.title}
                                        </th>
                                    ))}
                                    <th scope="col" style={{ width: `5%` }}>
                                        <input
                                            type="checkbox"
                                            onChange={handCheckAll}
                                            checked={targetUsers
                                                .toString()
                                                .includes(displayList.map((item) => item.id).toString())}
                                        />
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Duyệt qua danh sách hiển thị */}
                                {displayList.length ? (
                                    displayList.map((item, index) => (
                                        <tr value={item.id} key={index} onClick={handCheck}>
                                            <td style={{ textAlign: 'center' }}>
                                                {index + 1 + (currentPage - 1) * 10}
                                            </td>
                                            <td>{item.name}</td>

                                            <td>{item.address}</td>
                                            <td>{item.email}</td>
                                            <td style={{ textAlign: 'end' }}>
                                                {item.purchased ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                            </td>
                                            <td style={{ textAlign: 'end' }}>{item.emailed ? 'Đã gửi' : 'Chưa gửi'}</td>
                                            <td style={{ display: `flex`, justifyContent: `center` }}>
                                                <div value={item.id} className="form-check">
                                                    <input
                                                        className="form-check-input check"
                                                        type="checkbox"
                                                        value={item.id}
                                                        checked={targetUsers.includes(item.id)}
                                                        onChange={handCheck}
                                                        id="flexCheckDefault"
                                                    />
                                                </div>
                                            </td>
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
                        <button
                            disabled={targetUsers.length ? false : true}
                            className="send_btn"
                            onClick={() => handleChooseMail()}
                        >
                            {' '}
                            Gửi mail
                        </button>
                    </div>
                    <PaginationType defaultPage={1} func={HandleSetPage} numb={pageNumber > 1 ? pageNumber : 1} />
                </div>
            </div>
        </Helmet>
    );
}

export default Ranking;
