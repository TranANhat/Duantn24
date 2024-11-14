
import '../style/listhd.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import ADDHD from './addhd';
import CTHD from './chitiethd';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const stylect = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function ListHd() {
    const [openDetailModal, setOpenDetailModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpenDetail = () => setOpenDetailModal(true);
    const handleCloseDetail = () => setOpenDetailModal(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [hoadonlist, sethoadonlist] = useState([])


    async function handledHoadon() {
        try {
            const res = await axios.get(`http://localhost:3000/api/hd/hoadon`);
            sethoadonlist(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handledHoadon();
    }, [])
    return (
        <>
            <section className="list-hd">
                <div className='main'>

                    <table>
                        <tr>


                            <th>id</th>
                            <th>Tên khách hàng</th>
                            <th>Trạng thái</th>
                            <th>Tổng tiền</th>
                            <th>Phương thức thanh toán</th>
                            <th>Chi tiết hóa đơn</th>
                            <th>Hành động</th>
                        </tr>
                        {hoadonlist.map((hd) => (

                            <tr key={hd.id}>
                                <td>{hd.id}</td>
                                <td>{hd.tenKhachHang}</td>
                                <td>{hd.trangThai}</td>
                                <td>{hd.tongTien}</td>
                                <td>{hd.phuongThucThanhToan}</td>
                                <td>

                                    <Button className='btn-ct' onClick={handleOpenDetail}>Chi tiết hóa đơn</Button>
                                    <Modal
                                        open={openDetailModal}
                                        onClose={handleCloseDetail}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box className="box" sx={stylect}>
                                            <CTHD />
                                        </Box>

                                    </Modal>
                                </td>

                                <td>
                                    <button>Xóa</button>
                                    <button>Sửa</button>
                                </td>

                            </tr>


                        ))}

                        <tr >
                            <td>1</td>
                            <td>Hoàng</td>
                            <td>Đang xác nhận</td>
                            <td>10000000</td>
                            <td>Tiền mặt</td>
                            <td>

                                <Button className='btn-ct' onClick={handleOpenDetail}>Chi tiết hóa đơn</Button>
                                <Modal
                                    open={openDetailModal}
                                    onClose={handleCloseDetail}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className="box" sx={stylect}>
                                        <CTHD />
                                    </Box>

                                </Modal>
                            </td>

                            <td>
                                <button>Xóa</button>
                                <button>Sửa</button>
                            </td>

                        </tr>

                    </table>

                    <Button className='btn' onClick={handleOpen}>Thêm hóa đơn</Button>
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

                </div>

            </section>
        </>
    )
}
export default ListHd