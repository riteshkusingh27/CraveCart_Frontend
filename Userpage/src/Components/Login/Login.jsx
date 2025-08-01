import React from "react";
import {useState} from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import  {useAppcontext} from "../../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  
  const {setToken , user , setUser} = useAppcontext();
  const[data, setData] = useState({
    email: '',
    password: ''
  })
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', data);
      if (response.status === 200) {
        setToken(response.data.token);
        setUser(response.data.nameUser);
        console.log(response)
        console.log("User logged in: " + response.data.name);
        console.log("Token" + response.data.token)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.userName);
        setData({ email: '', password: '' });
        toast.success("Login Successful", { draggable: true });
         // reload and go to home page 
          navigate("/");
      }
    } catch (error) {
      toast.error("Login failed, please check your credentials");
    }
  };

  const Onchangehandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]: value});
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5 fw-bold">
                Sign In
              </h5>
              <form onSubmit={onSubmitHandler} onReset={()=>setData({email: '', password: ''})}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    onChange={Onchangehandler}
                    value={data.email}

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
                    onChange={Onchangehandler}  
                    value={data.password}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-outline-primary btn-login text-uppercase "
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-outline-danger btn-login text-uppercase mt-2 "
                    type="reset"
                  >
                    Reset
                  </button>
                </div>

                <hr className="my-4" />
                <div className="mt-">
                  Don't have an account? <a href="/register">Sign Up</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
