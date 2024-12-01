import React, { useState, useEffect } from "react";
import ListKhuyenMai from "./listKM";  // Giả sử bạn đã có component này để hiển thị danh sách khuyến mãi
import '../style/km.scss';
import SearchIcon from '@mui/icons-material/Search';

function KhuyenMai() {  
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Tìm kiếm:', searchQuery);
        // Thực hiện logic tìm kiếm tại đây
    };

    return (
        <>
            <section className='    khuyenmai'>
                <h1>Quản Lý Khuyến Mãi</h1>
                <div className="box">
                    <form className="sbox" onSubmit={handleSearchSubmit}>
                        <input
                            className="stext"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            name="q"
                            placeholder="Tìm kiếm mã khuyến mãi..."
                        />
                        <button className="sbutton" type="submit">
                            <SearchIcon />
                        </button>
                    </form>
                </div>
                <button className="add-button">Thêm Mới</button>  {/* Thêm button để thêm mã khuyến mãi mới */}
            </section>
            <ListKhuyenMai searchQuery={searchQuery} />
        </>
    );
}

export default KhuyenMai;