import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SellIcon from '@mui/icons-material/Sell';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import CommentIcon from '@mui/icons-material/Comment';
import '../style/navbar.scss'
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
    const [activeItem, setActiveItem] = useState('');

    const handleClick = (item) => {
        setActiveItem(item);
    };

    const activeStyle = {
        background: "#e6e6e6"

    };

    return (<>
        <section className="navbar">
            <Link href="" className='brand'>
                <i className='bx'> <ManageAccountsIcon /></i>
                <span>Admin</span>

            </Link>

            <ul className="side-menu top">
                <li style={activeItem === '/' ? activeStyle : {}} onClick={() => handleClick('/')}>
                    <Link to='/'>
                        <i className='bx'><HomeIcon /></i>
                        <span className="text">Trang chủ</span>
                    </Link>
                </li>

                <li style={activeItem === '/dichvu' ? activeStyle : {}} onClick={() => handleClick('/dichvu')}>
                    <Link to='/dichvu' >
                        <i className='bx'> <LocalMallIcon /></i>
                        <span className="text">Dịch vụ</span>
                    </Link>
                </li>

                <li style={activeItem === '/nguoidung' ? activeStyle : {}} onClick={() => handleClick('/nguoidung')}>
                    <Link to="/nguoidung" >
                        <i className='bx'><PersonIcon /></i>
                        <span className="text">Người dùng</span>
                    </Link>
                </li>

                <li style={activeItem === '/hoadon' ? activeStyle : {}} onClick={() => handleClick('/hoadon')}>
                    <Link to="/hoadon" >
                        <i className='bx'> <ReceiptLongIcon /></i>
                        <span className="text">Hóa đơn</span>
                    </Link>
                </li>

                <li style={activeItem === '/khuyenmai' ? activeStyle : {}} onClick={() => handleClick('/khuyenmai')}>
                    <Link to="/khuyenmai" >
                        <i className='bx'> <SellIcon /></i>
                        <span className="text">Mã khuyến mãi</span>
                    </Link>
                </li>


                <li style={activeItem === '/danhgia' ? activeStyle : {}} onClick={() => handleClick('/danhgia')}>
                    <Link to="/danhgia" >
                        <i className='bx'> <CommentIcon /></i>
                        <span className="text">Đánh giá</span>
                    </Link>
                </li>
            </ul>

            <ul className="side-menu ">
                <li>
                    <Link href="" className='logout' >
                        <i className='bx'> <LogoutIcon /></i>
                        <span className="text">Đăng xuất</span>
                    </Link>
                </li>
            </ul>


        </section>


    </>)
}

export default Navbar