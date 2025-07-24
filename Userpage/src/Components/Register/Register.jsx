import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  window.title = "Register - Food Delivery";
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const OnChangeHandler = (e)=>{
    const name = e.target.name ;
    const value = e.target.value;
    //  using the spread operator 
    setData({...data, [name]: value});
  }
  const onSubmitHandler = async (e)=>{
             e.preventDefault();
        try {
       const response =      await axios.post('http://localhost:8080/api/register', data )
            if(response.status === 201){
              setData({name: '', email: '', password: ''});
   
              toast.success("Registration Completed , Please Log in" ,{
                draggable : true
              })
              navigate("/login");
            }
        } catch (error) {
          toast.error("Unable to Register ")
        }

  }
  return (
     <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5 fw-bold">Register</h5>
              <form onSubmit={onSubmitHandler} onReset={()=>setData({name: '', email: '', password: ''})}>
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="name@example.com"
                    name="name"
                    onChange={OnChangeHandler}
                    value={data.name}
                    required
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com"
                    name="email"
                    onChange={OnChangeHandler}
                    value={data.email}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Password"
                    name="password"
                    onChange={OnChangeHandler}
                    value={data.password}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                
                
                <div className="d-grid">
                  <button className="btn btn-outline-primary btn-login text-uppercase " type="submit">
                    Register
                  </button>
                </div>
                
                <div className="d-grid">
                  <button className="btn btn-outline-danger btn-login text-uppercase mt-2 " type="reset">
                    Reset
                  </button>
                </div>
                
                <hr className="my-4"/>
                <div className="mt-">
                    Already have an account? <a href="/login">Log in</a>
                </div>
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register