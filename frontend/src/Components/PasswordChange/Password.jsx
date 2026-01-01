import React, { useState } from 'react';
import './password.css';
import slider from '../../Assets/Slide.png';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/footer';
import Navbar from '../../Components/Navbar/Navbar';
import { FaEyeSlash } from 'react-icons/fa6';
import { LuEye } from 'react-icons/lu';
import notify from '../../utils/toastNotifications';
import { useSelector } from 'react-redux';
import { useResetPasswordMutation } from '../../services/api/userApi';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';

function Password() {
  const passId = useSelector((store) => store.auth.requestPass);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { password: '' },
  });

  const handlePassword = async (data) => {
    if (!passId?._id) {
      notify.error('No user to update. Please start from forgot password.');
      return;
    }
    try {
      const response = await resetPassword({ id: passId._id, body: data }).unwrap();
      if (response.status) {
        navigate('/login');
        notify.success('Password changed successfully!');
      } else {
        notify.error(response.message || 'Failed to change password.');
      }
    } catch (error) {
      notify.error(error?.data?.message || 'Failed to change password.');
    }
  };

  const eyeToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className='register-container'>
        <div className='register-image'>
          <img src={slider} alt='' />
        </div>
        <div className='rigester-medmax-width'>
          <p className='register-acntcrt'>Confirm password</p>
          <p className='register-acntcrt-entr' style={{ paddingBottom: '16px' }}>
            Enter new password{' '}
          </p>
          <form onSubmit={handleSubmit(handlePassword)}>
            <div className='padding-cont-required'>
              <div className='hide-show-funct'>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    }
                  })}
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  id='text-pas'
                />
                <span className='design-eyetoggle' onClick={() => eyeToggle()}>
                  {showPassword ? <LuEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && <span className='error'>{errors.password.message}</span>}
            </div>
            <button className='register-btn' type='submit' disabled={isLoading}>
              {isLoading ? <CircularProgress size={18} /> : 'Update'}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <Link to='/login'>
              <span style={{ color: 'gray', textDecoration: 'underline' }}>Back to login</span>
            </Link>
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Password;