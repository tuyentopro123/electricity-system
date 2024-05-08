import '../ranking/ranking.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Helmet from '../Helmet/Helmet';

function Mail() {
    const navigate = useNavigate();

    return (
        <Helmet title="Mail">
            <div className="ranking">
                <div className="ranking_titile">
                    <h2 className="ranking_name"> Gửi Mail thông báo cho khách hàng</h2>
                </div>

                <div className="ranking_container">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên mậu email</th>
                                <th scope="col">Chủ đề</th>
                                <th scope="col">Nội dung</th>
                                <th scope="col">Thời gian tạo</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Thông báo tiền điện</td>
                                <td>THONG BÁO TIỀN ĐIỆN- CÔNG TY TNHH EVN ĐIỆN HÀ ĐÔNG</td>
                                <td className="text-mail">
                                    Trường hợp thời hạn cho thuê nhà dưới 12 tháng và chủ nhà không thực hiện kê khai
                                    được đầy đủ số người sử dụng điện thì áp dụng giá bán lẻ điện sinh hoạt của bậc 3:
                                    Từ 101 - 200 kWh cho toàn bộ sản lượng điện đo đếm được tại công tơ.
                                </td>
                                <td>12-90-183837</td>
                                <td>
                                    <a href="/chitiet">Xem chi tiết</a>
                                </td>
                                <td>VVV</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="send_mail"> SEND</button>
                </div>
            </div>
        </Helmet>
    );
}

export default Mail;
