import React from 'react'
import Food from '../Components/Food/Food.jsx'
import {useState} from 'react'


const ExploreFood = () => {
  const [category, setCategory] =useState('All');
  const [searchText, setSearchText] = useState(''); 
  return (
    <div className="container mt-4">
       
       <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <form onSubmit={(e)=> e.preventDefault()}>
            <div className="input-group">
              <select className="form-select" style={{ 'maxWidth': '170px' }} onChange={(e) => setCategory(e.target.value)} >
                <option value="All">All</option>
                <option value="Biriyani">Biriyani</option>  
                <option value="Burger">Burger</option>
                <option value="Cakes">cake</option>
                <option value="Pizza">Pizza</option>
                <option value="Ice cream">Ice cream</option>
              </select>
              <input type="text" className="form-control" onChange={(e) => setSearchText(e.target.value)} value={searchText}
              placeholder="Search for food..." />
              <button className="btn btn-primary" type="submit">
              <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
       </div>
                        {/* display food items based on select and search text */}
        <Food category={category} searchText={searchText} />

    </div>
  )
}

export default ExploreFood