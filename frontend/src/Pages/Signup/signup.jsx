import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../services/api/userApi';
import slider from '../../Assets/Slide.png';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/footer';
import Navbar from '../../Components/Navbar/Navbar';
import { FaEyeSlash } from 'react-icons/fa6';
import { LuEye } from 'react-icons/lu';
import notify from '../../utils/toastNotifications';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';

function Signup() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { username: '', email: '', password: '' },
  });

  const eyeToggle = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      if (response.status) {
        navigate('/login');
        notify.success('Registered Successfully!');
      } else {
        notify.error(response?.message || 'Registered failed! Please try again');
      }
    } catch (error) {
      if (error?.status === 409) {
        notify.error('Email is already registered!');
      } else {
        notify.error(error?.data?.message || 'Registered failed! Please try again');
      }
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
          <p className='register-acntcrt'>Create an account</p>
          <p className='register-acntcrt-entr'>Enter Your details below</p>

          <form className='register-frm' onSubmit={handleSubmit(onSubmit)}>
            <div className='padding-cont-required'>
              <div className='hide-show-funct'>
                <input
                  {...register('username', {
                    required: 'username is required',
                    minLength: {
                      value: 4,
                      message: 'username must be at least 4 characters',
                    },
                  })}
                  type='text'
                  id='text-pas'
                  placeholder='Name'
                />
              </div>
              {errors.username && <span className='error'>{errors.username.message}</span>}
            </div>

            <div className='padding-cont-required'>
              <div className='hide-show-funct'>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  type='email'
                  id='text-pas'
                  placeholder='Email'
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
                  placeholder='Password'
                />
                <span className='design-eyetoggle' onClick={() => eyeToggle()}>
                  {showPassword ? <LuEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && <span className='error'>{errors.password.message}</span>}
            </div>
            <button className='register-btn' type='submit' disabled={isLoading}>
              {isLoading ? <CircularProgress size={18} /> : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <span className='register-already-actn'>Already have an account? </span>
            <Link to='/login'>
              <span style={{ color: 'gray', textDecoration: 'underline' }}>Log in</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;