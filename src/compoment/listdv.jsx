import '../style/listdv.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import ADD from './adddv';

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
function ListDV() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <section className="list-dv">
                <div className='main'>

                    <table>
                        <tr>


                            <th>id</th>
                            <th>Hình ảnh</th>
                            <th>Tên dịch vụ</th>
                            <th>Mô tả</th>
                            <th>Giá</th>
                            <th>Hành động</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>IMG</td>
                            <td>Massager</td>
                            <td>dáhdasdhaksjdaskjd</td>
                            <td>Giá : 10.000.VNĐ</td>

                            <td>
                                <button>Xóa</button>
                                <button>Sửa</button>
                            </td>

                        </tr>
                        <tr>
                            <td>1</td>
                            <td>IMG</td>
                            <td>Massager</td>
                            <td>dáhdasdhaksjdaskjd</td>
                            <td>Giá : 10.000.VNĐ</td>

                            <td>
                                <button>Xóa</button>
                                <button>Sửa</button>
                            </td>

                        </tr>
                        <tr>
                            <td>1</td>
                            <td>IMG</td>
                            <td>Massager</td>
                            <td>dáhdasdhaksjdaskjd</td>
                            <td>Giá : 10.000.VNĐ</td>

                            <td>
                                <button>Xóa</button>
                                <button>Sửa</button>
                            </td>

                        </tr>
                        <tr>
                            <td>1</td>
                            <td>IMG</td>
                            <td>Massager</td>
                            <td>dáhdasdhaksjdaskjd</td>
                            <td>Giá : 10.000.VNĐ</td>

                            <td>
                                <button>Xóa</button>
                                <button>Sửa</button>
                            </td>

                        </tr>
                        <tr>
                            <td>1</td>
                            <td>IMG</td>
                            <td>Massager</td>
                            <td>dáhdasdhaksjdaskjd</td>
                            <td>Giá : 10.000.VNĐ</td>

                            <td>
                                <button >Xóa</button>
                                <button >Sửa</button>
                            </td>

                        </tr>

                    </table>

                    <Button className='btn' onClick={handleOpen}>Thêm dịch vụ</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="box" sx={style}>
                            <ADD />
                        </Box>
                    </Modal>

                </div>

            </section>
        </>
    )
}
export default ListDV