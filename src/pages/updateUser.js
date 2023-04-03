import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { TextField, Box, Button } from '@material-ui/core';
import { validateEmail } from "../halpers/validation";
import { useAuth } from '../auth/useAuth.js';
import Container from '../components/container/container.js';
import UserInfo from '../components/userInfo/userInfo';
import Background from '../components/background/background.js';
import EmailInput from '../components/emailInput/emailInput.js';
import PasswordInput from '../components/passwordInput/passwordInput.js';
import { updateUser } from '../services/userService';
import LoadImage from '../components/loadImage/loadImage';
import '../styles/updateUser.css';

function UpdateUser() {
  const [form, setForm] = useState({})
  const [imageUrl, setImageUrl] = useState();
  const [nowImage, setImage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [errorForm, setError] = useState({
    emailError:{
      isValid: true,
      message: ""
    },
  });

  const { user, update } = useAuth();
  const navigate = useNavigate();
  const valid = {
    isValid: true,
    message: ""
  };
  const fileReader = new FileReader();

  fileReader.onloadend = ()=>{
      setImageUrl(fileReader.result);
  }

  const changeImage = (e)=>{
    try{
      const file =  e.target.files[0];
      setImage(file);
      fileReader.readAsDataURL(file);
    }catch {}
  }

  const togglePasswordVisibility =()=>{
    setShowPassword(!showPassword);
  }

  const goBack = ()=>{
    navigate(-1);
  }

  const onSubmit = (event)=>{
    event.preventDefault();
    const formdata = new FormData();
    for (const key in form){
        if(form[key] === user[key] || form[key] === "") {
            delete form[key];
        }else{
            formdata.append(key, form[key]);
        }
    }
    if(nowImage){
        formdata.append('image', nowImage);
    }

    updateUser(formdata)
    .then(()=>{
        update()
        .then(goBack);
    });
  }

  useEffect(()=>{
    for (const key in errorForm){
      if(errorForm[key].message === "Wrong email or password") setError({...errorForm, [key]: valid});
    }
  },[form])

  const updateForm = (event)=>{
    if(event.target.name==="email") {
        let err = validateEmail(event.target.value);
        if(err.message === "Email is required")err = { isValid: true, message: "" };
        setError({...errorForm, emailError: err});
    }
    setForm({...form, [event.target.name] : event.target.value})
  }

  return (
    <Background className="update-background">
      <Container className="update-container">
        <UserInfo className="update-user-info" user = {{ image: user.image  }} image = {imageUrl}/>
        <LoadImage className='update-image' name="Load" onChange={changeImage} />
        <Box className = "margin">
            <EmailInput
                label = {user.email}
                placeholder = {user.email}
                error={!errorForm.emailError.isValid} 
                helperText={errorForm.emailError.message} 
                onChange = {updateForm}
            />
        </Box>
        <Box className = "margin">
          <TextField 
            className = "mat-Input" 
            type = "text" 
            name = "firstName" 
            label = {user.firstName || "First name"}
            placeholder = {user.firstName || "Enter first name"} 
            variant = "standard"  
            onChange = {updateForm}
          />
        </Box>
        <Box className = "margin">
          <TextField
            className = "mat-Input" 
            type = "text"  
            name = "lastName" 
            label = {user.lastName || "Last name"}
            placeholder = {user.lastName || "Enter last name"} 
            variant = "standard" 
            onChange = {updateForm}
          />
        </Box>
        <Box className = "margin">
            <PasswordInput
                showPassword={showPassword}
                label = {user.password}
                placeholder = {user.password}
                onChange = {updateForm}
                onClick={togglePasswordVisibility}
            />
        </Box>
        <Box className = "margin">
          <Button 
            className = "mat-Button custom" 
            name = "submit" 
            disabled = {!errorForm.emailError.isValid} 
            variant = "contained" 
            onClick={onSubmit}
          >
            Update
          </Button>
        </Box>
        <Box className = "margin">
        <Link to="/sign-In"> 
          <Button 
            className = "mat-Button" 
            name = "link" 
            onClick={goBack}
            variant = "text"
          >
          Turn back
          </Button>
        </Link> 
        </Box>
      </Container>
    </Background>
  );
}
  
export default UpdateUser;