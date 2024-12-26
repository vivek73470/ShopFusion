import React from 'react'
import './navbar.css'
import Profile from '../Profile/Profile'
import { MdOutlineShoppingCart } from "react-icons/md";
import CartCounter from '../CartCounter/CartCounter';
import { Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import Search from '../SearchBar/Search';





function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token')
 
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId');
    navigate('/login')

   
  };
  return (
    <>
      <div className='navbar-screen'>
        <div className='navbar-wrapper'>
          <div  className='navbar-1stprdcetc'> 
          <div className='header-exclusive'>
          <Link to='/'>
          <span className='navbar-head-homcnt'>ShopFusion</span>
            </Link>
          </div>
          <div className='header-dsp-hme'>
            <Link to='/'>
              <span className='navbar-head-homcnt'>Home</span>
            </Link>
            <Link to='/products'>
              <span className='navbar-head-homcnt'>Products</span>
            </Link>
            <Link to='/contact-us'>
              <span className='navbar-head-homcnt'>Contact</span>
            </Link>
          </div>
          </div>
         
          <div className='navbar-cart-parent'>
        <Search/>
            <div className='navbar-cart'>
              <Link to='/orders'>
                <span className='header-registr-yr'>Your <br/>Orders</span>
              </Link>
              <Link to='/cart' >
                <div className='cart-counter'>
                  <CartCounter />
                </div>
                <span className='header-cart-img'>
                  <MdOutlineShoppingCart />
                </span>
              </Link>

              <Profile />
              <div className='header-login-register'>
                <Link to='/login'>
                  <span className='header-registr'>SignUp /</span>
                </Link>
                <Link to='/login'>
                  <span className='header-registr'>In</span>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='navbar-hamburger-container'>
        <div className='navbar-hamburger-wrapper'>
          <div className='navbar-hamb-offcanvas' data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <RxHamburgerMenu />
          </div>
          <div className='navbar-hamburger-topshop'>
            <span>ShopFusion</span>
          </div>


        </div>


        <div class="offcanvas offcanvas-start  hamburger-offcanvas-wid" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
          <div id='offcanvas-header-hambopen' class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">ShopFusion</h5>
            <button type="button" class="btn-close admin-closebtn-canvas" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="offcanvas-body-wrapper">
              <div className='offcanvas-body-homecnt'>
                <Link to='/'>
                  <span className='navbar-head-homcnt-hamb'>Home</span>
                </Link>
                <Link to='/products'>
                  <span className='navbar-head-homcnt-hamb'>Products</span>
                </Link>

                <Link to='/orders'>
                  <span className='navbar-head-homcnt-hamb'>Your Orders</span>
                </Link>
                <Link to='/cart' >
                  <span className='navbar-head-homcnt-hamb'>Cart</span>
                </Link>
                <Link to='/contact-us'>
                  <span className='navbar-head-homcnt-hamb'>Contact</span>
                </Link>
                <Link to='/admin/profile'>
                  <span className='navbar-head-homcnt-hamb'>Profile</span>
                </Link>

                {token ? (
                  <span className='navbar-head-homcnt-hamb' onClick={()=>handleLogout()}>Logout</span>
                ):(
                  <Link to='/login'>
                    <span className='navbar-head-homcnt-hamb'>Login</span>
                  </Link>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>





    </>
  )
}

export default Navbar