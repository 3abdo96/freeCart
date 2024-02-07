import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Checkout = () => {

  const {id}=useParams();



  async function checkout(shippingAddress){
     await fetchCheckout(shippingAddress)
  }
  async function fetchCheckout(shippingAddress){
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{
      shippingAddress
    },{
      headers:{
        token:localStorage.getItem("token")
      }
    })


    if(data.status==="success"){
      window.location.href=data.session.url;

      
    }
  }
  const checkoutDetails=useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:""
    },
    onSubmit:checkout
  })
 
  return (
    <div className='w-75 mx-auto py-5 '>
    <form onSubmit={checkoutDetails.handleSubmit}>
      <label htmlFor='details'>Details:</label>
      <input type="text" className='form-control' id="details" name="details" onChange={checkoutDetails.handleChange} value={checkoutDetails.values.details}/>

      <label htmlFor='phone'>Phone:</label>
      <input type="tel" className='form-control' id="phone" name="phone" onChange={checkoutDetails.handleChange} value={checkoutDetails.values.phone}/>

      <label htmlFor='city'>City:</label>
      <input type="text" className='form-control' id="city" name="city" onChange={checkoutDetails.handleChange} value={checkoutDetails.values.city}/>

      <button className='btn btn-success my-2'>Order</button>
    </form>
    </div>
  )
}

export default Checkout