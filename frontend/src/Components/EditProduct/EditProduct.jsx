import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { storage } from '../../firebase/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import notify from '../../utils/toastNotifications';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../services/api/productApi';
import CircularProgress from '@mui/material/CircularProgress';

function EditProduct() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const { data: editproduct, isLoading: isLoadingProduct } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
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
  });

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (editproduct?.data) {
      const productData = {
        category: String(editproduct.data.category || ''),
        title: String(editproduct.data.title || ''),
        price: (editproduct.data.price || ''),
        description: String(editproduct.data.description || ''),
        plp: String(editproduct.data.plp || ''),
        brand_namez: String(editproduct.data.brand_namez || ''),
        discountedPriceText: (editproduct.data.discountedPriceText || ''),
        actualPriceText: (editproduct.data.actualPriceText || ''),
        discount_price_box: (editproduct.data.discount_price_box || ''),
        image: String(editproduct.data.image || ''),
        filtercategory: String(editproduct.data.filtercategory || ''),
        size: String(editproduct.data.size || ''),
      };
      reset(productData);
      setPreviewImage(editproduct.data.image);
    }
  }, [editproduct, reset]);

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      let updatedImageURL = data.image; // Default to existing image URL

      // If a new image is selected, upload it to Firebase
      if (imageFile) {
        const uniqueFileName = `${Date.now()}_${imageFile.name}`;
        const storageRef = ref(storage, `images/${uniqueFileName}`);

        // Upload the image file to Firebase
        const snapshot = await uploadBytes(storageRef, imageFile);

        // Get the download URL of the uploaded image
        updatedImageURL = await getDownloadURL(snapshot.ref);
      }

      // Prepare updated product data
      const updatedProductData = {
        ...data,
        image: updatedImageURL // Use the new image URL if a new image was uploaded
      };

      const response = await updateProduct({ id, body: updatedProductData }).unwrap();

      if (response.status) {
        navigate('/admin');
        notify.success("Product updated successfully!");
      } else {
        notify.error("Product update failed!");
      }
    } catch (error) {
      console.error(error);
      notify.error(error?.data?.message || "An error occurred while updating the product.");
    } finally {
      setSubmitting(false)
    }
  };


  if (isLoadingProduct) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container-addproduct">
        <h1 className='addproduct-title'>Edit Product</h1>
        <form className='' onSubmit={handleSubmit(onSubmit)}>
          <div className='addproduct-form'>

            <div className='frm-leftdiv'>
              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Select Category</label><br />
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className='addproduct-input-drp'
                  >
                    <option value='' disabled>Select Category</option>
                    <option value="Boys">Boys</option>
                    <option value="Kids">Kids</option>
                    <option value="Girls">Girls</option>
                  </select>
                  <div>
                    {errors.category && <span className="error">{errors.category.message}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Title</label><br />
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    className='addproduct-input'
                    id="title"
                    placeholder="------"
                  />
                  <div>
                    {errors.title && <span className="error">{errors.title.message}</span>}
                  </div>
                </div>
              </div>

              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Enter Size</label><br />
                  <input
                    {...register('size', { required: 'Size is required' })}
                    type="text"
                    className='addproduct-input'
                    id="size"
                    placeholder="------"
                  />
                  <div>
                    {errors.size && <span className="error">{errors.size.message}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Brand Name</label><br />
                  <input
                    {...register('brand_namez', { required: 'Brand name is required' })}
                    type="text"
                    className='addproduct-input'
                    id="brand_namez"
                    placeholder="------"
                  />
                  <div>
                    {errors.brand_namez && <span className="error">{errors.brand_namez.message}</span>}
                  </div>
                </div>
              </div>


              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Enter Design </label><br />
                  <input
                    {...register('plp', { required: 'Design is required' })}
                    type="text"
                    className='addproduct-input'
                    id="plp"
                    placeholder="------"
                  />
                  <div>
                    {errors.plp && <span className="error">{errors.plp.message}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Price</label><br />
                  <input
                    {...register('price', {
                      required: 'Price is required',
                      valueAsNumber: true,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Only numbers are allowed',
                      },
                    })}
                    type="number"
                    className='addproduct-input'
                    id="price"
                    placeholder="------"
                  />

                  <div>
                    {errors.price && <span className="error">{errors.price.message}</span>}
                  </div>
                </div>
              </div>


              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Enter Actual Price</label><br />
                  <input
                    {...register('actualPriceText', {
                      required: 'Actual price is required',
                      valueAsNumber: true,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Only numbers are allowed',
                      },
                    })}
                    type="number"
                    className='addproduct-input'
                    id="actualPriceText"
                    placeholder="------"
                  />

                  <div>
                    {errors.actualPriceText && <span className="error">{errors.actualPriceText.message}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Discount Price Box</label><br />
                  <input
                    {...register('discount_price_box', {
                      required: 'Discount price box is required',
                      valueAsNumber: true,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Only numbers are allowed',
                      },
                    })}
                    type="number"
                    className='addproduct-input'
                    id="discount_price_box"
                    placeholder="------"
                  />

                  <div>
                    {errors.discount_price_box && <span className="error">{errors.discount_price_box.message}</span>}
                  </div>
                </div>
              </div>


              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label'>
                  <label>Enter Discount Price Text</label><br />
                  <input
                    {...register('discountedPriceText', {
                      required: 'Discounted price text is required',
                      valueAsNumber: true,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Only numbers are allowed',
                      },
                    })}
                    type="number"
                    className='addproduct-input'
                    id="discountedPriceText"
                    placeholder="------"
                  />

                  <div>
                    {errors.discountedPriceText && <span className="error">{errors.discountedPriceText.message}</span>}
                  </div>
                </div>
                <div className='addprdct-admin-label'>
                  <label>Enter Filter Category</label><br />
                  <input
                    {...register('filtercategory', { required: 'Filter category is required' })}
                    type="text"
                    className='addproduct-input'
                    id="filtercategory"
                    placeholder="------"
                  />
                  <div>
                    {errors.filtercategory && <span className="error">{errors.filtercategory.message}</span>}
                  </div>
                </div>
              </div>


              <div className='add-admin-prd-rww'>
                <div className='addprdct-admin-label-des'>
                  <label>Enter Description</label><br />
                  <input
                    {...register('description', { required: 'Description is required' })}
                    type="text"
                    className='addproduct-input'
                    id="description"
                    placeholder="------"
                  />
                  <div>
                    {errors.description && <span className="error">{errors.description.message}</span>}
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
                {!previewImage && !editproduct?.data?.image && (
                  <span className="error">Image is required</span>
                )}
              </div>
            </div>
          </div>
          <div className='goback-btn'>
            <button className='addproduct-button' type="submit" disabled={submitting}>
              {submitting ? <CircularProgress size={18} /> : 'Submit'}
            </button>
            <button className='addproduct-button' type="button" onClick={handleBack}>Go back</button>
          </div>
        </form>

      </div>

    </>
  )
}

export default EditProduct