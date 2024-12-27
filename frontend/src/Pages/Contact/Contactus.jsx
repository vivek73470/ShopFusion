import React from 'react'
import './contact.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import Footer from '../../Components/Footer/footer';
import Navbar from '../../Components/Navbar/Navbar';
import { Nodemailer } from '../../Redux/auth/action';
import { startLoading, stopLoading } from '../../Redux/products/action';
import notify from '../../utils/toastNotifications';



function Contactus() {
  const dispatch = useDispatch();
  const initState = {
    name: "",
    email: "",
    phone: "",
    message: ""
  }
  const [formData, setFormData] = useState(initState);
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevformData) => ({
      ...prevformData,
      [name]: value

    }));
    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  }

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        dispatch(startLoading());
        const res = await dispatch(Nodemailer(formData))
        if (res.status) {
          setFormData(initState)
          notify.success(res.message || 'Mailed Successfully')
        } else {
          notify.error(res.message || 'Error while sending mail')
        }

      } catch (error) {
        notify.error('An error occurred while sending mail');
        console.error("Mail sending error:", error);
      } finally {
        dispatch(stopLoading());
      }
    }

  }
  return (
    <>

      <Navbar />

      <div className='contact-screen'>
        <span className='contact-getin'><h2>Get in Touch with us</h2></span>
        <div className="contact-form">
          <h4 className='contact-drop'>Drop us a message</h4>
          <form className='contact-frmm' onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}

              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">

              <input
                name="email"
                type="email"
                id="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}

              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">

              <input
                name="phone"
                type="tel"
                id="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}

              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group">

              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}

              >
              </textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>
            <input type="submit" className='contact-bnt' value="Submit" />
          </form>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Contactus