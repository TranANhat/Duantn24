import '../style/adddv.scss'

function ADDHD() {
    return (
        <>
            <div className="add">
                <h2>Thêm sản phẩm</h2>
                <div className="text">
                    <p className="text-dv">Tên khách hàng</p>
                    <input type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">Email</p>
                    <input type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">SĐT</p>
                    <input type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">Địa chi</p>
                    <input type="text" />
                </div>
                <div className="text">
                    <p className="text-dv">Ngày giờ</p>
                    <input type="date" />
                </div>
                <div className="text">
                    <p className="text-dv">Dịch vụ</p>
                    <select >
                        <option value="">Dịch vụ 1</option>
                    </select>
                </div>
                <div className="text">
                    <p className="text-dv">Mã giảm giá</p>
                    <input type="text" />
                </div>


                <button>Thêm hóa đơn</button>

            </div>
        </>
    )
}
export default ADDHD