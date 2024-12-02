import ListHd from "./listhd"
import '../style/hoadon.scss'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from "react";
import axios from 'axios';
import ListSearchHd from "./searchhd";
import { useState } from "react";
function HoaDon() {
    const [seacrch, setSearch] = useState('')
    const [load, setload] = useState([])

    async function handleSearch() {
        try {
            const res = await axios.get(`http://localhost:3000/api/hd/hoadon/search?username=${seacrch}`)
            setload(res.data)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (seacrch.trim() === '') {
            setload([]); // Nếu không có gì nhập, xóa kết quả tìm kiếm
        } else {
            handleSearch(); // Tự động tìm kiếm khi giá trị thay đổi
        }
    }, [seacrch])
    return (
        <>
            <section className='hoadon'>
                <h1>Hóa Đơn</h1>
                <div className="box">
                    <form className="sbox" onSubmit={handleSearch}>
                        <input
                            className="stext"
                            type="text"
                            name="username"
                            placeholder="Tìm kiếm hóa đơn..."
                            value={seacrch}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="sbutton" type="submit">
                            <SearchIcon />
                        </button>
                    </form>
                </div>
            </section>
            {load.length > 0 ? <ListSearchHd load={load} /> : <ListHd />}

        </>
    )
}

export default HoaDon