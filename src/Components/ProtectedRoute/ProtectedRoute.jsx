import React, { useContext } from 'react'
import { authContext } from '../Context/authuntication';
import Login from '../Login/Login';

const ProtectedRoute = ({children}) => {

   const token= useContext(authContext);

   if(!token.token){
    return <Login/>
  }
  else{
  return (
    <>
    {children}
    </>
  )
  }

}

export default ProtectedRoute