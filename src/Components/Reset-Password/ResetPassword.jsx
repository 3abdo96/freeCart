import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../Context/authuntication'

const ResetPassword = () => {
    const {setToken}=useContext(authContext)

  let user={
    email:"",
    newPassword:"",
  }

  let errors={};

  const [errorMsg,setErrorMsg]=useState(null);
  const [successMsg,setSuccessMsg]=useState(null);
  const [isLoading,setIsLoading]=useState(false);


  let navigate=useNavigate();
   async function resetPassword(values){

    setIsLoading(true);

    try {
      let response= await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
      setSuccessMsg(`Reset Password Successfully`)

      localStorage.setItem("token",response.data.token);
    setToken(response.data.token);

      setTimeout(() => {
        navigate("/login")
      }, 2000);

    } catch (error) {
      setErrorMsg(error.response);
    }
   setIsLoading(false);
  }

  // Form Validation
  function resetPassValidation(values){

    setErrorMsg(null)
   
    if(!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      errors.email="Email must be valid";
    }

    if(values.newPassword.length<5 || values.newPassword>8){
      errors.newPassword="Password must be between 5 and 8 characters";
    }

    return errors;
  }
  let formik=useFormik({
    initialValues:user,
    onSubmit:resetPassword,
    validate:resetPassValidation,
     
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
    <h2>Reset Password :</h2>

    
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor='email'>Email :</label>
        <input type="email" id='email' name='email' placeholder='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2'/>
        {formik.errors.email && formik.touched.email  ? <div className='alert alert-danger'>{formik.errors.email}</div>:""} 

        <label htmlFor='newPassword'>New Password :</label>
        <input type="password" id='newPassword' name='newPassword' placeholder='New Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} className='form-control mb-2'/>
         {formik.errors.newPassword && formik.touched.newPassword  ? <div className='alert alert-danger'>{formik.errors.newPassword}</div>:""} 

<div className='w-100' style={{textAlign:"right"}}>

        <button type='submit' disabled={formik.isValid === false || formik.dirty===false} className='btn btn-outline-success'>
          {isLoading ? loading:"Reset Password"}
          </button>
</div>
    </form>
    </div>
    </>
  )
}

export default ResetPassword