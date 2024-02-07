import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
// import { useQuery } from 'react-query'
// import { useNavigate } from 'react-router-dom'

const Wishlist = () => {

const [wishlist,setWishlist]=useState([])
const [isLoading,setIsLoading]=useState(false)
  //  const {data,isLoading}= useQuery("wishlist",()=>{
  //   setWishlist(data);
  //       return axios.get("https://route-ecommerce.onrender.com/api/v1/wishlist",{
  //     headers:{
  //       token:localStorage.getItem("token"),
  //     }
  //   })
    
    
  //   })



 async function fetchData(){
  
   try {
        let response = await axios.get("https://route-ecommerce.onrender.com/api/v1/wishlist",{
      headers:{
        token:localStorage.getItem("token"),
      }
    })
    setWishlist(response.data.data);


  } catch (error) {
        console.log(error)
      }

  }
    useEffect(()=>{
          setIsLoading(true)

fetchData();
setIsLoading(false)

   
    },[wishlist])

    




    async function deleteItem(id){
        let response = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,{
      headers:{
        token:localStorage.getItem("token"),
      }
    })

    return response
    }
   

  
    if(isLoading){
      return <div className='d-flex justify-content-center align-items-center vh-100 '>
      <InfinitySpin
  width='200'
  color="#4fa94d"
/>
</div>
    }
    
  return  <div className="container py-5 my-5 p-5 bg-light rounded">
        <h2>My Wishlist</h2>


       {wishlist.map((product,indx)=>{
        
        return <div className="row border-bottom p-2 d-flex align-items-center my-3" key={indx}>
            <div className="col-md-2">
                <img src={product.imageCover} className='w-100' alt={`product${indx}`} />
            </div>
            <div className="col-md-8">
                <h3>{product.title}</h3>
                <p className='main-color'>{product.price} EGP</p>
                <div style={{cursor:"pointer"}} onClick={()=>{deleteItem(product.id)}}>
                <i class="fa-solid fa-trash text-danger"></i> <span className='text-danger'>Remove</span>
                </div>
            </div>
            <div className="col-md-2">
                <button className='btn btn-outline-success'>Add To Cart</button>
            </div>
        </div>
       })}
    </div>
  
}


export default Wishlist