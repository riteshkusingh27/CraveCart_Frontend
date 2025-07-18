import React from 'react'
import {assets} from '../../assets/assets.js'
import {useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { addFood } from '../../Services/foodService.js'
import { toast } from 'react-toastify';

const AddFood = () => {
      const [addingFood, setAddingFood] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name : "",
        description : "",
        category : "",  
        price : ""
    })
    
    const onChangeHandler = (e) => {
        const name = e.target.name; 
        const value = e.target.value;
        setData(data => ({...data , [name]: value}))
        
    }
      useEffect(()=>{
        let toastId;
        if(addingFood){
            toastId = toast.loading("Adding food...");
        }
        return  ()=>{
            if(toastId){
                toast.dismiss(toastId);
            }
        }
      } , [addingFood])
     
      const OnsubmitHandler = async (e)=>{
        e.preventDefault();
        setAddingFood(true);

        if(!image){
            alert("Please select an image");
            return;
        }
        // api call 

        //create a form data 
        try {
            await addFood(data, image);
            
          
            setAddingFood(false);
            toast.success("Food added successfully");
            setData({
                name: "",
                description: "",
                category: "",
                price: "",
            });
        } catch (error) {
            console.log("error")
           toast.error("Something went wrong");
        }
        finally{
            
        }
       
      
      }

  return (
    <div>

        
<div className="mx-3 ">
  <div className="row mt-3">
    <div className="card col-md-5">
      <div className="card border-0 body mt-3">
        <h2 className="mb-4">Add Food</h2>
        <form onSubmit={OnsubmitHandler}>
            <div className="mb-3">
            <label htmlFor="image" className="form-label">
                {/* temporary url to point towards the selected image URLcreateObjectURL */}
                <img  
                src={!image ?assets.upload2 : URL.createObjectURL(image)} alt=""  height="100" width="100"/>
            </label>
            <input type="file" className="form-control" id="image" required hidden onChange={(e)=>setImage(e.target.files[0])}/>
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">Name</label>
            <input type="text" placeholder="Enter food name" className="form-control" id="name" required name="name" onChange={onChangeHandler} value={data.name}/>
          </div>
          
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Description</label>
            <textarea className="form-control" id="message" placeholder="Enter food description" rows="5" required name="description" onChange={onChangeHandler} value={data.description}></textarea>
          </div>
             <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
      <select name="category" id="category" className="form-control" onChange={onChangeHandler} value={data.category}>
        <option value="">Select Category</option>
        <option value="Pizza">Pizza</option>
        <option value="Burger">Burger</option>
        <option value="Biriyani">Biriyani</option>
        <option value="cake">cake</option>
        <option value="Salad">Salad</option>
        <option value="Icecream">Icecream</option>
      </select>
          </div>
          <div className="mb-3">
            <label for="price" className="form-label">Price</label>
            <input type="number" className="form-control" placeholder="Enter food price" id="price" required name="price" onChange={onChangeHandler} value={data.price}/>
          </div>

          <button type="submit" className="btn btn-primary" disabled={addingFood}>{addingFood ?  "Adding...": "Save"}</button>
        </form>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default AddFood