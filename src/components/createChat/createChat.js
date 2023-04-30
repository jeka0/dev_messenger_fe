import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Box, Button, Select, MenuItem } from '@material-ui/core';
import Container from '../container/container.js';
import { useCommunityChat } from '../../contexts/community-chat-context/useCommunityChat.js';
import { createChat } from '../../services/chatService.js';
import LoadImage from '../loadImage/loadImage';
import NoImage from '../../img/no_image.png';
import './createChat.css';

function CreateChat() {
    const valid = {
        isValid: true,
        message: ""
      };
  const [form, setForm] = useState({visibility:"public"})
  const [imageUrl, setImageUrl] = useState();
  const [nowImage, setImage] = useState();
  const [errorForm, setError] = useState(valid);
  const { updateChats } = useCommunityChat();
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
    formdata.append("visibility", form.visibility);

    if(nowImage){
        formdata.append('image', nowImage);
    }

    createChat(formdata)
    .then(()=>{
       updateChats().then(goBack);
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
    <div className="chat-create-background">
      <Container className="chat-create-container">
        <h1>Create chat</h1>
        <img src={nowImage? imageUrl: NoImage} className="chat-icon"/>
        <LoadImage className='chat-create-image' name="Load" onChange={changeImage} />
        <Box className = "chat-create-margin">
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
        <h4>Visibility</h4>
        <Select className='create-chat-select' name="visibility" value={form.visibility} onChange={updateForm}>
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </Select>
        <Box className = "chat-create-margin">
          <Button 
            className = "mat-Button custom" 
            name = "submit" 
            disabled = {!errorForm.isValid} 
            variant = "contained" 
            onClick={onSubmit}
          >
            Create
          </Button>
        </Box>
        <Box className = "chat-create-margin">
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
  
export default CreateChat;