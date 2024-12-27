import React from 'react'
import './navbar.css'
import Profile from '../Profile/Profile'
import { MdOutlineShoppingCart } from "react-icons/md";
import CartCounter from '../CartCounter/CartCounter';
import { Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import Search from '../SearchBar/Search';
import { GoHome } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { FaBorderAll } from "react-icons/fa";
import { LiaProductHunt } from "react-icons/lia";







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
          <div className='navbar-1stprdcetc'>
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
            <Search />
            <div className='navbar-cart'>
              <Link to='/orders'>
                <span className='header-registr-yr'>Your <br />Orders</span>
              </Link>
              <Link to='/cart' >
                <div className='cart-counter'>
                  <CartCounter />
                </div>
                <span className='header-cart-img'>
                  <MdOutlineShoppingCart />
                </span>
              </Link>

              {token ? (
                <Profile />
              ) : (
                <div className='header-login-register'>
                  <Link to='/login'>
                    <span className='header-registr'>SignUp / In</span>
                  </Link>
                </div>
              )}
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
            <h5 style={{fontSize:'23px'}} class="offcanvas-title" id="offcanvasWithBothOptionsLabel">ShopFusion</h5>
            <button type="button" class="btn-close admin-closebtn-canvas" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="offcanvas-body-wrapper">
              <div className='offcanvas-body-homecnt'>
                <Link to='/'>
                  <span className='navbar-head-homcnt-hamb'><span><GoHome /></span> Home</span>
                </Link>
                <Link to='/products'>
                  <span className='navbar-head-homcnt-hamb'><span><LiaProductHunt /></span> Products</span>
                </Link>

                <Link to='/orders'>
                  <span className='navbar-head-homcnt-hamb'> <span><FaBorderAll /></span> Your Orders</span>
                </Link>
                <Link to='/cart' >
                  <span className='navbar-head-homcnt-hamb'><span><CiShoppingCart /></span> Cart</span>
                </Link>
                <Link to='/contact-us'>
                  <span className='navbar-head-homcnt-hamb'><span><IoMdContacts /></span> Contact</span>
                </Link>
                {token && (
                  <Link to='/admin/profile'>
                    <span className='navbar-head-homcnt-hamb'> <span><CgProfile /></span> Profile</span>
                  </Link>
                )}

                {token ? (
                  <span className='navbar-head-homcnt-hamb' onClick={() => handleLogout()}> <span><FiLogOut /></span> Logout</span>
                ) : (
                  <Link to='/login'>
                    <span className='navbar-head-homcnt-hamb'><span><FiLogOut /></span> Login</span>
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