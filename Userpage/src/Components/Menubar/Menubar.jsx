import React from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { useAppcontext } from "../../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";


const Menubar = () => {
  const [active, setActive] = React.useState("Home");
  const navigate = useNavigate();
  const { quantities, token, setToken , setQuantities , user , setUser } = useAppcontext();

  const cart = Object.values(quantities).filter((qty) => qty > 0).length; // Count items with quantity > 0
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to="/">
            <img
              src={assets.logo}
              alt=""
              className="logo mx-3 my-2"
              height={55}
              width={52}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    active === "Home" ? "nav-link fw-bold active" : "nav-link"
                  }
                  to="/"
                  onClick={() => setActive("Home")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    active === "Explore"
                      ? "nav-link fw-bold active"
                      : "nav-link"
                  }
                  to="/explorefood"
                  onClick={() => setActive("Explore")}
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    active === "Contact"
                      ? "nav-link fw-bold active"
                      : "nav-link"
                  }
                  to="/contactus"
                  onClick={() => setActive("Contact")}
                >
                  Contact us
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center menubar-right">
              <Link to="/cart">
                <div className="position-relative mx-2">
                  <img
                    src={assets.carticon}
                    alt=""
                    height={30}
                    width={30}
                    className="position-absolute"
                  />
                  <span className="position-relative top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart}
                  </span>
                </div>
              </Link>
              {!token ? (
                <>
                  <div>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              ) : (<>
              <div className="dropdown text-end ">
                  
                  <a
                    href=""
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                    src={assets.avatar}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
                  </a>
                  <ul className="dropdown-menu text-small">
                    <li>
                      <a className="dropdown-item" href="#">
                        Orders
                      </a>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                    
                        onClick={() => {
                          setToken("");
                          localStorage.removeItem("token");
                          setQuantities({});
                          setUser("")
                          window.location.reload();
                         
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                  
                </div>
                <div className=" d-flex align-items-center justify-content-center mt-3"> 
                  <p className="text-bold text-small">{user}</p>
                </div>
              </>
                
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menubar;
