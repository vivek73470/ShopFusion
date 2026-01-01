import React from 'react';
import './forgot.css';
import slider from '../../Assets/Slide.png';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/footer';
import Navbar from '../../Components/Navbar/Navbar';
import notify from '../../utils/toastNotifications';
import { useForgotPasswordMutation } from '../../services/api/userApi';
import { useDispatch } from 'react-redux';
import { setRequestPass } from '../../Redux/slices/authSlice';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';

function Forgot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: '' }
  });

  const handleEmailSubmit = async (data) => {
    try {
      const response = await forgotPassword(data).unwrap();
      if (response.status) {
        dispatch(setRequestPass(response.data));
        navigate('/new-password');
      } else {
        notify.error(response.message || 'Email not found.');
      }
    } catch (error) {
      notify.error(error?.data?.message || 'Email not found.');
    }
  };

  return (
    <>
      <Navbar />
      <div className='register-container'>
        <div className='register-image'>
          <img src={slider} alt='' />
        </div>
        <div className='rigester-medmax-width'>
          <p className='register-acntcrt'>Forgot password</p>
          <p className='register-acntcrt-entr' style={{ paddingBottom: '16px' }}>
            Enter your email to reset your password{' '}
          </p>

          <form onSubmit={handleSubmit(handleEmailSubmit)}>
            <div className='padding-cont-required'>
              <div className='hide-show-funct'>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    }
                  })}
                  name='email'
                  type='email'
                  id='text-pas'
                />
              </div>
              {errors.email && <span className='error'>{errors.email.message}</span>}
            </div>
            <button className='register-btn' type='submit' disabled={isLoading}>
              {isLoading ? <CircularProgress size={18} /> : 'Submit'}
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

export default Forgot;