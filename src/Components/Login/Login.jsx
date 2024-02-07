import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../Context/authuntication'

const Login = () => {

  let user={
    email:"",
    password:"",
  }

  let errors={};

  const [errorMsg,setErrorMsg]=useState(null);
  const [successMsg,setSuccessMsg]=useState(null);
  const [isLoading,setIsLoading]=useState(false);

  const token=useContext(authContext)

  let navigate=useNavigate();
   async function loginUser(values){

    setIsLoading(true);

    try {
      let response= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)

      localStorage.setItem("token",response.data.token);
      token.setToken(response.data.token);

      setSuccessMsg(`Welcome ${response.data.user.name}`)
      localStorage.setItem("email",response.data.user.email);
      token.setEmail(response.data.user.email);

      setTimeout(() => {
        navigate("/products")
      }, 2000);

    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
   setIsLoading(false);
  }

  // Form Validation
  function loginValidation(values){

    setErrorMsg(null)
   
    if(!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      errors.email="Email must be valid";
    }

    if(values.password.length<5 || values.password>8){
      errors.password="Password must be between 5 and 8 characters";
    }

    return errors;
  }
  let formik=useFormik({
    initialValues:user,
    onSubmit:loginUser,
    validate:loginValidation,
     
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
    <h2>Login :</h2>

    
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor='email'>Email :</label>
        <input type="email" id='email' name='email' placeholder='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2'/>
        {formik.errors.email && formik.touched.email  ? <div className='alert alert-danger'>{formik.errors.email}</div>:""} 

        <label htmlFor='password'>Password :</label>
        <input type="password" id='password' name='password' placeholder='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2'/>
         {formik.errors.password && formik.touched.password  ? <div className='alert alert-danger'>{formik.errors.password}</div>:""} 

<div className='w-100 d-flex justify-content-between align-items-center'>

<Link to="/forget-password"  className='link-success text-decoration-none'>forget your password ?</Link>
        <button type='submit' disabled={formik.isValid === false || formik.dirty===false} className='btn btn-outline-success'>
          {isLoading ? loading:"Login"}
          </button>
</div>
    </form>
    </div>
    </>
  )
}

export default Login