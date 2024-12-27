import React from 'react'
import './index.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addProducts, startLoading, stopLoading } from '../../Redux/products/action';
import { storage } from '../../firebase/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import notify from '../../utils/toastNotifications';

function Addproduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState(
    {
      category: '',
      title: '',
      price: '',
      description: '',
      plp: '',
      brand_namez: '',
      discountedPriceText: '',
      actualPriceText: '',
      discount_price_box: '',
      image: '',
      filtercategory: '',
      size: '',
    }
  );
  const [data, setData] = useState({
    category: '',
    title: '',
    price: '',
    description: '',
    plp: '',
    brand_namez: '',
    discountedPriceText: '',
    actualPriceText: '',
    discount_price_box: '',
    image: '',
    filtercategory: '',
    size: '',
  })
  const handleBack = () => {
    navigate(-1)
  }


  const handleChange = (e) => {
    setData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value
    }))
    setErrors({
      ...errors,
      [e.target.name]: ''
    })

  }

  // Handle image file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file)); 

    setData((prevData) => ({
      ...prevData,
      image: file.name // This sets the image name for validation purposes
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    if (!data.category.trim()) {
      newErrors.category = 'Category is required';
      valid = false;
    }
    if (!data.title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }
    if (!data.price.trim()) {
      newErrors.price = 'Price is required';
      valid = false;
    }
    if (!data.description.trim()) {
      newErrors.description = 'description is required';
      valid = false;
    }
    if (!data.plp.trim()) {
      newErrors.plp = 'About oversize is required';
      valid = false;
    }
    if (!data.brand_namez.trim()) {
      newErrors.brand_namez = 'Brand name is required';
      valid = false;
    }
    if (!data.discountedPriceText.trim()) {
      newErrors.discountedPriceText = 'discounted Price Text is required';
      valid = false;
    }
    if (!data.size.trim()) {
      newErrors.size = 'size is required';
      valid = false;
    }
    if (!data.filtercategory.trim()) {
      newErrors.filtercategory = 'filtercategory is required';
      valid = false;
    }
    if (!data.image.trim()) {
      newErrors.image = 'image is required';
      valid = false;
    }
    if (!data.discount_price_box.trim()) {
      newErrors.discount_price_box = 'discount Price box is required';
      valid = false;
    }
    if (!data.actualPriceText.trim()) {
      newErrors.actualPriceText = 'actual Price Text is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        dispatch(startLoading());
        // step 1
        const uniqueFileName = `${Date.now()}_${imageFile.name}`;
        const storageRef = ref(storage, `images/${uniqueFileName}`);

        const snapshot = await uploadBytes(storageRef, imageFile); // Upload the image file
        const downloadURL = await getDownloadURL(snapshot.ref); // Get the download URL

        // Step 2: Add the download URL to product data
        const productData = {
          ...data,
          image: downloadURL // Save the Firebase Storage image URL to the product data
        };

        // Step 3: Dispatch the action to add the product
        const result = await dispatch(addProducts(productData));
        if (result.status) {
          navigate('/admin');
          notify.success("Product added successfully!");
        } else {
          notify.error("Error while adding product!");
        }

      } catch (error) {
        notify.error("Failed to upload image!");
        console.error("Error uploading image:", error);
      }finally {
        dispatch(stopLoading());
      }
    }
  };


  return (
    <>
      <div className="container-addproduct">
        <h1 className='addproduct-title'>Add Products</h1>
        <form className='' onSubmit={handleSubmit}>
          <div className='addproduct-form'>

            <div className='frm-leftdiv'>
              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Select Category</label><br />
                  <select
                    name='category'
                    className='addproduct-input-drp'
                    value={data.category}
                    onChange={handleChange}
                  >
                    <option value='' disabled>Select Category</option>
                    <option value="Boys">Boys</option>
                    <option value="Kids">Kids</option>
                    <option value="Girls">Girls</option>

                  </select>
                  <div>
                    {errors.category && <span className="error">{errors.category}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Title</label><br />
                  <input
                    name='title'
                    type="text"
                    className='addproduct-input'
                    id="title"
                    placeholder="------"
                    value={data.title}
                    onChange={handleChange}
                  />
                  <div>
                    {errors.title && <span className="error">{errors.title}</span>}
                  </div>
                </div>
              </div>

              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Enter Size</label><br />
                  <input
                    name='size'
                    type="text"
                    className='addproduct-input'
                    id="author"
                    placeholder="------"
                    value={data.size}
                    onChange={handleChange}
                  />
                  <div>
                    {errors.size && <span className="error">{errors.size}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Brand Name</label><br />
                  <input
                    name='brand_namez'
                    type="text"
                    className='addproduct-input'
                    id="author"
                    placeholder="------"
                    value={data.brand_namez}
                    onChange={handleChange}
                  />
                  <div>
                    {errors.brand_namez && <span className="error">{errors.brand_namez}</span>}
                  </div>
                </div>
              </div>


              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Enter Design </label><br />
                  <input
                    name='plp'
                    type="text"
                    className='addproduct-input'
                    id="title"
                    placeholder="------"
                    value={data.plp}
                    onChange={handleChange}

                  />

                  <div>

                    {errors.plp && <span className="error">{errors.plp}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Price</label><br />
                  <input
                    name='price'
                    type="text"
                    className='addproduct-input'
                    id="image"
                    placeholder="------"
                    value={data.price}
                    onChange={handleChange}

                  />
                  <div>

                    {errors.price && <span className="error">{errors.price}</span>}
                  </div>
                </div>
              </div>


              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Enter Actual Price</label><br />
                  <input
                    name='actualPriceText'
                    type="text"
                    className='addproduct-input'
                    id="image"
                    placeholder="------"
                    value={data.actualPriceText}
                    onChange={handleChange}
                  />
                  <div>

                    {errors.actualPriceText && <span className="error">{errors.actualPriceText}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Discount Price Box</label><br />
                  <input
                    name='discount_price_box'
                    type="text"
                    className='addproduct-input'
                    id="image"
                    placeholder="------"
                    value={data.discount_price_box}
                    onChange={handleChange}

                  />

                  <div>

                    {errors.discount_price_box && <span className="error">{errors.discount_price_box}</span>}
                  </div>
                </div>
              </div>


              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Enter Discount Price Text</label><br />
                  <input
                    name='discountedPriceText'
                    type="text"
                    className='addproduct-input'
                    id="image"
                    placeholder="------"
                    value={data.discountedPriceText}
                    onChange={handleChange}
                  />
                  <div>
                    {errors.actualPriceText && <span className="error">{errors.discountedPriceText}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Filter Category</label><br />
                  <input
                    name='filtercategory'
                    type="text"
                    className='addproduct-input'
                    id="image"
                    placeholder="------"
                    value={data.filtercategory}
                    onChange={handleChange}
                  />
                  <div>
                    {errors.filtercategory && <span className="error">{errors.filtercategory}</span>}
                  </div>
                </div>
              </div>


              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label-des'>
                  <label>Enter Description</label><br />
                  <input
                    name='description'
                    type="text"
                    className='addproduct-input'
                    id="author"
                    placeholder="------"
                    value={data.description}
                    onChange={handleChange}
                  />
                  <div>
                    {errors.description && <span className="error">{errors.description}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className='frm-rightdiv'>
              <div className="image-upload-wrapper">
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div className={`upload-box ${!previewImage ? 'border-visible' : ''}`}
                  onClick={() => document.getElementById('imageInput').click()}>
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="preview-image" />
                  ) : (
                    <span className="upload-text">Upload Image</span>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                {errors.image && <span className="error">{errors.image}</span>}
              </div>
            </div>
          </div>
          <div className='goback-btn'>
            <button className='addproduct-button'>Submit</button>
            <button className='addproduct-button' onClick={handleBack}>Go back</button>
          </div>
        </form>

      </div>

    </>
  )
}

export default Addproduct