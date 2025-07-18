import React from 'react'
import './Menubar.css' 
import {assets} from '../../assets/assets.js'

const Menubar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <img src={assets.logo} alt=""  className="logo mx-3 my-2" height={55} width={52}/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link  mx-2"  href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link  mx-2"  href="#">Explore</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact us </a>
        </li>
       
      </ul>
        <div className="menubar-right">
            <div className="position-relative mx-2">
                <img src={assets.carticon} alt="" height={30} width={30} className="position-absolute" />
                <span className="position-relative top-0 start-100 translate-middle badge rounded-pill bg-danger">5</span>
            </div>
            <div>
                <button className="btn btn-outline-primary">Login</button>
            </div>
            <div>
                <button className="btn btn-outline-success">Sign Up</button>
            </div>
        </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Menubar