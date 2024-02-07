import React, { useContext } from 'react'
import siteLogo from '../../images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../Context/authuntication';
import { cartContext } from '../Context/cartCount';

const Navbar = () => {


  const token=useContext(authContext);
const {cartCount}=useContext(cartContext)
  const navigate=useNavigate()

  function logoutUser(){
    localStorage.removeItem("token");
    token.setToken(null);
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container">
    <Link className="navbar-brand" to="/">
        <img src={siteLogo} alt="Fresh Cart Logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {token.token? <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page"  to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wishlist">Wishlist</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/allorders">Your Orders</Link>
        </li>
    
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
    
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
    
      </>:""}
        
      </ul>
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    
    
        <li className="nav-item d-flex align-items-center">
          <div className='px-2'>
            <Link className="nav-link" to="/cart">
             <i class="fa-solid fa-cart-shopping main-color position-relative ">
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {cartCount}
  </span>
            </i>
            </Link>
            </div>
            <i className="fa-brands fa-instagram mx-2 "></i>
            <i className="fa-brands fa-facebook mx-2"></i>
            <i className="fa-brands fa-tiktok mx-2"></i>
            <i className="fa-brands fa-twitter mx-2"></i>
            <i className="fa-brands fa-linkedin mx-2"></i>
            <i className="fa-brands fa-youtube mx-2"></i>
           
        </li>
    
       
    
    {token.token?  <li className="nav-item">
          <span className="nav-link" onClick={logoutUser} style={{cursor:"pointer"}}>Logout</span>
        </li>:<>
         <li className="nav-item">
          <Link className="nav-link active" aria-current="page"  to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        </>}
           

        
      </ul>
      
    </div>
  </div>
</nav>
  )
}

export default Navbar