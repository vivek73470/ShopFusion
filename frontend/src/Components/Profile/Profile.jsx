import React, { useRef, useState } from 'react';
import './profile.css';
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom';

function Profile() {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId');
  };

  const Menus = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
    },
    token && {
      title: 'Logout',
      path: '/',
      onClick: handleLogout 
    }
  ].filter(Boolean);

  const menuRef = useRef();
  const imgRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  return (
    <>
      <div className='profile-screen'>
        <div className='prfl-pic'>
          <span
            className='profile-pht'
            ref={imgRef}
            onClick={(e) => {
              e.stopPropagation(); 
              setOpen(!open);
            }}
          >
            <CgProfile />
        
          </span>
          <p className='profile-text'>Profile</p>
          {
            open && (
              <div
                ref={menuRef}
                className='profile-menu-options'>
                <div className='profile-menuflxx'>
                  {
                    Menus.map((menu, index) => (
                      <NavLink
                        onClick={menu.onClick ? menu.onClick : () => setOpen(false)}
                        className='list-mne'
                        to={menu.path}
                        key={index}
                      >
                        {menu.title}
                      </NavLink>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Profile;
