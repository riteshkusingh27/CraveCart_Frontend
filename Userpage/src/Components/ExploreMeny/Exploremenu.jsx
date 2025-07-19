import React from "react";
import { categories } from "../../assets/assets.js";
import "./Exploremenu.css";
import { useRef } from "react";
const Exploremenu = () => {

  const menuRef  = useRef(null);
  const scrollLeft = ()=>{

    if(menuRef.current){
        menuRef.current.scrollBy({left:-200 , behavior: 'smooth'});
  }
  }
     const scrollRight = ()=>{

    if(menuRef.current){
        menuRef.current.scrollBy({left:200 , behavior: 'smooth'});
  }
     }
  return (
    <div className="exploremenu container position-relative">
      <h1 className="d-flex align-items-center justify-content-between">
        Explore Our Menu
        <div className="d-flex ">
          <i className="bi bi-arrow-left-circle scroll-icon" onClick={scrollLeft}></i>
          <i className="bi bi-arrow-right-circle scroll-icon" onClick={scrollRight}></i>
        </div>
      </h1>
      <p className="">Explore curated list of dishes from top categories</p>
      <div className="d-flex justify-content-between  overflow-auto explore-menu-list-item  " ref={menuRef}>
        {categories.map((item, index) => {
          return (
            <div className="explore-menu-list-item" key={index}>
              <img
                src={item.image}
                className="rounded-circle"
             style={{ width: '128px', height: '128px', objectFit: 'cover' }}
              
              />
              <h5 className="mt-2 fw-bold text-center">{item.category}</h5>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default Exploremenu;
