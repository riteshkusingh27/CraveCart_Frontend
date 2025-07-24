import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
      // token context
  const [token, setToken] = useState("");
  const [logged,setLogged] = useState(false);

  const increaseQty = (foodid) => {
    setQuantities((prev) => ({ ...prev, [foodid]: (prev[foodid] || 0) + 1 }));
  };

  const decreaseQty = (foodid) => {
    setQuantities((prev) => ({
      ...prev,
      [foodid]: prev[foodid] > 0 ? prev[foodid] - 1 : 0,
    }));
  };
  const fetchFoodList = async () => {
    const response = await axios.get("http://localhost:8080/api/foods");
    setFoodList(response.data);
    console.log(response.data);
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
    logged,
    setLogged
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    } 
    loadData();

  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppcontext = () => {
  return useContext(AppContext);
};
