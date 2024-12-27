import React, { useEffect, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProf, fetchUserData } from '../../Redux/auth/action';
import { startLoading, stopLoading } from '../../Redux/products/action';
import notify from '../../utils/toastNotifications';

function ProfileAd() {
  const dispatch = useDispatch();
  const profileData = useSelector((store) => store.AuthReducer.userData)
  const [data, setData] = useState({
    username: '',
    gender: '',
    number: '',
    address: '',
    DOB: "",

  })
  const token = localStorage.getItem('userId');

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (profileData) {
      setData(profileData);
    }
  }, [setData, profileData]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  }

  // const handleProfileChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setData({
  //         ...data,
  //         [e.target.name]: reader.result
  //       });
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(startLoading())
      const res = await dispatch(UpdateProf(token, data));
      if (res.status) {
        notify.success("Profile updated successfully!");
      } else {
        notify.error(res.message || "Failed to update profile.");
      }
    } catch (error) {
      notify.error("An error occurred. Please try again.");
    }finally {
      dispatch(stopLoading());
    }
  };


  return (
    <>
      <h2 className='profile-persnl'>Personal Info..</h2>
      <form className='Profile-Form' onSubmit={handleSubmit}>
        <div className='profile-left-frm'>
          <div className='inside-prfle-lftfrm'>
            <input
              name='username'
              type='text'
              placeholder='User Name'
              value={data.username}
              onChange={handleChange}
            />
            <br />
            <input
              name='gender'
              type='text'
              placeholder='Gender'
              value={data.gender}
              onChange={handleChange}
            />
            <br />
            <input
              name='number'
              type='tel'
              placeholder='Phone Number'
              value={data.number}
              onChange={handleChange}
            />
            <br />
            <input
              name='DOB'
              type='date'
              placeholder='DOB'
              value={data.DOB}
              onChange={handleChange}
            />
            <br />
            <input
              name='address'
              type='text'
              placeholder='Address'
              value={data.address}
              onChange={handleChange}
            />
            <br />
            <button type='submit'>Update</button>
          </div>

          {/* <div className='profilr-pic'>
           <input
             name='profilephoto'
             type="file"
             placeholder='Add Your Photo'
             onChange={handleProfileChange}
           />
           {data.profilephoto && (
             < img
               src={data.profilephoto}
               alt='Profile Photo'
             />
           )}
         </div> */}

        </div>


      </form>
    </>
  )
}

export default ProfileAd