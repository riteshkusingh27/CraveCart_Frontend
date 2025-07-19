import React from 'react'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

const FoodDetail = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async (id) =>{
      try {
         setLoading(true);
         const response = await axios.get(`http://localhost:8080/api/foods/${id}`)
         if(response.status === 200){
            setData(response.data);
            console.log(response.data);
         }
         else {
            console.log("error fetching food details");
         }
      } catch (error) {
         console.log("error fetching food details");
      } finally {
         setLoading(false);
      }
    }
    
    useEffect(()=>{
        if(id) {
            fetchData(id); 
        }
    }, [id]) 

 
    if(loading) {
        return <div className="container py-5"><h3>Loading...</h3></div>
    }


    if(!data) {
        return <div className="container py-5"><h3>Food not found</h3></div>
    }

  return (
    <div>
         <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img className="card-img-top mb-5 mb-md-0" 
                             src={data?.imageUrl || "https://dummyimage.com/600x700/dee2e6/6c757d.jpg"} 
                             alt="..." />
                    </div>
                    <div className="col-md-6">
                         <div className="small fs-5 mb-1">
                            Category : <span className="badge text-bg-warning">{data?.category}</span>
                         </div>
                        <h1 className="display-5 fw-bolder">{data?.name}</h1> 
                        <div className="fs-5 mb-2">
                            <span>&#8377;{data?.price}.00</span>
                        </div>
                        <p className="lead">{data?.description}</p>
                        <div className="d-flex">
                            <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default FoodDetail
