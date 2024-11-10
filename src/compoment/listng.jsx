import '../style/listnd.scss'
import React from 'react';



function ListND() {


    return (
        <>
            <section className="list-nd">
                <div className='main'>

                    <table>
                        <tr>


                            <th>id</th>
                            <th>Tên khách hàng</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Hành Động</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Huỳnh Đức Hoàng</td>
                            <td>hoandhdpd8407@fpt.edu.vn</td>
                            <td>0934521954</td>
                            <td>Nguyễn Đình Tứ</td>

                            <td>
                                <button>Xóa</button>
                                <button>Sửa</button>
                            </td>

                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Huỳnh Đức Hoàng</td>
                            <td>hoandhdpd8407@fpt.edu.vn</td>
                            <td>0934521954</td>
                            <td>Nguyễn Đình Tứ</td>

                            <td>
                                <button>Xóa</button>
                                <button>Sửa</button>
                            </td>

                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Huỳnh Đức Hoàng</td>
                            <td>hoandhdpd8407@fpt.edu.vn</td>
                            <td>0934521954</td>
                            <td>Nguyễn Đình Tứ</td>

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
export default ListND