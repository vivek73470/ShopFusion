import React from 'react'
import './dashboard.css'
import { useGetProductsQuery, useDeleteProductMutation } from '../../services/api/productApi'
import { useNavigate } from 'react-router-dom'
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import notify from '../../utils/toastNotifications'


function Dashboard() {
  const navigate = useNavigate()
  const { data: productsData } = useGetProductsQuery();
  const [deleteProductMutation] = useDeleteProductMutation();
  const watches = productsData?.data || [];

  const deleteProduct = async (id) => {
    if (id) {
        try {
            const result = await deleteProductMutation(id).unwrap();
            if (result.status) {
              notify.success("Deleted Successfully!"); 
            } else {
              notify.error("Error while deleting!"); 
            }
        } catch (error) {
            notify.error(error?.data?.message || "Error while deleting!");
        }
    } else {
      notify.error("Invalid product ID!"); 
    }
};

  return (
    <>
      <div className='dashboard-screen'>
        <div className='dashboard-wrappeer'>
          <div className='dash-admin-addbtn'>
            <span>Total Products -{watches?.length}</span>
            <button onClick={() => navigate('/admin/add-product')} className='your-events'>Add Products</button>
          </div>
          <div className='break-line '>
          </div>
          <div className='product-listing-dash'>
            {watches?.length > 0 &&
              watches.map((item) => (
                <div className="productlist-design-dash" key={item.id} >
                  <div class="dropdown">
                    <button class="action_btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="material-icons">more_vert</i>
                    </button>
                    <ul id='action-dropdown' class="dropdown-menu">
                      <li onClick={() => navigate(`/admin/edit-product/${item._id}`)}> <TiEdit /> Edit</li>
                      <li onClick={() => deleteProduct(item._id)}> <RiDeleteBin6Line /> Delete</li>
                    </ul>
                  </div>
                  <img className='product-imgstyle-dash' src={item.image} alt="cloth products" />
                  <p className='product-brandname-dash'>{item.brand_namez}</p>
                  <p className='product-actual-title-dash'>{item.title}</p>
                  {/* <p className='product-actual-price'>₹{item.price}</p> */}
                  <div className='product-price-description-dash'>
                    <p className='product-discount-price-dash'>₹{item.discountedPriceText}</p>
                    <p className='product-actual-price-dash'>₹{item.actualPriceText}</p>
                  </div>
                  <p className='product-title-members-dash'>₹{item.discount_price_box} For Tribe Members</p>
                  {/* <button onClick={() => navigate(`/cartproducts/${item.id}`,'_blank')} className='dash-ad-viewdtls'>View details</button> */}
                  <button onClick={() => window.open(`/cartproducts/${item._id}`, '_blank')} className='dash-ad-viewdtls'>View details</button>

                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard