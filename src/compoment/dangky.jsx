import React, { useState } from 'react';
import '../style/dangky.scss';
import { register } from '../services/auth';


function DangKy() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('2'); // 2 là nhân viên, 1 là admin
    const [error, setError] = useState(''); // Thêm state để lưu lỗi
    const [loading, setLoading] = useState(false); // Thêm state để quản lý trạng thái loading

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setLoading(true); // Bắt đầu quá trình đăng ký

        try {
            await register(username, password, role);
            setLoading(false); // Kết thúc quá trình đăng ký
            alert('Đăng ký thành công!');
        } catch (error) {
            setLoading(false); // Kết thúc quá trình đăng ký
            if (error.response) {
                setError(error.response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại');
            } else if (error.request) {
                console.error('No response received:', error.request);
                setError('Không nhận được phản hồi từ server, vui lòng kiểm tra kết nối');
            } else {
                setError(`Lỗi yêu cầu: ${error.message}`);
            }
        }
    };

    return (
        <>
            <div className="dangnhap-container">
                <form className='fm' onSubmit={handleSubmit}>
                    <h2>Đăng Ký</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="1">Admin</option>
                        <option value="2">Nhân viên</option>
                    </select>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                    </button>
                </form>

                {/* Hiển thị thông báo lỗi nếu có */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
}

export default DangKy;
