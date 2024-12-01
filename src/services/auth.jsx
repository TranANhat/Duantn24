import axios from 'axios';

const API_URL = 'http://localhost:3000/api/dn';

// Hàm đăng ký
export const register = async (username, password, role_id) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password, role_id });
        return response.data; // Trả về kết quả sau khi đăng ký thành công
    } catch (error) {
        if (error.response) {
            // Server đã phản hồi với lỗi
            throw new Error(error.response.data.message || 'Đã xảy ra lỗi khi đăng ký');
        } else if (error.request) {
            // Yêu cầu đã được gửi nhưng không có phản hồi
            throw new Error('Không nhận được phản hồi từ server');
        } else {
            // Lỗi xảy ra trong quá trình thiết lập yêu cầu
            throw new Error(error.message);
        }
    }
};

// Hàm đăng nhập
// Hàm đăng nhập
export async function login(username, password) {
    try {
        const response = await axios.post('http://localhost:3000/api/dn/login', { username, password });

        // Kiểm tra xem API trả về dữ liệu hợp lệ hay không
        if (!response.data || !response.data.token || !response.data.role) {
            console.error('Dữ liệu trả về từ API không hợp lệ:', response.data);  // Log dữ liệu trả về từ API để kiểm tra
            throw new Error('API không trả về token hoặc role hợp lệ');
        }

        // Trả về cả token và role
        return { token: response.data.token, role: response.data.role };
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        throw new Error(error.message || 'Đăng nhập thất bại');
    }
}



// Hàm đăng xuất
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

// Lấy token từ localStorage
export const getToken = () => localStorage.getItem('token');

// Lấy role từ localStorage
export const getRole = () => localStorage.getItem('role');
