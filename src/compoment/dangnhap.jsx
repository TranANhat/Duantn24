import React, { useState } from 'react';
import '../style/dangnhap.scss';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

function Dangnhap({ onLogin = () => console.log('Default onLogin được gọi!') }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { token, role } = await login(username, password);
    
            // Kiểm tra token và role
            if (!token || !role) {
                throw new Error('Token hoặc Role không hợp lệ');
            }
    
            // Lưu token và role vào Local Storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);  // Lưu 'role' thay vì 'role_id'
    
            // Kiểm tra và gọi onLogin nếu là hàm
            if (typeof onLogin === 'function') {
                onLogin();
            } else {
                console.warn('onLogin không phải là một hàm!');
            }
    
            // Điều hướng đến trang dịch vụ
            navigate('/');
            setError('');
        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            setError(err.message || 'Sai tên đăng nhập hoặc mật khẩu');
        }
    };
    
    

    return (
        <div className="dangnhap-container">
            <form onSubmit={handleSubmit} className="dangnhap-form">
                <h2>Đăng nhập</h2>
                <input
                    type="email"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-button">
                    Đăng nhập
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Dangnhap;
