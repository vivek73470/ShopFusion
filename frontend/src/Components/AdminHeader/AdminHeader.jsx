import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../services/api/userApi';
import { FaBars } from "react-icons/fa";
import { ADMIN_HEADER_MENU_ITEMS, ADMIN_LOGOUT_ICON } from '../../constants/adminHeaderMenu';

function AdminHeader() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId')
  const { data: userData } = useGetUserByIdQuery(userId, { skip: !userId });
  const userDetails = userData?.data;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login')
  }


  const handleNavigation = (url) => {
    navigate(url);

  };
  return (
    <>
      <div className='Admin-Header-screen'>
        <div className='Admin-Header-screen-wrapper'>
          <div className='Admin-Header-title'>
            <div className='admin-header-offcanvas' data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
              <FaBars />
            </div>
            <div className='Admin-Header-title-welcome'>{userDetails?.username}</div>
          </div>
        </div>
      </div>

      <div class="offcanvas offcanvas-start  hamburger-offcanvas-wid" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div id='admin-offcanvas-header-hambopen' class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">ShopFusion</h5>
          <button type="button" class="btn-close admin-closebtn-canvas" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div class="adminoffcanvas-body-wrapper">
            <div className='admin-offcanvas-body-homecnt'>
              {ADMIN_HEADER_MENU_ITEMS.map((item) => (
                <span 
                  key={item.path}
                  className='admin-offcanvas-body-linkk' 
                  onClick={() => handleNavigation(item.path)} 
                  data-bs-dismiss="offcanvas"
                >
                  {item.icon}
                  <span className='admin-navbar-head-homcnt-hamb'>{item.title}</span>
                </span>
              ))}
            </div>

            <div className='admin-offcanvas-logout' onClick={() => handleLogout()} data-bs-dismiss="offcanvas">
              {ADMIN_LOGOUT_ICON}
              <span className='admin-navbar-head-homcnt-hamb'>  Logout</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminHeader


