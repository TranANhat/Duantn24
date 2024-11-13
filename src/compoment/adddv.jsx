import { useState } from 'react';
import '../style/adddv.scss'
import axios from 'axios';

function ADD() {

    const [tendichvu, setTendichvu] = useState('');
    const [mota, setMota] = useState('')
    const [gia, setGia] = useState('')
    const [img, setImg] = useState(null)

    async function handledaddichvu() {
        try {
            const formData = new FormData();
            formData.append("tenDichVu", tendichvu);
            formData.append("gia", gia);
            formData.append("moTa", mota);
            formData.append("hinhanh", img);

            const res = await axios.post(`http://localhost:3000/api/dv/dichvu`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

            console.log("Response from API:", res.data);

            setTendichvu('')
            setGia('')
            setMota('')
            setImg(null)
            alert('Thêm thành công')
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="add">
                <h2>Thêm sản phẩm</h2>
                <div className="text">
                    <p className="text-dv">Tên dịch vụ</p>
                    <input
                        value={tendichvu}
                        onChange={(e) => (setTendichvu(e.target.value))}
                        type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">Mô tả</p>
                    <input
                        value={mota}
                        onChange={(e) => (setMota(e.target.value))}
                        type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">Giá</p>
                    <input
                        value={gia}
                        onChange={(e) => (setGia(e.target.value))}
                        type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">Hình ảnh</p>
                    <input
                        type="file"
                        name="hinhanh"
                        accept="image/*"
                        onChange={(e) => setImg(e.target.files[0])} />
                </div>
                <button onClick={handledaddichvu}>Thêm sản phẩm</button>

            </div>
        </>
    )
}
export default ADD