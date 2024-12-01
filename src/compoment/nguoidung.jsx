import ListND from "./listng"
import '../style/user.scss'
import SearchIcon from '@mui/icons-material/Search';

function User() {
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = e.target.elements.q.value;
        console.log('Tìm kiếm:', query);
        // Thực hiện logic tìm kiếm tại đây
    };
    return (
        <>
            <section className='user'>
                <h1>Người dùng</h1>
                <div className="box">
                    <form className="sbox" onSubmit={handleSearchSubmit}>
                        <input
                            className="stext"
                            type="text"
                            name="q"
                            placeholder="Tìm kiếm người dùng..."
                        />
                        <button className="sbutton" type="submit">
                            <SearchIcon />
                        </button>
                    </form>
                </div>
            </section>
            <ListND />
        </>
    )
}

export default User