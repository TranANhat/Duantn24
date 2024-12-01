import "../style/feedlist.scss";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Button } from "@mui/material";
import axios from "axios";

const FeedbackList = () => {
  const [groupedFeedback, setGroupedFeedback] = useState([]); // Dữ liệu phân nhóm theo ngày
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Định dạng gốc (UTC)
    const localDate = new Date(date.getTime() + 7 * 60 * 60 * 1000); // Chuyển sang GMT+7 (7 giờ)
    const day = String(localDate.getDate()).padStart(2, '0');
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = localDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  // Hàm fetch dữ liệu phản hồi từ API
  const fetchFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/hd/feedback");
      const data = res.data;
  
      if (!data || data.length === 0) {
        console.log("Không có phản hồi.");
        setGroupedFeedback([]);
        return;
      }
  
      // Sắp xếp dữ liệu theo ngày giảm dần (mới nhất lên đầu)
      const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
      // Nhóm dữ liệu theo ngày
      const groupByDate = sortedData.reduce((acc, curr) => {
        const localDate = new Date(curr.created_at); // Thời gian gốc UTC
        const adjustedDate = new Date(localDate.getTime() + 7 * 60 * 60 * 1000); // Thêm 7 giờ
        const date = adjustedDate.toISOString().split("T")[0]; // Chỉ lấy phần ngày YYYY-MM-DD
        
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      }, {});
  
      // Chuyển đổi nhóm dữ liệu thành mảng với định dạng ngày
      const grouped = Object.keys(groupByDate).map((date) => ({
        date: formatDate(date), // Định dạng ngày từ YYYY-MM-DD sang DD-MM-YYYY
        feedbackList: groupByDate[date],
      }));
  
      // Sắp xếp lại các nhóm theo ngày mới nhất (sắp xếp giảm dần theo ngày)
      grouped.sort((a, b) => new Date(b.date) - new Date(a.date));

      setGroupedFeedback(grouped);
    } catch (err) {
      console.error("Lỗi khi fetch dữ liệu:", err);
      setError(err.response?.data?.message || "Lỗi kết nối tới máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const pageCount = Math.ceil(groupedFeedback.length) || 1; // Phân trang theo số nhóm ngày, không theo số phản hồi

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Lấy nhóm ngày hiển thị cho trang hiện tại
  const displayedFeedback = groupedFeedback.slice(
    currentPage * 1, // Một nhóm ngày trên mỗi trang
    (currentPage + 1) * 1
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Lỗi: {error}</p>;
  if (groupedFeedback.length === 0) return <p>Không có đánh giá nào để hiển thị.</p>;

  return (
    <section className="list-feedback">
      <div className="main">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên khách hàng</th>
              <th>Dịch vụ</th>
              <th>Đánh giá</th>
              <th> Hành động</th>
            </tr>
          </thead>
          <tbody>
            {displayedFeedback.map((group) => (
              <React.Fragment key={group.date}>
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", fontWeight: "bold", background: "#4d4d4d", color: "white" }}>
                    Ngày: {group.date}
                  </td>
                </tr>
                {group.feedbackList.map((fb, fbIndex) => (
                  <tr key={fb.id}>
                    <td style={{ width: "10%" }}>{fbIndex + 1}</td>
                    <td>{fb.ten_khachhang}</td>
                    <td>{fb.ten_dichvu }</td>
                    <td>{fb.comment}</td>
                    <td>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleFeedbackDetail(fb.id)}
                      >
                       Hành động
                      </Button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <ReactPaginate
  previousLabel={"←"}
  nextLabel={"→"}
  breakLabel={"..."}  // Dấu chấm chấm giữa các trang
  pageCount={pageCount} // Tổng số trang
  marginPagesDisplayed={1} // Số trang hiển thị ở đầu và cuối
  pageRangeDisplayed={2} // Số trang hiển thị xung quanh trang hiện tại
  onPageChange={handlePageClick} // Xử lý sự kiện khi nhấn vào một trang
  containerClassName={"pagination"}
  activeClassName={"active"}
  pageLinkClassName={"page-link"}
  previousLinkClassName={"page-link"}
  nextLinkClassName={"page-link"}
  breakClassName={"break"} // Lớp CSS cho dấu "..."
  breakLinkClassName={"page-link"} // Lớp CSS cho nút "..."
/>

      </div>
    </section>
  );
};

const handleFeedbackDetail = (id) => {
  console.log(`Xem chi tiết phản hồi với ID: ${id}`);
};

export default FeedbackList;
