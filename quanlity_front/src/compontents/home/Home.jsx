import { Link } from 'react-router-dom';
import './home.scss';
import Helmet from '../Helmet/Helmet';
function Home() {
    return (
        <Helmet title="Trang chủ">
            <div className="home">
                <div className="content">
                    <h1 className="header"> Quản lý thanh toán tiền điện Hà Nội </h1>
                </div>
                <div className="home__container">
                    <div className="page_caro">
                        <img
                            src="https://g-pay.vn/asset/admins/upload/images/Hoa/thanh_toan_tien_dien_online1.png"
                            alt="logo"
                            className="caro-img"
                        />
                        <div className="button">
                            <Link to="/mail" className="login">
                                Thông báo cho khách hàng qua Mail.
                            </Link>
                            <Link to="/list" className="login">
                                Theo dõi danh sách
                            </Link>
                            <Link to="/export" className="login">
                                Xuất báo cáo thống kê
                            </Link>
                            <Link to="/config" className="login">
                                Cấu hình về giá, bậc, số điện.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Home;
