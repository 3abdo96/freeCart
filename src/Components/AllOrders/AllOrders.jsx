import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
 
const AllOrders = () => {

    const {id} =jwt_decode(localStorage.getItem("token"))

    const [cartItems,setCartItems]=useState([])

    async function getUserOrders(){
        let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${id}`)

        setCartItems(data);
        console.log(data)


    }

 
 

    useEffect(() => {
      getUserOrders()
    
     
    }, [])
    
  return (
    <div className="container py-5 ">
        <div className="row gy-4">
{cartItems.map((item,index)=>{

    return   <div className="col-md-4" key={index}>
                <div className='card shadow bg-opacity-50'>
                    


                    <div class="card-body">
    <h5 className='my-3'>Order <span className='main-color'>#{item.id}</span></h5>
    <h6 style={{"font-size": "13px"}} className='border-bottom pb-4'>Order Date: {item.createdAt.slice(0,10)}</h6>


{item.cartItems.map((cartItem,indx)=>{

  return <div className="row my-2 " key={indx}>
  <div className="col-md-3">
    <img src={cartItem.product.imageCover} alt="" className='w-100'/>
  </div>
  <div className="col-md-9 d-flex flex-column justify-content-center">
    <h5 style={{"font-size":"14px"}}>{cartItem.product.title.split(" ").slice(0,5).join(" ")}</h5>
    <span style={{"font-size": "13px"}}>{cartItem.count} x {cartItem.price} EGP</span>
  </div>
</div>
})}


<p className='main-color fw-bold '>Total: <span>{item.totalOrderPrice} EGP</span></p>
  </div>
                </div>


            </div>
})}
          
        </div>
    </div>
  )
}

export default AllOrders