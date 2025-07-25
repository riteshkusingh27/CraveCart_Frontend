import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});

  console.log(quantities);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  console.log("User: " + user);


  const increaseQty = async (foodid) => {
    setQuantities((prev) => ({ ...prev, [foodid]: (prev[foodid] || 0) + 1 }));

    await axios.post(
      "http://localhost:8080/api/cart",
      { foodid },
      {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
  };
   
  const decreaseQty = (foodid) => {
    setQuantities((prev) => ({
      ...prev,
      [foodid]: prev[foodid] > 0 ? prev[foodid] - 1 : 0,
    }));
    axios.post(
      "http://localhost:8080/api/cart/remove",
      { foodid },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };
  const fetchFoodList = async () => {
    const response = await axios.get("http://localhost:8080/api/foods");
    setFoodList(response.data);
    console.log(response.data);
  };

  const LoadCartData = async (token) => {
    const response = await axios.get("http://localhost:8080/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setQuantities(response.data.items);
  };

  const value = {
    foodList,
    setFoodList,
    axios,
    increaseQty,
    decreaseQty,
    quantities,
    token,
    setToken,
    user,
    setUser,
    setQuantities,
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
     
      }
    }
     loadData();
  
  }, []);
  useEffect(()=>{
    if(token){
      LoadCartData(token);
         setUser(localStorage.getItem("username"));
    
    }
  },[token])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppcontext = () => {
  return useContext(AppContext);
};
