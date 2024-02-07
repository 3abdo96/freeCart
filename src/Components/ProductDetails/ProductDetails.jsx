import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { InfinitySpin } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    let {id}=useParams()

    const[productDetails,setProductDetails]=useState(null)
    const[isLoading,setIsLoading]=useState(false)

    async function getProductDetails(){
        setIsLoading(true);
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
        setIsLoading(false);

        setProductDetails(data.data)
    }

    useEffect(()=>{
        getProductDetails();
    },[])
  return (
    
    <div className='container d-flex justify-content-center align-items-center vh-100'>

        <Helmet>
                <title>{productDetails?.title.split(" ").slice(0,2).join(" ")}</title>
            </Helmet>
      {!isLoading?   <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-3">
                <div>
                    <img src={productDetails?.imageCover} className='w-100' alt="product" />
                </div>
            </div>
            <div className="col-md-9">
                <h2>{productDetails?.title}</h2>
                <h5 className='main-color'>{productDetails?.category.name}</h5>
                <p>{productDetails?.description}</p>
                <div className="d-flex justify-content-between align-align-items-center">
                <p>{productDetails?.price} EGP</p>
                <p>
          <i class="fa-solid fa-star" style={{color:"#ffc906"}}></i>{productDetails?.ratingsAverage}
          </p>
                </div>
                <button className='btn btn-success w-75 m-auto'>Add To Cart</button>
            </div>
        </div>: <div className='d-flex justify-content-center align-items-center vh-100 '>
      <InfinitySpin
  width='200'
  color="#4fa94d"
/>
</div>}
    </div>
  )
}

export default ProductDetails