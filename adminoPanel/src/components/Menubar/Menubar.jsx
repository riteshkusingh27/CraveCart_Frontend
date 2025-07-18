import React from 'react'

const Menubar = ({toggleSidebar , sidebarOpen}) => {
  return (
    <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container-fluid">
            <button  onClick={toggleSidebar}
             className="btn btn-primary" id="sidebarToggle">
            {sidebarOpen?<i class="bi bi-list"></i>: <i class="bi bi-list"></i>}
            </button>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Menubar