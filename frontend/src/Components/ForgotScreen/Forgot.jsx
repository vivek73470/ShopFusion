import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './forgot.css'
import { RequestchangePassword } from '../../Redux/auth/action'
import slider from '../../Assets/Slide.png'
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/footer'
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom'
import notify from '../../utils/toastNotifications'



function Forgot() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailData, setemailData] = useState({ email: '' })



    const handleEmail = (e) => {
        setemailData({
            ...emailData,
            [e.target.name]: e.target.value
        })
    }

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(RequestchangePassword(emailData))
        if (response.status) {
            navigate('/new-password')
        }
        else{
            notify.error("Email not found.");
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
                    <p className='register-acntcrt'>Forgot password</p>
                    <p className='register-acntcrt-entr' style={{ paddingBottom: '16px' }}>Enter your email to reset your password </p>

                    <form onSubmit={handleEmailSubmit}>
                        <div className='padding-cont-required'>
                            <div className='hide-show-funct'>
                                <input
                                    name='email'
                                    type="email"
                                    id='text-pas'
                                    value={emailData.email}
                                    onChange={handleEmail}
                                    required
                                />
                            </div>
                        </div>
                        <button className='register-btn' type="submit">Submit</button>
                    </form>

                    <div style={{ textAlign: 'center' }}>
                        <Link to='/login'>
                            <span style={{ color: 'gray', textDecoration: 'underline' }}>Back to login</span>
                        </Link><br />

                    </div>
                </div>

            </div>
            <Footer />


        </>
    )
}

export default Forgot