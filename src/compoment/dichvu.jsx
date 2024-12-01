import '../style/dichvu.scss'
import ListDV from './listdv'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import ListSRDV from './searchdv';

function DichVu() {
    const [seacrch, setSearch] = useState('')
    const [load, setload] = useState([])

    async function handleSearch() {
        try {
            const res = await axios.get(`http://localhost:3000/api/dv/dichvu/search?tenDichVu=${seacrch}`)
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
            <section className='dichvu'>
                <h1>Dich Vụ</h1>
                <div className="box">
                    <form className="sbox" onSubmit={handleSearch}>
                        <input
                            className="stext"
                            type="text"
                            name="tenDichVu"
                            placeholder="Tìm kiếm dịch vụ..."
                            value={seacrch}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="sbutton" type="submit">
                            <SearchIcon />
                        </button>
                    </form>
                </div>



            </section>
            {load.length > 0 ? <ListSRDV load={load} /> : <ListDV />}


        </>
    )
}

export default DichVu