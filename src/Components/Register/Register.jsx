import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  let user={
    name:"",
    email:"",
    phone:"",
    password:"",
    rePassword:"",
  }

  let errors={};

  const [errorMsg,setErrorMsg]=useState(null);
  const [successMsg,setSuccessMsg]=useState(null);
  const [isLoading,setIsLoading]=useState(false);


  let navigate=useNavigate();
   async function registerUser(values){

    setIsLoading(true);

    try {
      let response= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
      setSuccessMsg("Account has been created successfully")
      setTimeout(() => {
        navigate("/login")
      }, 2000);

    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
   setIsLoading(false);
  }

  // Form Validation
  function registerValidation(values){

    setErrorMsg(null)
    if(values.name.length<3 || values.name.length>10){
      errors.name="Name must be between 3 and 10 characters";
    }

    if(!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      errors.email="Email must be valid";
    }

    if(!values.phone.match(/^01[0125][0-9]{8}/)){
      errors.phone="Phone must be 11 numbers begin with (01)";
    }

    if(values.password.length<5 || values.password>8){
      errors.password="Password must be between 5 and 8 characters";
    }

    if(values.rePassword!=values.password){
      errors.rePassword="Password and Re-Password must be the same";
    }

    return errors;
  }
  let formik=useFormik({
    initialValues:user,
    onSubmit:registerUser,
    validate:registerValidation,
     
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
    <h2>Register Now :</h2>

   
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor='name'>Name :</label>
        <input type="text" id='name' name='name' placeholder='Name' className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}/>
       {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div>:""} 

        <label htmlFor='email'>Email :</label>
        <input type="email" id='email' name='email' placeholder='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2'/>
        {formik.errors.email && formik.touched.email  ? <div className='alert alert-danger'>{formik.errors.email}</div>:""} 

        <label htmlFor='phone'>Phone :</label>
        <input type="tel" id='phone' name="phone" placeholder='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-2'/>
        {formik.errors.phone && formik.touched.phone  ? <div className='alert alert-danger'>{formik.errors.phone}</div>:""} 

        <label htmlFor='password'>Password :</label>
        <input type="password" id='password' name='password' placeholder='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2'/>
         {formik.errors.password && formik.touched.password  ? <div className='alert alert-danger'>{formik.errors.password}</div>:""} 

        <label htmlFor='rePassword'>Re-Password :</label>
        <input type="password" id='rePassword' name='rePassword' placeholder='Re-Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mb-2'/>
        {formik.errors.rePassword && formik.touched.rePassword  ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:""} 

<div className='w-100' style={{textAlign:"right"}}>

        <button type='submit' disabled={formik.isValid === false || formik.dirty===false} className='btn btn-outline-success'>
          {isLoading ? loading:"Register"}
          </button>
</div>
    </form>
    </div>
    </>
  )
}

export default Register