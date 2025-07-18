
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getFoodList, deleteFood } from "../../Services/foodService";
import "./ListFodd.css";

const ListFood = () => {
  const [list, setList] = useState([]);
  const removeFood = async (id) => {
    const success = await  deleteFood(id)
    if(success){
      toast.success("Food item removed successfully");
      fetchList();
    }

  }
  const fetchList = async () => {
    const dat = await   getFoodList()
    setList(dat);
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 px-4 row justify-center">
      <div className="col-11 card">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          {list.map((item, index) => {
            return (
              <tr key={index} className="mb-3">
                <td>
                  <img
                    src={item.imageUrl}
                    height={48}
                    width={48}
                    className=" img-fluid m-2 "
                  ></img>
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>&#8377;{item.price}.00</td>
                <td className="text-danger">
                  <i className="bi bi-x-circle-fill cursor-pointer" onClick={()=>removeFood(item.id)} ></i>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ListFood;
