import React from 'react'
import errorImage from '../../images/error.svg';
const NotFound = () => {
  return (
    <>
    <div className="container">
        <div className="w-75 m-auto my-3">

        <img className='w-100' src={errorImage} alt="" />
        </div>
    </div>
    </>
  )
}

export default NotFound