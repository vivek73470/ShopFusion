import { MdOutlineDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";

export const SIDEBAR_MENU_ITEMS = [
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
    icon: <CgProfile />,
  }
];

export const LOGOUT_ICON = <TbLogout />;

