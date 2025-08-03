import React from 'react'
import Menubar from './Components/Menubar/Menubar.jsx'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ExploreFood from './pages/ExploreFood.jsx'
import Contactus from './pages/Contactus.jsx'
import FoodDetail from './pages/FoodDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import {ToastContainer} from 'react-toastify'
import Myorders from './pages/Myorders.jsx'
import {useAppcontext} from './context/AppContext.jsx'
import { Navigate } from 'react-router-dom'
const App = () => {
  const {token} = useAppcontext();
  return (
    <div>

   <Menubar />
   <ToastContainer draggable/>
   
   <Routes> 
    <Route path="/" element={<Home />} />
    <Route path="/explorefood" element={<ExploreFood />} />
    <Route path="/contactus" element={<Contactus />} />
    <Route path="/food/:id" element={<FoodDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={token ? <Checkout /> : <Navigate to="/login" />} />
    <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
    <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
    <Route path="/myorders" element={token ? <Myorders /> : <Navigate to="/login" />} />

   </Routes>

    </div>
  )
}

export default App