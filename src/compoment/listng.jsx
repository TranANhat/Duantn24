import '../style/listnd.scss'
import  { useEffect, useState } from 'react';
import axios from 'axios';



function ListND() {
    const [user, setUser] = useState([])

    async function GetAllUsr() {
        try {
            const res = await axios.get(`http://localhost:3000/api/user/users`);
            setUser(res.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        GetAllUsr()
    }, [])



    async function HandleDeleteUser(id) {
        try {

            const res = await axios.delete(`http://localhost:3000/api/user/users/${id}`);
            console.log('User deleted', res.data);

        } catch (error) {
            console.error('API error:', error.response ? error.response.data : error);
            alert('Người dùng đang có đơn hàng');
        }
    }

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
                        {user.map((users) => (
                            <tr key={users.id}>
                                <td>{users.id}</td>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                                <td>{users.phone}</td>
                                <td>{users.diaChi}</td>

                                <td>
                                    <button className='delete-btn ' onClick={() => (HandleDeleteUser(users.id))}>Xóa</button>
                                    <button>Sửa</button>
                                </td>

                            </tr>


                        ))}


                    </table>



                </div>

            </section>
        </>
    )
}
export default ListND