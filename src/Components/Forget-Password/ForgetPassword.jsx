import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../Context/authuntication'
import VerifyCode from '../Verify-Code/VerifyCode'

const ForgetPassword = () => {

  let user={
    email:"",
  }

  let errors={};

  const [errorMsg,setErrorMsg]=useState(null);
  const [successMsg,setSuccessMsg]=useState(null);
  const [isLoading,setIsLoading]=useState(false);

  const token=useContext(authContext)

  let navigate=useNavigate();
   async function forgetPassword(values){

    setIsLoading(true);

    try {
      let response= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords",values)

      localStorage.setItem("token",response.data.token);
      token.setToken(response.data.token);

      setSuccessMsg(response.data.message)
      setTimeout(() => {
       navigate("/verify-code")
      }, 2000);
     

    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
   setIsLoading(false);
  }

  // Form Validation
  function forgetPasswordValidation(values){

    setErrorMsg(null)
   
    if(!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      errors.email="Email must be valid";
    }

    

    return errors;
  }
  let formik=useFormik({
    initialValues:user,
    onSubmit:forgetPassword,
    validate:forgetPasswordValidation,
     
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
    <h2>Please enter your email :</h2>

    
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor='email'>Email :</label>
        <input type="email" id='email' name='email' placeholder='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2'/>
        {formik.errors.email && formik.touched.email  ? <div className='alert alert-danger'>{formik.errors.email}</div>:""} 

        

<div className='w-100' style={{textAlign:"right"}}>

        <button type='submit' disabled={formik.isValid === false || formik.dirty===false} className='btn btn-success'>
          {isLoading ? loading:"Verify"}
          </button>
</div>
    </form>
    </div>
    </>
  )
}

export default ForgetPassword