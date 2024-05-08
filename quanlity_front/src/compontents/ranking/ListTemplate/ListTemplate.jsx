import React, { useEffect, useState } from 'react';
import './ListTemplate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DialogComponent from '../../Dialog/Dialog';
import { notify } from '../../Toaster/Toaster';
import { port } from 'src/data/getStaticData';

function ListTemplate({ listUsers, list }) {
    const [visible, setVisible] = useState(false);
    const [template, setTemplate] = useState({ src: 'template/cat-dien.html', type: 1 });

    const getTemplate = (e) => {
        setTemplate({ src: e.target.id, type: e.target.tabIndex });
    };

    // Get mail arr
    const mailArr = (arr1, arr2) => {
        var arr3 = [];
        arr1.forEach(function (id) {
            // Tìm kiếm phần tử có cùng id trong arr2
            var found = arr2.find(function (item) {
                return item.id === id;
            });
            // Nếu tìm thấy, thêm tên vào arr3
            if (found) {
                arr3.push(found.email);
            }
        });
        console.log(arr3);

        return arr3;
    };
    // send mail
    const handleSendMail = async () => {
        setVisible(false);
        notify('đang chờ');
        try {
            const token = JSON.parse(localStorage.getItem('auth'))?.token;
            const data = { templateId: template.type, emails: mailArr(listUsers, list) };
            console.log(data);
            const config = {
                withCredentials: false,
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
            const response = await axios.post(port + '/customers/sending-mails', data, {
                ...config,
            });
            window.location.href = '/mail';
            notify('gửi mail thành công');
            console.log(response);
        } catch (error) {
            console.error('Lỗi khi tải xuống file Excel:', error);
        }
    };
    return (
        <div className="list-template">
            <h3>Chọn template</h3>
            <div className="template-container">
                <div className="template-navigator">
                    <div
                        className={`template-option ${template.type === 1 ? 'active' : ''}`}
                        id={'template/cat-dien.html'}
                        tabIndex={1}
                        onClick={(e) => getTemplate(e)}
                    >
                        Thông báo cắt điện
                    </div>
                    <div
                        className={`template-option ${template.type === 2 ? 'active' : ''}`}
                        id={'template/cham-han.html'}
                        tabIndex={2}
                        onClick={(e) => getTemplate(e)}
                    >
                        Thông báo chậm hạn
                    </div>
                    <div
                        className={`template-option ${template.type === 3 ? 'active' : ''}`}
                        id={'template/hoa-don.html'}
                        tabIndex={3}
                        onClick={(e) => getTemplate(e)}
                    >
                        Hóa đơn
                    </div>
                </div>
                <div className="template-content">
                    <iframe src={template.src}></iframe>
                </div>
            </div>
            <div className="button-accept add">
                <DialogComponent
                    setVisible={setVisible}
                    callBackFunc={handleSendMail}
                    description={' Bạn có chắc muốn gửi mail ?'}
                    title={'Gửi mail!'}
                    visible={visible}
                />
                <button tabIndex="1" className="btn-cauhinh btn-danger" onClick={() => setVisible(true)}>
                    Gửi mail
                </button>
            </div>
        </div>
    );
}

export default ListTemplate;
