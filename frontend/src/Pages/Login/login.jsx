import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './login.css';
import { useNavigate } from 'react-router-dom';
import slider from '../../Assets/Slide.png';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/footer';
import Navbar from '../../Components/Navbar/Navbar';
import { FaEyeSlash } from 'react-icons/fa6';
import { LuEye } from 'react-icons/lu';
import notify from '../../utils/toastNotifications';
import { useLoginMutation } from '../../services/api/userApi';
import { setToken } from '../../Redux/slices/authSlice';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const eyeToggle = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      if (response.status) {
        dispatch(setToken(response.token));
        localStorage.setItem('userId', response._id);
        navigate('/admin');
        notify.success('Login Successfully!');
      } else {
        notify.error(response.message || 'Wrong password or email');
      }
    } catch (error) {
      notify.error(error?.data?.message || 'Wrong password or email');
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
          <p className='register-acntcrt'>Login in to ShopFusion</p>
          <p className='register-acntcrt-entr'>Enter Your details below</p>

          <form className='register-frm' onSubmit={handleSubmit(onSubmit)}>
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
                  type='email'
                  id='text-pas'
                  placeholder='enter email'
                />
              </div>
              {errors.email && <span className='error'>{errors.email.message}</span>}
            </div>

            <div className='padding-cont-required'>
              <div className='hide-show-funct'>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id='text-pas'
                  placeholder='enter password'
                />
                <span className='design-eyetoggle' onClick={() => eyeToggle()}>
                  {showPassword ? <LuEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && <span className='error'>{errors.password.message}</span>}
            </div>
            <button className='register-btn' type='submit' disabled={isLoading}>
              {isLoading ? <CircularProgress size={18} /> : 'Log In'}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <span className='register-already-actn'>Don't have an account? </span>
            <Link to='/signup'>
              <span style={{ color: 'gray', textDecoration: 'underline' }}>Register</span>
            </Link>
            <br />
            <Link to='/forgot-password'>
              <span className='forget-pass'>Forgot password ?</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;