import '../style/listhd.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ADDHD from './addhd';
import '../style/cthd.scss';

import { format } from 'date-fns';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const stylect = {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 190,
    bgcolor: 'background.paper',
    border: 'px solid #000',
    boxShadow: 24,
};

function ListHd() {
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [hoadonlist, setHoadonlist] = useState([]);
    const [selectedHoaDon, setSelectedHoaDon] = useState([]);

    const handleOpenDetail = (id) => {
        console.log("Opening detail for invoice ID:", id);
        handledCTHoadon(id);
        setOpenDetailModal(true);
    };

    const handleCloseDetail = () => setOpenDetailModal(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Trạng thái hóa đơn
    async function updateHoadonStatus(id, newStatus) {
        try {
            await axios.put(`http://localhost:3000/api/hd/hoadon/${id}/status`, { trangThai: newStatus });
            handledHoadon();
            setHoadonlist((prevList) =>
                prevList.map((hd) =>
                    hd.id === id ? { ...hd, trangThai: newStatus } : hd
                )
            );
        } catch (error) {
            console.log("Lỗi khi cập nhật trạng thái:", error);
        }
    }

    // Xóa hóa đơn
    async function handleDeleteHoaDon(id) {
        try {
            const res = await axios.delete(`http://localhost:3000/api/hd/hoadon/${id}`);
            setHoadonlist(res.data);
            alert("Xóa thành công");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    // Lấy chi tiết hóa đơn
    async function handledCTHoadon(id) {
        try {
            const res = await axios.get(`http://localhost:3000/api/cthd/chitiethd/${id}`);
            setSelectedHoaDon(res.data);
        } catch (error) {
            console.log("Lỗi khi lấy chi tiết hóa đơn:", error);
        }
    }

    // Lấy danh sách hóa đơn
    async function handledHoadon() {
        try {
            const res = await axios.get(`http://localhost:3000/api/hd/hoadon`);
            setHoadonlist(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handledHoadon();
    }, []);

    


    return (
        
        <>
            <section className="list-hd">
                <div className="main">
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Tên khách hàng</th>
                                <th>Ngày hẹn</th>
                                <th>Trạng thái</th>
                                <th>Tổng tiền</th>
                                <th>Phương thức thanh toán</th>
                                <th>Chi tiết hóa đơn</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hoadonlist.map((hd) => (
                                <tr key={hd.id}>
                                    <td>{hd.id}</td>
                                    <td>{hd.tenKhachHang}</td>
                                    <td>{format(new Date(hd.ngayHen), 'dd/MM/yyyy')}</td>
                                    <td className={`status ${hd.trangThai === "Đã xác nhận" ? "confirmed" : hd.trangThai === "Đã hủy" ? "canceled" : ""}`}>
                                        {hd.trangThai}
                                    </td>
                                    <td>{hd.tongTien}</td>
                                    <td>{hd.phuongThucThanhToan}</td>
                                    <td className="cthd">
                                        <Button className="btn-ct" onClick={() => handleOpenDetail(hd.id)}>
                                            Chi tiết hóa đơn
                                        </Button>
                                    </td>
                                    <td>
                                        {hd.trangThai !== "Đã xác nhận" && (
                                            <button className="confirm-btn" onClick={() => updateHoadonStatus(hd.id, "Đã xác nhận")}>Xác nhận</button>
                                        )}
                                        {hd.trangThai !== "Đã hủy" && (
                                            <button className="cancel-btn" onClick={() => updateHoadonStatus(hd.id, "Đã hủy")}>Hủy</button>
                                        )}
                                        <button className='delete-btn' onClick={() => handleDeleteHoaDon(hd.id)}>Xóa</button>
                                        <button>Sửa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Button className="btn" onClick={handleOpen}>Thêm hóa đơn</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="box" sx={style}>
                            <ADDHD />
                        </Box>
                    </Modal>

                    <Modal
                        open={openDetailModal}
                        onClose={handleCloseDetail}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="box-ct" sx={stylect}>
                            <div className="main-ct">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Tên khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Email</th>
                                            <th>Tên dịch vụ</th>
                                            <th>Đơn giá</th>
                                            <th>Tổng tiền</th>

                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedHoaDon.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.tenKhachHang}</td>
                                                <td>{item.soDienThoai}</td>
                                                <td>{item.email}</td>
                                                <td>{item.DichVu}</td>
                                                <td>{item.donGia}</td>
                                                <td>{item.thanhTien}</td>
                                                <td>
                                                    <button>Xóa</button>
                                                    <button>Sửa</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </section>
        </>
    );
}

export default ListHd;
