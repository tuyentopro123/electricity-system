import '../ranking/ranking.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Helmet from '../Helmet/Helmet';
const Baocao1 = () => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    return (
        <Helmet title="report">
            <div className="ranking">
                <div className="ranking_titile">
                    <h2 className="baocao1_name"> Báo cáo thống kê số lượng điện sử dụng của khách hàng</h2>
                </div>

                <div className="selection">
                    <Form.Select aria-label="Default select example">
                        <option>Tỉnh/Thành phố</option>
                        <option value="1">Hà Nội</option>
                        <option value="2">Hồ Chí Minh</option>
                        <option value="3">Đà Nẵng</option>
                    </Form.Select>
                    <Form.Select className="selection-item" aria-label="Default select example">
                        <option>Quận/ Huyện</option>
                        <option value="1">Ba Vì</option>
                        <option value="2">Hà Đông</option>
                        <option value="3">Cầu Giấy</option>
                    </Form.Select>
                    <Form.Select className="selection-item" aria-label="Default select example">
                        <option>Phường/ Xã</option>
                        <option value="1">Kim Giang</option>
                        <option value="2">Văn quán</option>
                        <option value="3">Hà Trì</option>
                    </Form.Select>
                    <Form.Select className="selection-item" aria-label="Default select example">
                        <option>Thôn/ Xóm/ Tổ</option>
                        <option value="1">Mộ Lao</option>
                        <option value="2">Tây Sơn</option>
                        <option value="3">Kim Đồng</option>
                    </Form.Select>
                </div>

                <div className="baocao1_container">
                    {active === false ? (
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Tỉ lệ</th>
                                    <th scope="col">Danh sách</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2992</td>
                                    <td>34%</td>
                                    <td>
                                        <button className="btn-active" href="" onClick={() => setActive(true)}>
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <div>
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Mã khách hàng</th>
                                        <th scope="col">Tên khách hàng</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Mã số thuế</th>
                                        <th>Trạng thái</th>
                                        <th>Số tiên</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>GLT067696759</td>
                                        <td>Nguyễn Văn Tuyên</td>
                                        <td>282 Kim Giang, Thanh Xuân, Hà Nội</td>
                                        <td>0884859696</td>
                                        <td>tuyentopro@gmail.com</td>
                                        <td>03586967869697</td>
                                        <td>Nợ tiên</td>
                                        <td>1.300.000</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="send_mail"> Xuất báo cáo</button>
                        </div>
                    )}
                </div>
            </div>
        </Helmet>
    );
};
export default Baocao1;
