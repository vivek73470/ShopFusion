import React, { useState } from 'react'
import './sidebar.css'
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import notify from '../../utils/toastNotifications';
import { SIDEBAR_MENU_ITEMS, LOGOUT_ICON } from '../../constants/sidebarMenu';

// takes a prop named Children.
function Sidebar({ children }) {

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId');
    navigate('/login')
    notify.success("Logout Successfully!");
  }



  return (
    <>
      <div className='sidebar-screen'>
        <div className={`sidebar-screen-wrapper ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className='sidebar-content-wrapper'>
            <div className='top-section'>
              <h1 className={`logo ${isOpen ? 'logo-visible' : 'logo-hidden'}`}>
                <span><Link to='/'>ShopFusion</Link></span>
              </h1>
              <div className={`bars ${isOpen ? 'bars-open' : 'bars-closed'}`}>
                <FaBars onClick={handleToggle} />
              </div>
            </div>
            <div className='sidebar-menu-items'>
              {
                SIDEBAR_MENU_ITEMS.map((elem) => (
                  <NavLink
                    to={elem.path}
                    key={elem.path}
                    className="link"
                    activeClassName="active"
                  >
                    <div className="icon">{elem.icon}</div>
                    <div className={`link_text ${isOpen ? 'link-text-visible' : 'link-text-hidden'}`}>
                      {elem.title}
                    </div>
                  </NavLink>
                ))
              }
            </div>
          </div>
          <div className='sidebar-log'>
            <button
              className="link-btn"
              onClick={() => handleLogout()}>
              <div className="icon">
                {LOGOUT_ICON}
              </div>
              <div className={`link_text ${isOpen ? 'link-text-visible' : 'link-text-hidden'}`}>
                Logout
              </div>
            </button>
          </div>
        </div>
        <main className={`main-content ${isOpen ? 'main-open' : 'main-closed'}`}>{children}</main>
      </div>
    </>
  )
}

export default Sidebar
