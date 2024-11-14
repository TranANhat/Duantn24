import ListHd from "./listhd"
import '../style/hoadon.scss'
import SearchIcon from '@mui/icons-material/Search';
function HoaDon() {
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = e.target.elements.q.value;
        console.log('Tìm kiếm:', query);
        // Thực hiện logic tìm kiếm tại đây
    };
    return (
        <>
            <section className='hoadon'>
                <h1>Hóa Đơn</h1>
                <div className="box">
                    <form className="sbox" onSubmit={handleSearchSubmit}>
                        <input
                            className="stext"
                            type="text"
                            name="q"
                            placeholder="Tìm kiếm bài viết..."
                        />
                        <button className="sbutton" type="submit">
                            <SearchIcon />
                        </button>
                    </form>
                </div>
            </section>
            <ListHd />
        </>
    )
}

export default HoaDon