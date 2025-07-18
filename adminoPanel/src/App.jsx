import React from "react";
import { Routes, Route } from "react-router-dom";
import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Orders from "./pages/Orders/Orders";
import Menubar from "./components/Menubar/Menubar";
import Sidebar from "./components/Sidebar/Sidebar";
  import { ToastContainer} from 'react-toastify';
import { useState } from "react";
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    console.log("Sidebar toggled");
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="d-flex" id="wrapper">

      {/* // accepts props into side bar  */}
      <Sidebar sidebarOpen={sidebarOpen}  />

      <div id="page-content-wrapper">
        {/* // accepts function and set onclick event on toggle button  */}
        <Menubar toggleSidebar={toggleSidebar}  sidebarOpen={sidebarOpen}/>
        <ToastContainer position="top-center" />
        {/* // this is the main content of the page  */}
        <div className="container-fluid">
          <Routes>
            <Route path="/add" element={<AddFood />} />
            <Route path="/list" element={<ListFood />} />
            <Route path="/" element={<ListFood />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
