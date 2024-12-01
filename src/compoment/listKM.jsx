import '../style/listkm.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ADDKM from './addkm';

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

function ListKhuyenMai() {
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [khuyenMaiList, setKhuyenMaiList] = useState([]);
    const [selectedKhuyenMai, setSelectedKhuyenMai] = useState([]);

    const handleOpenDetail = (id) => {
        console.log("Opening detail for promotion ID:", id);
        handledCTKhuyenMai(id);
        setOpenDetailModal(true);
    };

    const handleCloseDetail = () => setOpenDetailModal(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Xóa mã khuyến mãi
    async function handleDeleteKhuyenMai(id) {
        try {
            const res = await axios.delete(`http://localhost:3000/api/km/khuyenmaii/${id}`);
            setKhuyenMaiList(res.data);
            alert("Xóa thành công");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    // Lấy chi tiết mã khuyến mãi
    async function handledCTKhuyenMai(id) {
        try {
            const res = await axios.get(`http://localhost:3000/api/khuyenmai/detail/${id}`);
            setSelectedKhuyenMai(res.data);
        } catch (error) {
            console.log("Lỗi khi lấy chi tiết khuyến mãi:", error);
        }
    }

    // Lấy danh sách mã khuyến mãi
    async function handledKhuyenMai() {
        try {
            const res = await axios.get(`http://localhost:3000/api/km/khuyenmaii`);
            setKhuyenMaiList(res.data);
        } catch (error) {   
            console.log(error);
        }
    }

    useEffect(() => {
        handledKhuyenMai();
    }, []);

    return (
        <>
            <section className="list-km">
                <div className="main">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên Mã</th>
                                <th>Ngày Bắt Đầu</th>
                                <th>Ngày Kết Thúc</th>
                                <th>Phần Trăm Giảm</th>
                                <th>Hành Động</th>
                            </tr>
</thead>
                        <tbody>
                            {khuyenMaiList.map((km) => (
                                <tr key={km.id}>
                                    <td>{km.id}</td>
                                    <td>{km.tenKhuyenMai}</td>
                                    <td>{new Date(km.ngayBatDau).toLocaleDateString()}</td>
                                    <td>{new Date(km.ngayKetThuc).toLocaleDateString()}</td>
                                    <td>{km.phanTram}%</td>
                                    <td>
                                        <Button className="btn-detail" onClick={() => handleOpenDetail(km.id)}>
                                            Chi Tiết
                                        </Button>
                                        <button className="delete-btn" onClick={() => handleDeleteKhuyenMai(km.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Button className="btn-add" onClick={handleOpen}>Thêm Mã Khuyến Mãi</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="box" sx={style}>
                            <ADDKM />
                        </Box>
                    </Modal>

                    <Modal
                        open={openDetailModal}
                        onClose={handleCloseDetail}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="box-ct" sx={stylect}>
                            <div className="detail-modal">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên Mã</th>
                                            <th>Ngày Bắt Đầu</th>
                                            <th>Ngày Kết Thúc</th>
                                            <th>Phần Trăm Giảm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedKhuyenMai.map((km) => (
                                            <tr key={km.id}>
                                                <td>{km.id}</td>
                                                <td>{km.tenKhuyenMai}</td>
                                                <td>{new Date(km.ngayBatDau).toLocaleDateString()}</td>
<td>{new Date(km.ngayKetThuc).toLocaleDateString()}</td>
                                                <td>{km.phanTram}%</td>
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

export default ListKhuyenMai;