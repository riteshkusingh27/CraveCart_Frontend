import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
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
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
    }
    loadData();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppcontext = () => {
  return useContext(AppContext);
};
