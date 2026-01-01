// // import { useDispatch } from "react-redux";
// // import { type } from "@testing-library/user-event/dist/type";
// import axios from "axios";
// import { auth, provider } from '../../firebase/firebase.config'
// import { signInWithPopup } from 'firebase/auth'


// export const SIGNIN_GOOGLE_REQUEST = 'SIGNIN_GOOGLE_REQUEST';
// export const SIGNIN_GOOGLE_SUCCESS = 'SIGNIN_GOOGLE_SUCCESS';
// export const SIGNIN_GOOGLE_FAILURE = 'SIGNIN_GOOGLE_FAILURE';


// export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
// export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
// export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

// export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
// export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
// export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// export const UPDATE_REQUEST = 'UPDATE_REQUEST';
// export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
// export const UPDATE_FAILURE = 'UPDATE_FAILURE';

// export const SET_REQUEST = 'SET_REQUEST';
// export const SET_SUCCESS = 'SET_SUCCESS';
// export const SET_FAILURE = 'SET_FAILURE';

// export const UPDATE_PASS_REQUEST = 'UPDATE_PASS_REQUEST';
// export const UPDATE_PASS_SUCCESS = 'UPDATE_PASS_SUCCESS';
// export const UPDATE_PASS_FAILURE = 'UPDATE_PASS_FAILURE';

// export const CHANGGE_PASS_REQUEST = 'CHANGGE_PASS_REQUEST';
// export const CHANGGE_PASS_SUCCESS = 'CHANGGE_PASS_SUCCESS';
// export const CHANGGE_PASS_FAILURE = 'CHANGGE_PASS_FAILURE';

// export const CONTACT_MAILER_REQUEST = 'CONTACT_MAILER_REQUEST';
// export const CONTACT_MAILER_SUCCESS = 'CONTACT_MAILER_SUCCESS';
// export const CONTACT_MAILER_FAILURE = 'CONTACT_MAILER_FAILURE';

// const BASE_URL = process.env.REACT_APP_SERVER_URL;


// // google signIn
// const SignInGoogleRequest = () => {
//     return {
//         type: SIGNIN_REQUEST
//     }
// }
// const SignInGoogleSuccess = (payload) => {
//     return {
//         type: SIGNIN_SUCCESS,
//         payload
//     }
// }
// const SignInGoogleFailure = () => {
//     return {
//         type: SIGNIN_FAILURE
//     }
// }
// export const signInGoogle = () => async (dispatch) => {
//     try {
//         dispatch(SignInGoogleRequest());
//         const { user } = await signInWithPopup(auth, provider);
//         console.log('google', user.displayName)
//         localStorage.setItem('token', user.email);
//         dispatch(SignInGoogleSuccess(user.displayName))
//         return { status: true }
//     }
//     catch (error) {
//         dispatch(SignInGoogleFailure())
//         return { status: false }
//     }

// }


// // signIn
// const SignInRequest = () => {
//     return {
//         type: SIGNIN_REQUEST
//     }
// }
// const SignInSuccess = (payload) => {
//     return {
//         type: SIGNIN_SUCCESS,
//         payload,
//     }
// }
// const SignInFailure = () => {
//     return {
//         type: SIGNIN_FAILURE
//     }
// }
// export const signIn = (formData) => async (dispatch) => {
//     try {
//         dispatch(SignInRequest());
//         const res = await fetch(`${BASE_URL}/user/login`, {
//             method: 'POST',
//             body: JSON.stringify(formData),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         const users = await res.json();
//         if (res.status === 200) {
//             dispatch(SignInSuccess({ status: true }));
//             return { status: true, token: users.token, _id: users._id };
//         } else {
//             return { status: false, message: users.message };
//         }
//     }
//     catch (error) {
//         dispatch(SignInFailure());
//         return { status: false, message: 'An unexpected error occurred' };
//     }
// };


// // signup
// const SignUpRequest = () => {
//     return {
//         type: SIGNUP_REQUEST
//     }
// }
// const SignUpSuccess = (payload) => {
//     console.log("payload", payload)
//     return {
//         type: SIGNUP_SUCCESS,
//         payload,

//     }
// }
// const SignUpFailure = () => {
//     return {
//         type: SIGNUP_FAILURE
//     }
// }
// export const signUp = (formData) => async (dispatch) => {
//     try {
//         dispatch(SignUpRequest());
//         const response = await fetch(`${BASE_URL}/user/register`, {
//             method: 'POST',
//             body: JSON.stringify(formData),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         const user = await response.json();
//         if (response.status === 201) {
//             dispatch(SignUpSuccess(user));
//             return { status: true }
//         } else if (response.status === 409) {
//             return { status: false, code: 409, message: 'Email already registered' };
//         } else {
//             return { status: false, code: response.status, message: 'Registration failed' };
//         }

//     } catch (error) {
//         console.error('Error during sign up:', error);
//         dispatch(SignUpFailure());
//         return { status: false, code: 500, message: 'An unexpected error occurred' };
//     }
// };



// // Single user fetch details
// const SetInRequest = () => {
//     return {
//         type: SET_REQUEST
//     }
// }
// const SetInSuccess = (payload) => {
//     return {
//         type: SET_SUCCESS,
//         payload,

//     }

// }
// const SetInFailure = (payload) => {
//     return {
//         type: SET_FAILURE,
//         payload,

//     }

// }
// export const fetchUserData = (userId) => async (dispatch) => {
//     const token = localStorage.getItem('token');
//     dispatch(SetInRequest());
//     try {
//         const response = await axios.get(`${BASE_URL}/user/${userId}`,{
//             headers: {
//                 'Authorization': token 
//             }
//         });
//         dispatch(SetInSuccess(response.data.data));
//     } catch (err) {
//         dispatch(SetInFailure(err));
//     }
// };



// // update profile 
// const UpdateRequest = () => {
//     return {
//         type: UPDATE_REQUEST
//     }
// }
// const UpdateSuccess = (payload) => {
//     return {
//         type: UPDATE_SUCCESS,
//         payload,
//     }
// }
// const UpdateFailure = () => {
//     return {
//         type: UPDATE_FAILURE
//     }
// }
// export const UpdateProf = (id, data) => async (dispatch) => {
//     const token = localStorage.getItem('token');
//     dispatch(UpdateRequest());
//     try {
//         const res = await axios.put(`${BASE_URL}/user/${id}`, data,{
//             headers: {
//                 'Authorization': token 
//             }
//         });
//         if (res.status === 200) {
//             dispatch(UpdateSuccess(res.data.data));
//             return { status: true }
//         } if (res.status === 404) {
//             return { staus: false, code: 404, message: res.data.message }
//         }
//     } catch (err) {
//         dispatch(UpdateFailure(err.response ? err.response.data : err.message));
//         return { status: false, message: err.message }
//     }
// }


// // verify email to reset password
// const updateRequestEmail = () => {
//     return {
//         type: UPDATE_PASS_REQUEST
//     }
// }
// const updateSuccessEmail = (payload) => {
//     return {
//         type: UPDATE_PASS_SUCCESS,
//         payload
//     }
// }
// const updateFailureEmail = () => {
//     return {
//         type: UPDATE_PASS_FAILURE
//     }
// }
// export const RequestchangePassword = (emailData) => async (dispatch) => {
//     dispatch(updateRequestEmail());
//     try {
//         const response = await axios.post(`${BASE_URL}/user/forgot-password`, emailData);
//         if (response.data.status === true) {
//             dispatch(updateSuccessEmail(response.data.data))
//             return { status: true, message: response.data.message }
//         }
//         else {
//             return { status: false, message: response.data.message };
//         }
//     } catch (error) {
//         dispatch(updateFailureEmail('error fetching user details'));
//         return { status: false, message: error.message || "An error occurred" };
//     }
// };



// // new password
// const changeRequestPassword = () => {
//     return {
//         type: CHANGGE_PASS_REQUEST
//     }
// }
// const changeSuccessPassword = (payload) => {
//     return {
//         type: CHANGGE_PASS_SUCCESS,
//         payload
//     }
// }
// const changeFailurePassword = () => {
//     return {
//         type: CHANGGE_PASS_FAILURE
//     }
// }
// export const Changepassword = (id, passwordData) => async (dispatch) => {
//     dispatch(changeRequestPassword());
//     try {
//         const response = await axios.put(`${BASE_URL}/user/reset-password/${id}`, passwordData);
//         if (response.status === 200) {
//             dispatch(changeSuccessPassword());
//             return { status: true, message: response.data.message };
//         }
//     } catch (error) {
//         console.error('Error changing password:', error);
//         dispatch(changeFailurePassword('Failed to change password.'));
//         return { status: false, message: error.response ? error.response.data.message : error.message };
//     }
// }


// // node mailer
// const MailRequest = () => {
//     return {
//         type: CONTACT_MAILER_REQUEST
//     }
// }
// const MailSuccess = (payload) => {
//     return {
//         type: CONTACT_MAILER_SUCCESS,
//         payload,
//     }
// }
// const MailFailure = () => {
//     return {
//         type: CONTACT_MAILER_FAILURE
//     }
// }

// export const Nodemailer = (initState) => async (dispatch) => {
//     dispatch(MailRequest());
//     try {
//         const response = await axios.post(`${BASE_URL}/contact/send`, initState)
//         if (response.status === 200) {
//             dispatch(MailSuccess())
//             return { status: true, message: response.data.message }
//         }
//     } catch (error) {
//         dispatch(MailFailure('Failed to mail'))
//         return { status: false, message: error.response ? error.response.data.message : error.message }

//     }
// }