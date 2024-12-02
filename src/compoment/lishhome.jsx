import React, { useEffect, useState } from 'react';
import axios from 'axios'; import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
import '../style/listhome.scss'



function ListHome() {
    const [hoadonlist, setHoadonlist] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const formatPrice = (price) => { return new Intl.NumberFormat('vi-VN').format(price) + ' đồng'; };
    const handledHoadon = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/hd/hoadon`);
            setHoadonlist(res.data);
            let total = 0; res.data.forEach(hd => { total += hd.tongTien; });
            setTotalRevenue(total); setOrderCount(res.data.length);
        }
        catch (error) { console.log(error); }
    };
    useEffect(() => { handledHoadon(); }, []);
    const data = {
        labels: hoadonlist.map(hd => format(new Date(hd.ngayHen), 'dd/MM/yyyy')),
        datasets: [{
            label: 'Doanh thu', data: hoadonlist.map(hd => hd.tongTien),
            backgroundColor: 'rgba(75, 192, 192, 0.6)', borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    };
    const options = { scales: { y: { beginAtZero: true } } };

    return (
        <>
            <section className="list-dv">
                <div className='main'>
                    <div className="sales-statistics">
                        <h2>Bảng thống kê</h2>
                        <p>Tổng doanh thu: {formatPrice(totalRevenue)}</p>
                        <p>Số lượng đơn hàng: {orderCount}</p>
                        <div className="chart-container">
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
export default ListHome