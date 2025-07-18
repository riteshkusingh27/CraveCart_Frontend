import React from 'react'
import Menubar from './Components/Menubar/Menubar.jsx'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ExploreFood from './pages/ExploreFood.jsx'
import Contactus from './pages/Contactus.jsx'
const App = () => {
  return (
    <div>

   <Menubar />
   
   <Routes> 
    <Route path="/" element={<Home />} />
    <Route path="/explorefood" element={<ExploreFood />} />
    <Route path="/contactus" element={<Contactus />} />
     
   </Routes>

    </div>
  )
}

export default App