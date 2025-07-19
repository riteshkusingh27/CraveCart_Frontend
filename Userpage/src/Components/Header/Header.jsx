import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import backgroundImage from '../../assets/bg2.png'

const Header = () => {
  return (
     <div className="container p-5 mb-3 rounded-3 mt-1 header-container" >
      <div className="container py-5">
        <h1 className='display-5 fw-bold main-head'>Order your favorite food here</h1>
        <p className='col-md-8 fs-4'>Discover the best food and drinks in Bengaluru</p>
        <Link to="/explorefood" className="btn btn-primary btn-md">Explore Food</Link>
      </div>
    </div>
  )
}

export default Header