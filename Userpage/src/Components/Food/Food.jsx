import React from 'react'
import { useAppcontext } from '../../context/AppContext.jsx'
import { Link } from 'react-router-dom'

const Food = () => {
  const { foodList } = useAppcontext();

  return (
    <div className="container">
      <div className="row">
        {foodList.length > 0 ? (
          foodList.map((food, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
              {/* Add h-100 to make cards in a row equal height */}
              <div className="card h-100 d-flex flex-column" style={{ maxWidth: "320px" }}>
                <img
                  src={food.imageUrl}
                  className="card-img-top"
                  alt={food.name}
                  style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                />
                {/* Add flex-grow-1 to make the body expand and push the footer down */}
                <div className="card-body flex-grow-1">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text">{food.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0">₹{food.price}</span>
                    <div>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-half text-warning"></i>
                      <small className="text-muted">(4.5)</small>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light">
                  <Link to={`/food/${food.id}`} className="btn btn-primary btn-sm">View</Link>
                  <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-heart"></i></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <h1>No food found</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Food;