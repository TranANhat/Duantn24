import '../style/listdv.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import ADD from './adddv';
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
function ListDV() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState(null);
    const [dichvulist, setdichvulist] = useState([])



    async function handledichvu() {
        try {
            const res = await axios.get(`http://localhost:3000/api/dv/dichvu`);
            setdichvulist(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handledichvu();
    }, [])

    async function handleDeletedichvu(id) {
        try {
            const res = await axios.delete(`http://localhost:3000/api/dv/dichvu/${id}`);
            setdichvulist(res.data)
            alert("Xóa thành công")
            window.location.reload()
        } catch (error) {
            if (error.response) {
                console.error("API error:", error.response.data.message);
                alert(error.response.data.message);
            } else {
                console.error("Network error:", error.message);
            }
        }
    }
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
                        {dichvulist.map((dv) => (
                            <tr key={dv.id}>
                                <td>{dv.id}</td>
                                <td> <img src={`http://localhost:3000${dv.hinhanh}`} alt="Service Image" /></td>
                                <td>{dv.tenDichVu}</td>
                                <td>{dv.moTa}</td>
                                <td>Giá : {dv.gia} VNĐ</td>

                                <td>
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                    <button onClick={() => handleDeletedichvu(dv.id)}>Xóa</button>
                                    <button>Sửa</button>
                                </td>

                            </tr>

                        ))}



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