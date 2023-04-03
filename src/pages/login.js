import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Box, Button } from '@material-ui/core';
import { useAuth } from '../auth/useAuth.js';
import { validateEmail, validatePassword } from "../halpers/validation";
import Container from '../components/container/container.js';
import Background from '../components/background/background.js';
import EmailInput from '../components/emailInput/emailInput.js';
import PasswordInput from '../components/passwordInput/passwordInput.js';
import '../styles/Area.css';

function Login() {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorForm, setError] = useState({
    emailError:{
      isValid: false,
      message: ""
    },
    passwordError:{
      isValid: false,
      message: ""
    }
  });

  const { login }= useAuth();
  const navigate = useNavigate();
  const valid = {
    isValid: true,
    message: ""
  };
  
  const togglePasswordVisibility =()=>{
    setShowPassword(!showPassword);
  }

  const onSubmit = (event)=>{
    event.preventDefault();
    login(form)
    .then(()=>navigate("/home"))
    .catch((err)=>{
      const error = {
        isValid: false,
        message: "Wrong email or password"
      };
      setError({ passwordError: error, emailError: error });
    });
  }

  useEffect(()=>{
    for (const key in errorForm){
      if(errorForm[key].message === "Wrong email or password") setError({...errorForm, [key]: valid});
    }
  },[form])

  const updateForm = async (event)=>{
    if(event.target.name==="email") setError({...errorForm, emailError: validateEmail(event.target.value)});
    if(event.target.name==="password") setError({...errorForm, passwordError: validatePassword(event.target.value)});
    setForm({...form, [event.target.name] : event.target.value})
  }

  return (
    <Background className="auth-background">
      <Container className="auth-container">
        <h1><strong>Sign in</strong></h1>
        <Box className = "margin">
          <EmailInput 
             error={!errorForm.emailError.isValid && errorForm.emailError.message !== ''} 
             helperText={errorForm.emailError.message} 
             onChange = {updateForm}
          />
        </Box>
        <Box className = "margin">
          <PasswordInput 
            showPassword={showPassword}
            onChange = {updateForm}
            error={!errorForm.passwordError.isValid && errorForm.passwordError.message !== ''} 
            helperText={errorForm.passwordError.message} 
            onClick={togglePasswordVisibility}
          />
        </Box>
        <Box className = "margin">
          <Button 
            className = "mat-Button custom" 
            name = "submit" 
            disabled = {!errorForm.emailError.isValid || !errorForm.passwordError.isValid} 
            variant = "contained" 
            onClick={onSubmit}
            >
            Send
          </Button>
        </Box>
        <Box className = "margin">
          <Link to="/sign-Up"> 
            <Button 
              className = "mat-Button" 
              name = "link" 
              variant = "text"
              >
              Sign up
            </Button>
          </Link> 
        </Box>
      </Container>
    </Background>
  );
}
  
export default Login;