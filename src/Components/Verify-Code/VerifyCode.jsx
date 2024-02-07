import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../Context/authuntication'

const VerifyCode = () => {

  let user={
    resetCode:"",
  }


  const [errorMsg,setErrorMsg]=useState(null);
  const [successMsg,setSuccessMsg]=useState(null);
  const [isLoading,setIsLoading]=useState(false);

  const token=useContext(authContext)

  let navigate=useNavigate();
   async function postVerificationCode(values){

    setIsLoading(true);

    try {
      let response= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode",values)

      localStorage.setItem("token",response.data.token);
      token.setToken(response.data.token);

      setSuccessMsg("Code Verified Successfully")
      
      setTimeout(() => {
        navigate("/reset-password")
      }, 2000);

    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
   setIsLoading(false);
  }


  let formik=useFormik({
    initialValues:user,
    onSubmit:postVerificationCode,
     
  })

  let loading=<Bars
  height="30"
  width="60"
  color="#fff"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  return (
    <>

<div className="w-75 m-auto py-5">
  {errorMsg? <div className='alert alert-danger'>{errorMsg}</div>:""}
    {successMsg? <div className='alert alert-success'>{successMsg}</div>:""}
    <h2>Please enter your verification code :</h2>

    
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor='vCode'>Verification Code :</label>
        <input type="text" id='vCode' name='resetCode' placeholder='Code'  onChange={formik.handleChange} value={formik.values.resetCode} className='form-control mb-2'/>

        

<div className='w-100' style={{textAlign:"right"}}>

        <button type='submit' disabled={formik.isValid === false || formik.dirty===false} className='btn btn-outline-success'>
          {isLoading ? loading:"Verify"}
          </button>
</div>
    </form>
    </div>
    </>
  )
}

export default VerifyCode