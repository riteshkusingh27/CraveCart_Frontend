import React from 'react'
import {assets} from '../assets/assets.js'
import { useAppcontext } from "../context/AppContext.jsx";

const Checkout = () => {
      const { foodList, increaseQty, decreaseQty, quantities } = useAppcontext();
      
      // Cart items with safe checking
      const cartItems = foodList.filter(food => (quantities[food.id] || 0) > 0);
    
      // Calculations with safe checking
      const subtotal = cartItems.reduce((acc, food) => acc + food.price * (quantities[food.id] || 0), 0);
      const shipping = subtotal === 0 ? 0 : 10;
      const tax = subtotal * 0.05; // Assuming a 5% tax rate
      const total = subtotal + shipping + tax;
    
  return (
    <div className="container mt-1">
         <div className="py-5 text-center">
    <img className="d-block mx-auto mb-1" src={assets.logo} alt="" width="100" height="120"/>
    
    
  </div>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">{cartItems.map((food) => (
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">{food.name}</h6>
                <small className="text-muted">
                    Qty : {quantities[food.id] || 0}
                </small>
              </div>
              <span className="text-muted">&#8377;{food.price * quantities[food.id]}</span>
            </li>

          ))}
            
            <li className="list-group-item d-flex justify-content-between ">
              <div>
                
                <small className="text-muted">Shipping</small>
              </div>
              <span className="text-muted">&#8377;{subtotal===0?0.0 : shipping.toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>

                <small className="text-muted">Tax 5% <br /> <span>GST ,SGST ,VAT</span></small>
              </div>
              <span className="text-muted">&#8377;{tax.toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">-&#8377;5</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>&#8377;{total.toFixed(2)}</strong>
            </li>
          </ul>

          <form className="card p-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Promo code"/>
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">Redeem</button>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary btn-md btn-block d-flex align-items-center" type="submit" disabled={cartItems.length === 0}>
                Continue to checkout
              </button>
            </div>
          </form>
        </div>
        
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" required/>
            
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" required/>
                
              </div>
            </div>

            {/* <div className="mb-3">
              <label htmlFor="username">Name</label>
              <div className="input-group">
                <div className="input-group-prepend">
         
                </div>
                <input type="text" className="form-control" id="username" placeholder="Name" required/>
            
              </div>
            </div> */}

            <div className="mb-3">
              <label htmlFor="email">Phone <span className="text-muted">*</span></label>
              <input type="tel" className="form-control" id="email" placeholder="+91" required/>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address *</label>
              <input type="text" className="form-control" id="address" placeholder="Address" required/>
              
            </div>

            <div className="mb-3">
              <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="LandMark Street"/>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="custom-select d-block w-100" id="country" required>
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
                
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100" id="state" required>
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
              
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" required/>
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <hr className="mb-2"/>
           
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout