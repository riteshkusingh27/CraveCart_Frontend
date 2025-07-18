import React from 'react'
import { Link } from "react-router-dom";
import {assets} from "../../assets/assets.js";

const Sidebar = ({sidebarOpen}) => {
  return (
    <div>
          <div className={`border-end bg-white ${sidebarOpen? "": "d-none"}`} id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light ">
            <img src={assets.food_del} alt=""  height="80" width="130" />
        </div>

        <div className="list-group list-group-flush">
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="/add"
          > 
           <i class="bi bi-plus-circle"></i>  Add Food 
          </Link>
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="/list"
          >
           <i class="bi bi-list"></i>  List Food 
          </Link>
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="/orders"
          >
           <i class="bi bi-cart"></i> Orders
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Sidebar