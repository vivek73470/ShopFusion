import React from 'react';
import './contact.css';
import Footer from '../../Components/Footer/footer';
import Navbar from '../../Components/Navbar/Navbar';
import notify from '../../utils/toastNotifications';
import { useSendContactMutation } from '../../services/api/contactApi';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';

function Contactus() {
  const [sendContact, { isLoading }] = useSendContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  const handleSubmitForm = async (formData) => {
    try {
      const res = await sendContact(formData).unwrap();
      if (res.status || res.message) {
        reset();
        notify.success(res.message || 'Mailed Successfully');
      } else {
        notify.error(res.message || 'Error while sending mail');
      }
    } catch (error) {
      notify.error(error?.data?.message || 'An error occurred while sending mail');
    }
  };
  return (
    <>
      <Navbar />

      <div className='contact-screen'>
        <span className='contact-getin'>
          <h2>Get in Touch with us</h2>
        </span>
        <div className='contact-form'>
          <h4 className='contact-drop'>Drop us a message</h4>
          <form className='contact-frmm' onSubmit={handleSubmit(handleSubmitForm)}>
            <div className='form-group'>
              <input
                {...register('name', { required: 'Name is required' })}
                name='name'
                type='text'
                id='name'
                placeholder='Your Name'
              />
              {errors.name && <span className='error'>{errors.name.message}</span>}
            </div>
            <div className='form-group'>
              <input
                {...register('email', { required: 'Email is required' })}
                name='email'
                type='email'
                id='email'
                placeholder='Your Email'
              />
              {errors.email && <span className='error'>{errors.email.message}</span>}
            </div>
            <div className='form-group'>
              <input
                {...register('phone', { required: 'Phone number is required' })}
                name='phone'
                type='tel'
                id='phone'
                placeholder='Your Phone Number'
              />
              {errors.phone && <span className='error'>{errors.phone.message}</span>}
            </div>
            <div className='form-group'>
              <textarea
                {...register('message', { required: 'Message is required' })}
                name='message'
                id='message'
                placeholder='Your Message'
              ></textarea>
              {errors.message && <span className='error'>{errors.message.message}</span>}
            </div>
            <button type='submit' className='contact-bnt' disabled={isLoading}>
              {isLoading ? <CircularProgress size={18} /> : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contactus;