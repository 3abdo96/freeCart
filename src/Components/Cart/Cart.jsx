import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { InfinitySpin } from 'react-loader-spinner';
import { cartContext } from '../Context/cartCount';
import { Link } from 'react-router-dom';

const Cart = () => {


  const [totalCartPrice,setTotalCartPrice]=useState(0);
  const [numOfCartItems,setNumOfCartItems]=useState(0);
  const [cartProducts,setCartProducts]=useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const [count,setCount]=useState(0);
  const [cartID,setCartID]=useState("");
  const [cartOwner,setCartOwner]=useState("");
const {setCartCount}=useContext(cartContext)

  async function getCartItems(){
    setIsLoading(true);
    let {data}=await axios.get("https://route-ecommerce.onrender.com/api/v1/cart",{
      headers:{
        token:localStorage.getItem("token")
      }
    })

    if(data.status==="success"){
    setIsLoading(false);
    setCartProducts(data.data.products)
    setNumOfCartItems(data.numOfCartItems)
    setTotalCartPrice(data.data.totalCartPrice)
    setCartCount(data.numOfCartItems)
    setCartID(data.data._id)
    setCartOwner(data.data.cartOwner)
    }

   

  }

  
  async function deleteCartItem(productId){
       let {data}=await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{
      headers:{
        token:localStorage.getItem("token")
      }
    })
      setCartProducts(data.data.products)
      setNumOfCartItems(data.numOfCartItems)
    setTotalCartPrice(data.data.totalCartPrice)
    setCartCount(data.numOfCartItems)
  }


  async function updateItemCount(productId,count){
    let {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{count},{headers:{token:localStorage.getItem("token")}});

    if(count===0){
      deleteCartItem(productId);
      setCount(0);
    }
    

    else{
    setCartProducts(data.data.products)
    setNumOfCartItems(data.data.numOfCartItems)
    setTotalCartPrice(data.data.totalCartPrice)
    }


  }

  async function clearCart(){
    let {data}= await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,{headers:{token:localStorage.getItem("token")}});

    if(data.message==="success"){
      toast.success("Cart Cleared Successfully");

      setCartProducts([])
      setNumOfCartItems(0)
    setTotalCartPrice(0)
  }
  
}
  useEffect(()=>{
    getCartItems()
  },[])


       if(isLoading){
      return <div className='d-flex justify-content-center align-items-center vh-100 '>
      <InfinitySpin 
  width='200'
  color="#4fa94d"
/>
</div>
    }
  return (
    <div className="container my-5">

      <button className='btn btn-outline-info' onClick={clearCart}>Clear Cart</button>
     {cartProducts?.map((product,indx)=>{
      return  <div className="row d-flex align-items-center shadow p-4 my-4" key={indx}>
        <div className="col-md-2">
          <div>
            <img src={product.product.imageCover}  alt="" className='w-100' />
          </div>
        </div>
        <div className="col-md-10">
          <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h3>{product.product.title}</h3>
            <h5 className='main-color'>{product.product.category.name}</h5>
            <p>{product.price} EGP</p>
            <p>  <i class="fa-solid fa-star" style={{color:"#ffc906"}}></i> {product.product.ratingsAverage}</p>
          </div>
          <div>
            <button className='btn btn-outline-danger mb-3 w-100' onClick={()=>{deleteCartItem(product.product.id)}}>Remove</button>
            <div className='d-flex align-items-center'>
              <button className='btn btn-success' onClick={()=>{updateItemCount(product.product.id,product.coun-1)}}>-</button>
              <span className='mx-2'>{count? 0:product.count}</span>
              <button className='btn btn-success' onClick={()=>{updateItemCount(product.product.id,product.count+1)}}>+</button>
            </div>
          </div>
          </div>
        </div>
      </div>
     })}

     <div className='d-flex justify-content-between'>
      <Link className='btn bg-info text-white fw-bold' to={`/checkout/${cartID}`}>Checkout</Link>
      <h4 className='main-color'>Total Price: {totalCartPrice} EGP</h4>
     </div>
    </div>
  )
}

export default Cart