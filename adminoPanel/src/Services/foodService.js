import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";
export const addFood = async (foodData, image) => {
  const formdata = new FormData();
  formdata.append("food", JSON.stringify(foodData));
  formdata.append("file", image);

  try {
    const response = await axios.post(
      API_URL,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
 
  } catch (error) {
    console.log("error");
    
  }
};


export const getFoodList = async ()=>{
  try {
      const response = await axios.get(API_URL);
       
       return response.data
  } catch (error) {
    return toast.error("error fetching food list ")
  
  }
}

export const deleteFood = async(id)=>{
  try {
  const response  = await axios.delete(`http://localhost:8080/api/foods/${id}`);
 return  response.status == 204 ; 
    
     
   } catch (error) {
   return   toast.error("Failed to remove food item");
     throw error;
   }
}