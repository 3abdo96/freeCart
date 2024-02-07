import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import styles from "./style.module.css";
import { InfinitySpin } from 'react-loader-spinner';

const Categories = () => {

  function getAllCategories(){
    return axios.get("https://route-ecommerce.onrender.com/api/v1/categories")
  }
  const {data,isLoading}=useQuery('categories', getAllCategories)

  {if(isLoading){
      return <div className='d-flex justify-content-center align-items-center vh-100 '>
      <InfinitySpin
  width='200'
  color="#4fa94d"
/>
</div>
    }}
  return (
   <div className="container">
    <div className="row g-4">
      {data.data.data.map((category,indx)=>{
        return <div className="col-md-4" key={indx}>
        <div className={`text-center border border-1 rounded-2 ${styles.box}`}>
          <img src={category.image} className='w-100' alt="" />
          <div className='p-3'>
          <h3 className='main-color'>{category.name}</h3>
          </div>
        </div>
      </div>
      })}
    </div>
   </div>
  )
}

export default Categories