import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Box, Button } from '@material-ui/core';
import Container from '../container/container.js';
import { useCommunityChat } from '../../contexts/community-chat-context/useCommunityChat.js';
import { createCommunity } from '../../services/communityService.js';
import LoadImage from '../loadImage/loadImage.js';
import NoImage from '../../img/no_image.png';
import './createCommunity.css';

function CreateCommunity() {
    const valid = {
        isValid: true,
        message: ""
      };
  const [form, setForm] = useState({})
  const [imageUrl, setImageUrl] = useState();
  const [nowImage, setImage] = useState();
  const [errorForm, setError] = useState(valid);
  const { updateCommunitys } = useCommunityChat();
  const navigate = useNavigate();
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

  const goBack = ()=>{
    navigate(-1);
  }

  const onSubmit = (event)=>{
    event.preventDefault();
    const formdata = new FormData();
    if(!form.name){
        setError({
            isValid: false,
            message: "Name cannot be empty"
        });
        return;
    }

    formdata.append("name", form.name);

    if(nowImage){
        formdata.append('image', nowImage);
    }

    createCommunity(formdata)
    .then(()=>{
       updateCommunitys().then(goBack);
    }).catch((err)=>{ 
        setError({
        isValid: false,
        message: err.response.data
    });});

  }

  const updateForm = (event)=>{
    setError(valid);
    setForm({...form, [event.target.name] : event.target.value})
  }

  return (
    <div className="community-create-background">
      <Container className="community-create-container">
        <h1>Create community</h1>
        <img src={nowImage? imageUrl: NoImage} className="community-icon"/>
        <LoadImage className='community-create-image' name="Load" onChange={changeImage} />
        <Box className = "community-create-margin">
          <TextField 
            className = "mat-Input" 
            type = "text" 
            name = "name" 
            label = "Name"
            error={!errorForm.isValid}
            helperText={errorForm.message}
            placeholder = "Enter name"
            variant = "standard"  
            onChange = {updateForm}
          />
        </Box>
        <Box className = "community-create-margin">
          <Button 
            className = "mat-Button custom" 
            name = "submit" 
            disabled = {!errorForm.isValid} 
            variant = "contained" 
            onClick={onSubmit}
          >
            Update
          </Button>
        </Box>
        <Box className = "community-create-margin">
          <Button 
            className = "mat-Button" 
            name = "link" 
            onClick={goBack}
            variant = "text"
          >
          Turn back
          </Button>
        </Box>
      </Container>
    </div>
  );
}
  
export default CreateCommunity;