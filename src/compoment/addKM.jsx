import '../style/adddv.scss';
import { useState } from 'react';
import axios from 'axios';

function ADDKM() {
    const [tenKhuyenMai, setTenKhuyenMai] = useState('');
    const [moTa, setMoTa] = useState('');
    const [ngayBatDau, setNgayBatDau] = useState('');
    const [ngayKetThuc, setNgayKetThuc] = useState('');
    const [phanTram, setPhanTram] = useState('');

    // Xử lý sự kiện khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newKhuyenMai = {
                tenKhuyenMai,
                moTa,
                ngayBatDau,
                ngayKetThuc,
                phanTram
            };
            const res = await axios.post('http://localhost:3000/api/km/khuyenmaii', newKhuyenMai);
            if (res.status === 200) {
                alert('Thêm mã khuyến mãi thành công!');
            }
        } catch (error) {
            console.log('Lỗi khi thêm mã khuyến mãi:', error);
        }
    };

    return (
        <>
            <div className="add">
                <h2>Thêm mã khuyến mãi</h2>
                <form onSubmit={handleSubmit}>
                    <div className="text">
                        <p className="text-dv">Tên mã khuyến mãi</p>
                        <input
                            type="text"
                            value={tenKhuyenMai}
                            onChange={(e) => setTenKhuyenMai(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text">
                        <p className="text-dv">Mô tả</p>
                        <input
                            type="text"
                            value={moTa}
                            onChange={(e) => setMoTa(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text">
                        <p className="text-dv">Ngày bắt đầu</p>
                        <input
                            type="date"
                            value={ngayBatDau}
                            onChange={(e) => setNgayBatDau(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text">
                        <p className="text-dv">Ngày kết thúc</p>
                        <input
                            type="date"
                            value={ngayKetThuc}
                            onChange={(e) => setNgayKetThuc(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text">
                        <p className="text-dv">Phần trăm giảm</p>
                        <input
                            type="number"
                            min="0"
                             max="100"
                            value={phanTram}
                            onChange={(e) => setPhanTram(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit">Thêm mã khuyến mãi</button>
                </form>
            </div>
        </>
    );
}

export default ADDKM;