import { MdOutlineDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";

export const ADMIN_HEADER_MENU_ITEMS = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <MdOutlineDashboard />
  },
  {
    title: 'Add Products',
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

export const ADMIN_LOGOUT_ICON = <TbLogout />;

