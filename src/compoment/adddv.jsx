import '../style/adddv.scss'

function ADD() {
    return (
        <>
            <div className="add">
                <h2>Thêm sản phẩm</h2>
                <div className="text">
                    <p className="text-dv">Tên dịch vụ</p>
                    <input type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">Mô tả</p>
                    <input type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">Giá</p>
                    <input type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">Hình ảnh</p>
                    <input type="file" />
                </div>
                <button>Thêm sản phẩm</button>

            </div>
        </>
    )
}
export default ADD