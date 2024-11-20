import '../style/listdv.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import ADD from './adddv';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
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
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [dichvulist, setdichvulist] = useState([]);
    const [updatedichvu,Setupdatedichvu] = useState(null)
    const [formState, setFormState] = useState({ tenDichVu: '', moTa: '', gia: '' });

    const notifySuccess = () => toast.success('Xóa sản phẩm thành công!');


    const handleOpenDetail = (id) => {
        const service = dichvulist.find(dv => dv.id === id);
        if (service) {
            Setupdatedichvu(service);
            setFormState(service);
            setOpenDetailModal(true);
        }
    };

    const handleCloseDetail = () => setOpenDetailModal(false);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    async function handleUpdateDichVu() {
        try {
            await axios.put(`http://localhost:3000/api/dv/dichvu/${updatedichvu.id}`, formState);
            alert("Dịch vụ đã được cập nhật thành công");
            handledichvu(); // Refresh the list
            handleCloseDetail(); // Close the modal
        } catch (error) {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
            alert("Không thể cập nhật dịch vụ");
        }
    }

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
            console.log('Service deleted', res.data);
            notifySuccess()
            handledichvu();

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
                                    <button className='delete-btn' onClick={() => handleDeletedichvu(dv.id)}>Xóa</button>
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
                            <ADD onAddSuccess={handledichvu} />
                        </Box>
                    </Modal>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        closeOnClick
                        pauseOnHover
                        draggable
                        theme="colored"
                    />
                </div>

            </section>
        </>
    )
}
export default ListDV