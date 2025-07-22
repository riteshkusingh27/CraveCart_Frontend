import React from 'react'

const Register = () => {
  window.title = "Register - Food Delivery";
  return (
     <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5 fw-bold">Register</h5>
              <form>
                <div className="form-floating mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Password"
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