import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets.js";
import { useAppcontext } from "../context/AppContext.jsx";
import {useEffect} from "react";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { foodList, increaseQty, decreaseQty, quantities ,axios , token, setQuantities} = useAppcontext();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address2 : "",
    phone: "",
    address: "",
    state: "",
    zip: "",
  });
  const navigate = useNavigate();
  
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
    
  const deleteOrder = async (orderid) => {
           try {
           await   axios.delete(`http://localhost:8080/api/orders`+orderid, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
           } catch (error) {
            toast.error("Something went wrong ");
            
           }
     }
  const clearCart = async () => {
           try {
           await   axios.delete("http://localhost:8080/api/cart", {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              setQuantities({});
           } catch (error) {
            toast.error("Something went wrong while clearing the cart");
            
           }
     }

  const initiateRazorpayPayment = (orderData)=>{
    const options = {
       key : import.meta.env.VITE_RAZORPAY_KEY,
       amount : orderData.amount  ,
        currency : "INR",
        name : "Crave Cart",
        description : "Food Order Payment",
        order_id : orderData.razorpayId,
        // handeler function 
        handler : async function (response) {
             
             console.log(response)
            await verifyPayment(response);
          
        },
        modal : {
            ondismiss : async function (){
              await deleteOrder(orderData.id);
            }
        }
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open()

  }
  const verifyPayment = async (response) => {
 
            const data = response ; 
      try {
        const res = await axios.post("http://localhost:8080/api/orders/verify", data , {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200 ) {
          toast.success("Payment Successfull");
          // clear the cart
          await clearCart();
          // redirect to myorders page
          navigate('/myorders');
        }
        else{
          toast.error("Payment elsdjf Failed");
          navigate('/checkout');
        }
      } catch (error) {
        toast.error("Payment Verification Failed");
      }
  }
  const onSubmitHandler = async  (e) => {
       e.preventDefault();
    const orderData = {
      userAddress : `${data.firstName} ${data.lastName}, ${data.address}, ${data.address2}, ${data.state}, ${data.zip}`,
      phoneNumber :   data.phone,
      orderItems : cartItems.map(item => ({
        foodId : item.id , 
        quantity : quantities[item.id],
        price : item.price*quantities[item.id],
        Category : item.category,
        imageUrl : item.imageUrl,
        name : item.name,
        description : item.description,

      })),
      amount : total.toFixed(2),
      orderStatus : "Pending",

    }
    try {
       const response = await axios.post("http://localhost:8080/api/orders/create", orderData ,{
          headers : {'Authorization' : `Bearer ${token}`}
        })
        // if the response is successfll and the response have razorpayId 
        if(response.status === 201 && response.data.razorpayId){
          // intitaze payment for checout 
        initiateRazorpayPayment(response.data)}
        else{
          toast.error("Order not Placed")
        }

    } catch (error) {
      toast.error("Order not Placed")
    }
  };
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");

  const getUserLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setError("");
        },
        (error) => {
          setError("Error retrieving location: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  console.log("User Location:", userLocation);
  console.log("Error:", error);
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
    <div className="container mt-1">
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-1"
          src={assets.logo}
          alt=""
          width="100"
          height="120"
        />
      </div>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            {cartItems.map((food) => (
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">{food.name}</h6>
                  <small className="text-muted">
                    Qty : {quantities[food.id] || 0}
                  </small>
                </div>
                <span className="text-muted">
                  &#8377;{food.price * quantities[food.id]}
                </span>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between ">
              <div>
                <small className="text-muted">Shipping</small>
              </div>
              <span className="text-muted">
                &#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <small className="text-muted">
                  Tax 5% <br /> <span>GST ,SGST ,VAT</span>
                </small>
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

          <form className="card p-2" >
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </div>
          
          </form>
        </div>

        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" onSubmit={onSubmitHandler}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  required
                  onChange={onChangeHandler}
                  name="firstName"
                  value={data.firstName}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  required
                  value={data.lastName}
                  onChange={onChangeHandler}
                  name="lastName"
                />
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
              <label htmlFor="email">
                Phone <span className="text-muted text-danger">*</span>
              </label>
              <input
                type="tel"
                className="form-control"
                id="email"
            
                placeholder="+91"
                required
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
                required
                name="address"
                onChange={onChangeHandler}
                value={data.address}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address2">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="LandMark Street"
                name="address2"
                onChange={onChangeHandler}
                value={data.address2 || ""}
              />
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  required
                  name="state"
                  onChange={onChangeHandler}
                  value={data.state}
                >
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input
                  type="number"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required
                  name="zip"
                  onChange={onChangeHandler}
                  value={data.zip}
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr className="mb-2" />
              <div className="mt-4">
              <button
                className="btn btn-primary btn-md btn-block d-flex align-items-center"
                type="submit"
                disabled={cartItems.length === 0}
              >
                Continue to checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
