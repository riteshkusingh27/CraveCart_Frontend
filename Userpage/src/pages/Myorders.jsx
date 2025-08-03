import React from 'react'
import { useAppcontext } from '../context/AppContext'
import { useEffect } from 'react'

const Myorders = () => {
  const { token, axios } = useAppcontext();
  const [data, setData] = React.useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container">
        <h2 className="text-center mt-3">Recent Orders</h2>
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive table-striped table-hover">
            <thead>
              <tr>
                <th>Image</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
             
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr key={order.id || index}>
                  <td>
                    <img 
                      src={order.orderItems[0]?.imageUrl || "/placeholder.jpg"} 
                      alt="Order" 
                      height={48} 
                      width={48} 
                    />
                  </td>
                  <td>
                    {order.orderItems
                      .map(item => `${item.name} x${item.quantity}`)
                      .join(", ")
                    }
                  </td>
                  <td>₹{order.amount}</td>
                  <td>
                    <span className={`badge ${order.orderStatus === 'Delivered' ? 'bg-success px-2' : 'bg-warning px-2'}`}>
                      {order.orderStatus}
                    </span>
                    
                         <button className=" ms-2 btn btn-sm btn-warning" onClick={fetchOrders}>
                        <i className="bi bi-arrow-clockwise"></i>
                    </button>
                   
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Myorders