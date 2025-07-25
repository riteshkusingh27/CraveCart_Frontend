import React from "react";
import "./Cart.css"; // Assuming you have a Cart.css for styling
import { useAppcontext } from "../context/AppContext.jsx"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
const Cart = () => {
  const { foodList, increaseQty, decreaseQty, quantities } = useAppcontext();

  // Cart items with safe checking
  const cartItems = foodList.filter((food) => (quantities[food.id] || 0) > 0);
  // Calculations with safe checking
  const subtotal = cartItems.reduce(
    (acc, food) => acc + food.price * (quantities[food.id] || 0),
    0
  );
  const shipping = subtotal === 0 ? 0 : 10;
  const tax = subtotal * 0.05; // Assuming a 5% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <h3>Your Shopping Cart</h3>

          {cartItems.length === 0 ? (
            <p>Your Cart is empty</p>
          ) : (
            <div>
              {cartItems.map((food) => (
                <div
                  key={food.id}
                  className="cart-item d-flex justify-content-between align-items-center mb-3 p-3 border rounded"
                >
                  <div className="d-flex">
                    <img
                      src={food.imageUrl || "https://via.placeholder.com/100"}
                      alt={food.name}
                      className="product-img me-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h5>{food.name}</h5>
                      <p className="text-muted">{food.description}</p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm me-2"
                          onClick={() => decreaseQty(food.id)}
                        >
                          -
                        </button>
                        <span className="mx-2">{quantities[food.id] || 0}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm ms-2"
                          onClick={() => increaseQty(food.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between align-items-end">
                    <span className="fw-bold">
                      ₹{(food.price * (quantities[food.id] || 0)).toFixed(2)}
                    </span>
                    <button
                      className="btn btn-sm btn-danger mt-2"
                      onClick={() => {
                        // Remove item completely by setting quantity to 0
                        for (let i = 0; i < (quantities[food.id] || 0); i++) {
                          decreaseQty(food.id);
                        }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="cart-summary p-4 border rounded">
            <h4>Cart Summary</h4>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Shipping:</span>
                <span>₹{shipping.toFixed(2)}</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Tax (5%):</span>
                <span>₹{tax.toFixed(2)}</span>
              </li>
              <hr />
              <li className="d-flex justify-content-between">
                <span className="fw-bold">Total:</span>
                <span className="fw-bold">₹{total.toFixed(2)}</span>
              </li>
            </ul>
            <Link to="/checkout" className="text-decoration-none">
              <button className="btn btn-primary w-100 mt-3">
                Proceed to Checkout
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
