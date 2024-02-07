import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import styles from "./style.module.css";
import { InfinitySpin } from 'react-loader-spinner';
const Brands = () => {

  function getAllBrands(){
    return axios.get("https://route-ecommerce.onrender.com/api/v1/brands")
  }
  const {data,isLoading}=useQuery('brands',getAllBrands)


    {if(isLoading){
      return <div className='d-flex justify-content-center align-items-center vh-100 '>
      <InfinitySpin
  width='200'
  color="#4fa94d"
/>
</div>
    }}
  return (
    <div className="container py-5">

      <h1 className='main-color text-center mb-5'>All Brands</h1>
      <div className="row g-4">
        {data.data.data.map((brand,indx)=>{
          return <div className="col-md-3" key={indx}>
          <div className={`${styles.box} border border-1 rounded-2 text-center`}>
            <img src={brand.image} className='w-100 img-img-fluid' alt="" />
            <div className="p-3">
            <p>{brand.name}</p>
            </div>
          </div>
        </div>
        })}
      </div>
    </div>
  )
}

export default Brands