import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './login.css'
import { signIn } from '../../Redux/auth/action'
// import { signInGoogle } from '../../Redux/auth/action'
import { useNavigate } from 'react-router-dom';
import slider from '../../Assets/Slide.png'
// import google from '../../Assets/Google.png'
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/footer'
import Navbar from '../../Components/Navbar/Navbar';
import { FaEyeSlash } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import notify from '../../utils/toastNotifications';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });


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
        setShowPassword(!showPassword);
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
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
            const response = await dispatch(signIn(formData));
            if (response.status) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response._id);
                setFormData({ email: '', password: '' });
                navigate('/admin');
                notify.success("Login Successfully!");
            } else {
                notify.error(response.message || "Wrong password or email");
            }
        }
    };
    // const handleSignInGoogle = async () => {
    //     const response = await dispatch(signInGoogle());
    //     if (response.status) {
    //         navigate('/admin');
    //     }
    //     else {
    //         alert("error while signIn with Google")
    //     }
    // }
 
    return (

        <>
            <Navbar />
            <div className='register-container'>
                <div className='register-image'>
                    <img src={slider} alt="" />
                </div>
                <div className='rigester-medmax-width'>
                    <p className='register-acntcrt'>Login in to Topshop</p>
                    <p className='register-acntcrt-entr'>Enter Your details below</p>

                    <form className='register-frm' onSubmit={Submithandler}>
                        <div className='padding-cont-required'>
                            <div className='hide-show-funct'>
                                <input
                                    name='email'
                                    type="email"
                                    id='text-pas'
                                    placeholder='enter email'
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
                                    placeholder='enter password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span className='design-eyetoggle' onClick={() => eyeToggle()}>
                                    {showPassword ? <LuEye /> : <FaEyeSlash />}

                                </span>
                            </div>
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <button className='register-btn' type="submit">Log In</button>
                    </form>

                    <div style={{ textAlign: 'center' }}>
                        <span className='register-already-actn'>Don't have an account?  </span>
                        <Link to='/signup'>
                            <span style={{ color: 'gray', textDecoration: 'underline' }}>Register</span>
                        </Link><br />
                        <Link to='/forgot-password'>
                            <span className='forget-pass'>Forgot password ?</span>
                        </Link>
                    </div>
                    {/* <div className='login-with-google' onClick={handleSignInGoogle}>
                        <div className='google-width-sett'>
                        <img src={google} alt="google" />
                        </div>
                        <span>Sign In with Google</span>
                    </div> */}
                </div>

            </div>
            <Footer />

        </>
    )
}

export default Login