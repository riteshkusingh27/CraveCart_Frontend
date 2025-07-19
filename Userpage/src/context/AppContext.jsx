import {createContext, useContext, useState ,  useEffect} from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({children})=>{
    const [foodList , setFoodList] = useState([]);
    const fetchFoodList = async()=>{
        const response = await axios.get('http://localhost:8080/api/foods');
        setFoodList(response.data);
        console.log(response.data);
    }

    const value = {
        foodList,
        setFoodList,
        axios
        
    }
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
        }
        loadData();
    },[])


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppcontext = ()=>{
    return useContext(AppContext);
}