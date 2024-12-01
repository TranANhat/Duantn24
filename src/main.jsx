import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.jsx'
import Home from './compoment/home.jsx';
import DichVu from './compoment/dichvu.jsx';
import User from './compoment/nguoidung.jsx';
import HoaDon from './compoment/hoadon.jsx';
import DangNhap from './compoment/dangnhap.jsx';
import DangKy from './compoment/dangky.jsx';
import FeedbackList from './compoment/listfeddback.jsx';
import KhuyenMai from './compoment/khuyenmai.jsx';

const router = createBrowserRouter([
  {
    path: '/dangky',
    element: <DangKy />
   },
  {
  path: '/dangnhap',
  element: <DangNhap />
   },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/dichvu',
        element: <DichVu />
      },
      {
        path: '/nguoidung',
        element: <User />
      },
      {
        path: '/hoadon',
        element: <HoaDon />
      },
      {
        path: '/khuyenmai',
        element: <KhuyenMai/>
      },
      {
        path: '/danhgia',
        element: <FeedbackList />
      },

    ]

  }
])

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)
