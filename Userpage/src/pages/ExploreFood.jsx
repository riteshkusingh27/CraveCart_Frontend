import React from 'react'
import Food from '../Components/Food/Food.jsx'


const ExploreFood = () => {
  return (
    <div className="container mt-4">
       
       <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <form>
            <div className="input-group">
              <select className="form-select" style={{ 'maxWidth': '170px' }}>
                <option value="Biriyani">Biriyani</option>  
                <option value="Burger">Burger</option>
                <option value="Cakes">Cakes</option>
                <option value="Pizza">Pizza</option>
                <option value="Ice cream">Ice cream</option>
              </select>
              <input type="text" className="form-control" placeholder="Search for food..." />
              <button className="btn btn-primary" type="submit">
              <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
       </div>
       
        <Food />
       


    </div>
  )
}

export default ExploreFood