import ListND from "./listng"
import '../style/user.scss'
import SearchIcon from '@mui/icons-material/Search';
import ListSearchND from "./searchuser";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

function User() {
    const [seacrch, setSearch] = useState('')
    const [load, setload] = useState([])

    async function handleSearch() {
        try {
            const res = await axios.get(`http://localhost:3000/api/user/user/phone?phone=${seacrch}`)
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
            <section className='user'>
                <h1>Người dùng</h1>
                <div className="box">
                    <form className="sbox" onSubmit={handleSearch}>
                        <input
                            className="stext"
                            type="text"
                            name="phone"
                            placeholder="Tìm kiếm người dùng..."
                            value={seacrch}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="sbutton" type="submit">
                            <SearchIcon />
                        </button>
                    </form>
                </div>
            </section>
            {load.length > 0 ? <ListSearchND load={load} /> : <ListND />}

        </>
    )
}

export default User