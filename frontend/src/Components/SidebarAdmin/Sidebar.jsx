
import React, { useState } from 'react'
import './sidebar.css'
import { useNavigate, NavLink,Link } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import notify from '../../utils/toastNotifications';

// takes a prop named Children.
function Sidebar({ children }) {

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };
  const navigate = useNavigate();

  const menuItem = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: <MdOutlineDashboard />
    },
    {
      title: 'Add Product',
      path: '/admin/add-product',
      icon: <MdOutlineProductionQuantityLimits />,
    },
    {
      title: 'Cart',
      path: '/admin/cart-admin',
      icon: <IoMdCart />,
    },
    {
      title: 'Profile',
      path: '/admin/profile',
      icon: <CgProfile />
      ,
    }
 
  ]


  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId');
    navigate('/login')
    notify.success("Logout Successfully!");
  }



  return (
    <>
      <div className='sidebar-screen'>
      {/* If isOpen is true, the width is set to "300px"; otherwise, if isOpen is false, the width is set to "105px" */}
        <div style={{ width: isOpen ? "300px" : "105px" }} className='sidebar-screen-wrapper'>
          <div className='top-section'>
          <h1 style={{ display: isOpen ? "block" : "none" }} className='logo'><span><Link to = '/'>ShopFusion</Link></span></h1>
            <div style={{ marginLeft: isOpen ? "105px" : "0px" }} className='bars'>
              <FaBars onClick={handleToggle} />
            </div>
          </div>
          {
            menuItem.map((elem) => (
              <NavLink
                to={elem.path}
                key={elem.path}
                className="link"
                activeClassName="active"
              >
                <div className='"icon'>{elem.icon}</div>
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{elem.title}</div>
              </NavLink>
            ))
          }
          <div className='sidebar-log'>
              <button
              className="link-btn"
              activeClassName="active"
              onClick={() => handleLogout()}>
              <div className="icon">
                <TbLogout />
              </div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Logout</div>
              </button>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Sidebar
