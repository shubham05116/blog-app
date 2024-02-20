import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setIsLoggedIn, setPassword, setPrivateRoute } from "../store/slices/accountSlices/loginSlice";
import {  useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { toast } from 'react-toastify';
import RemoveCookies from '../hooks/RemoveCookies';
import SetCookies from '../hooks/SetCookies';
import { Base64 } from 'js-base64';

const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //formData:
  const email = useSelector(state => state.login.email);
  const password = useSelector(state => state.login.password);
  const storedUserData = useSelector(state => state.account.data);

    //error handling:
    const [emailError , setEmailError]=useState(false)
    const [isValid , setIsValid]=useState(false)

  const handleEmailChange = (event) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!emailRegex.test(event.target.value)) {
      setEmailError(true)
    }
    else {
      setEmailError(false)
    }
    dispatch(setEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    dispatch(setPassword(event.target.value));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if(email === '' && password === ''){
      toast.error('Email and Password cannot be empty')
    }
   else if (email === '') {
      toast.error('Email cannot be empty')
      setIsValid(true)
      setEmailError(true)
    }
    else if (email !== '' && password === '') {
      toast.error('Password cannot be empty')
      setIsValid(true)
    }
    else{
      setIsValid(false)
    }

    dispatch(setPrivateRoute(true))
    const encodedPass = Base64.encode(password) 


    const found = storedUserData.find(element => element.email === email && element.password === password);
    const findEmail = storedUserData.find(element => element.email === email);

    if (found && email !== '' && password !== '') {
      console.log('Login Successful');
      navigate('/home');
      dispatch(setIsLoggedIn(true))
      toast.success('Logged In successfully')
      SetCookies('userIn', JSON.stringify({
        email,
         encodedPass
      }))
      // SetCookies('userIn', JSON.stringify(password))
    }
    else if(!findEmail ) {
      console.log('Login Failed');
      // setIsValid(true)
      setEmailError(true)
    }
    else{
      console.log('Login Failed');
      setIsValid(true)
      setEmailError(false)
    }
  }


  return (
    <>
      <LoginForm
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        submitHandler={submitHandler}
        emailError={emailError}
        isValid={isValid}

      />

    </>
  );
};

export default Login;
