import React from 'react'
import Menubar from './Components/Menubar/Menubar.jsx'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ExploreFood from './pages/ExploreFood.jsx'
import Contactus from './pages/Contactus.jsx'
import FoodDetail from './pages/FoodDetail.jsx'
import Cart from './pages/Cart.jsx'
const App = () => {
  return (
    <div>

   <Menubar />
   
   <Routes> 
    <Route path="/" element={<Home />} />
    <Route path="/explorefood" element={<ExploreFood />} />
    <Route path="/contactus" element={<Contactus />} />
    <Route path="/food/:id" element={<FoodDetail />} />
    <Route path="/cart" element={<Cart />} />
   </Routes>

    </div>
  )
}

export default App