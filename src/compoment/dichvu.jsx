import '../style/dichvu.scss'
import ListDV from './listdv'
import SearchIcon from '@mui/icons-material/Search';

function DichVu() {
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = e.target.elements.q.value;
        console.log('Tìm kiếm:', query);
        // Thực hiện logic tìm kiếm tại đây
    };
    return (
        <>
            <section className='dichvu'>
                <h1>Dich Vụ</h1>
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
            <ListDV />

        </>
    )
}

export default DichVu