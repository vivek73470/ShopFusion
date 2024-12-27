import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { signUp } from '../../Redux/auth/action';
import slider from '../../Assets/Slide.png'
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/footer'
import Navbar from '../../Components/Navbar/Navbar';
import { FaEyeSlash } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import notify from '../../utils/toastNotifications';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ username: '', email: '', password: '' });
    const [formData, setFormData] = useState(
        { username: '', email: '', password: '' }
    )

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    }
    const eyeToggle = () => {
        setShowPassword(!showPassword)
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'username is required';
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const Submithandler = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await dispatch(signUp(formData))
            if (response.status) {
                setFormData({ username: '', email: '', password: '' })
                navigate('/login')
                notify.success("Registered Successfully!");
            }
            else {
                if (response.code === 409) {
                    notify.error("Email is already registered!");
                } else {
                    notify.error("Registered failed! Please try again");
                }

            }
        }
    }


    return (
        <>
            <Navbar />
            <div className='register-container'>
                <div className='register-image'>
                    <img src={slider} alt="" />
                </div>
                <div className='rigester-medmax-width'>
                    <p className='register-acntcrt'>Create an account</p>
                    <p className='register-acntcrt-entr'>Enter Your details below</p>

                    <form className='register-frm' onSubmit={Submithandler}>
                        <div className='padding-cont-required'>
                            <div className='hide-show-funct'>
                                <input
                                    name='username'
                                    type="text"
                                    id='text-pas'
                                    placeholder='Name'
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.username && <span className="error">{errors.username}</span>}
                        </div>

                        <div className='padding-cont-required'>
                            <div className='hide-show-funct'>
                                <input
                                    name='email'
                                    type="email"
                                    id='text-pas'
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className='padding-cont-required'>
                            <div className='hide-show-funct'>
                                <input
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    id='text-pas'
                                    placeholder='Password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span className='design-eyetoggle' onClick={() => eyeToggle()}>
                                    {showPassword ? <LuEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <button className='register-btn' type="submit">Create Account</button>
                    </form>

                    <div style={{ textAlign: 'center' }}>
                        <span className='register-already-actn'>Already have an account?  </span>
                        <Link to='/login'>
                            <span style={{ color: 'gray', textDecoration: 'underline' }}>Log in</span>
                        </Link>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Signup