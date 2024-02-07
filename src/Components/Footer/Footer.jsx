import React from 'react'

const Footer = () => {

  return (

    <div style={{"background":"#f0f3f2"}} className='py-5 mt-4'>

    
    <div className="container">
      <h2 className='fw-lighter'>Get the FreshCart App</h2>
      <p style={{"color":"gray"}}>
        We will send you a link, open it on your phone to download the app
      </p>

      <div className="d-flex justify-content-between mb-4">
        <form>
          <input className='form-control' type="email" placeholder='Email..' name='email' id='email' style={{"width": "500%"}}/>
        </form>
                  <button className='btn' style={{"background":"#59c356","color":"#fff"}}>Share App Link</button>

      </div>

      <div className="d-flex justify-content-between border-bottom border-top py-3">
        <div className='d-flex'>
          <p>Payment Partners</p>
        </div>
        <div className='d-flex'>
          <p>Get delivers with FreshCart</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Footer