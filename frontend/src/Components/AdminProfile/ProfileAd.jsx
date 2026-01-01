import React, { useEffect } from 'react'
import './index.css'
import { useForm } from 'react-hook-form';
import notify from '../../utils/toastNotifications';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../services/api/userApi';
import CircularProgress from '@mui/material/CircularProgress';

function ProfileAd() {
  const token = localStorage.getItem('userId');
  const { data: userData, isLoading: isLoadingUser } = useGetUserByIdQuery(token, { skip: !token });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      gender: '',
      number: '',
      address: '',
      DOB: '',
    }
  });

  useEffect(() => {
    if (userData?.data) {
      reset({
        username: userData.data.username || '',
        gender: userData.data.gender || '',
        number: userData.data.number || '',
        address: userData.data.address || '',
        DOB: userData.data.DOB || '',
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await updateUser({ id: token, body: data }).unwrap();
      if (res.status) {
        notify.success("Profile updated successfully!");
      } else {
        notify.error(res.message || "Failed to update profile.");
      }
    } catch (error) {
      notify.error(error?.data?.message || "An error occurred. Please try again.");
    }
  };


  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className='profile-persnl'>Personal Info..</h2>
      <form className='Profile-Form' onSubmit={handleSubmit(onSubmit)}>
        <div className='profile-left-frm'>
          <div className='inside-prfle-lftfrm'>
            <input
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 4,
                  message: 'Username must be at least 4 characters',
                }
              })}
              type='text'
              placeholder='User Name'
            />
            {errors.username && <span className="error">{errors.username.message}</span>}
            <br />
            <input
              {...register('gender')}
              type='text'
              placeholder='Gender'
            />
            <br />
            <input
              {...register('number', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be exactly 10 digits',
                },
              })}
              type='tel'
              placeholder='Phone Number'
            />

            <br />
            <input
              {...register('DOB')}
              type='date'
              placeholder='DOB'
            />
            <br />
            <input
              {...register('address')}
              type='text'
              placeholder='Address'
            />
            <br />
            <button type='submit' disabled={isUpdating}>
              {isUpdating ? <CircularProgress size={18} /> : 'Update'}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default ProfileAd