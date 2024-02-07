import axios from 'axios'
import React, {  useContext, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cartContext } from '../Context/cartCount';


const Products = () => {

  const navigate=useNavigate()

  const {setCartCount}=useContext(cartContext)

  const [added,setAdded]=useState(false)
  function getAllProducts(){
return axios.get("https://route-ecommerce.onrender.com/api/v1/products");
  }
  const {data,isLoading}=useQuery('products', getAllProducts,{
    refetchInterval:2000,
    refetchOnMount:true
  })

  function showDetails(id){
    navigate(`/product-details/${id}`)
}

async function addProductToCart(productId){
  let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},{
    headers:{
      token:localStorage.getItem("token"),
    }
  })

  if(data.status==="success"){
    toast.success(data.message,{
      icon: <i class="fa-solid fa-star" style={{color:"#ffc906"}}></i>,
    })

setCartCount(data.numOfCartItems)


}

}
  async function getProductID(id,e){
    e.target.style.cssText="color:red"
localStorage.setItem('productID',id)

    try {
      
       let response = await axios.post("https://route-ecommerce.onrender.com/api/v1/wishlist",{
      productId:id,
    },{
      headers:{
        token:localStorage.getItem("token"),
      }
    })

toast.success(response.data.message, {
  style: {
    border: '1px solid green',
    padding: '16px',
    color: 'green',
  },
  iconTheme: {
    primary: 'green',
    secondary: '#FFFAEE',
  },
}) ;
   setAdded(true)

   

   
    } 
    
    catch (error) {
      setAdded(false);
      toast.success("Product not added successfully", {
  style: {
    border: '1px solid green',
    padding: '16px',
    color: 'green',
  },
  iconTheme: {
    primary: 'green',
    secondary: '#FFFAEE',
  },
}) ;
    }

   
    
  }

      if(isLoading){
      return <div className='d-flex justify-content-center align-items-center vh-100 '>
      <InfinitySpin 
  width='200'
  color="#4fa94d"
/>
</div>
    }
  return (

  
    
   <>

 {added?<Toaster position='top-right'/>:""}
   <div className="container">
     <Helmet>
                <title>Products</title>
            </Helmet>
    <div className="row g-3">
     {data?.data.data.map((product,indx) =>{
      return  <div className="col-md-2" key={indx}>
        <div onClick={()=>{showDetails(product.id)}}> 
          <img src={product.imageCover} className='w-100' alt="" />

          <div className="d-flex justify-content-between align-items-center">

          <h6 className='main-color'>{product.category.name}</h6>
          <i class="fa-solid fa-heart" style={{cursor:"pointer"}} onClick={(e)=>{getProductID(product.id,e)}}></i>
          </div>
          <h6>{product.title.split(" ").slice(0,2).join(" ")}</h6>

        <div className="d-flex justify-content-between align-align-items-center ">
          <p>{product.price} <span>EGP</span></p>

          <p>
          <i class="fa-solid fa-star" style={{color:"#ffc906"}}></i>{product.ratingsAverage}
          </p>
          </div>
        </div>
        <button className='btn btn-success w-100' onClick={()=>{addProductToCart(product.id)}}>Add To Cart</button>
      </div>
     })}
    </div>
   </div>
   </>
  )
}

export default Products