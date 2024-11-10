
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './compoment/navbar'
import Footer from './compoment/footer'

function App() {


  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
