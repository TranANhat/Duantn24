import '../style/cthd.scss'

function CTHD() {

    return (

        <>
            <section className="cthd">
                <div className='main'>

                    <table>
                        <tr>
                            <th>id</th>
                            <th>Tên khách hàng</th>
                            <th>Tên dịch vụ</th>
                            <th>Mã giảm giá</th>
                            <th>Tổng tiền</th>
                            <th>Thời gian</th>
                            <th>Hành động</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Huỳnh Đức Hoàng</td>
                            <td>Massager</td>
                            <td>MSV</td>
                            <td>1000000</td>

                            <td>
                                12.12.2024
                            </td>

                            <td>
                                <button>Xóa</button>
                                <button>Sửa</button>
                            </td>

                        </tr>

                    </table>



                </div>

            </section>

        </>
    )
}

export default CTHD