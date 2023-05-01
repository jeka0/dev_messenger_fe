import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Box, Button, Select, MenuItem } from '@material-ui/core';
import Container from '../container/container.js';
import { useCommunityChat } from '../../contexts/community-chat-context/useCommunityChat.js';
import { useAuth } from '../../auth/useAuth.js';
import { createChat, updateChat, getChatById } from '../../services/chatService.js';
import { getUserById } from '../../services/userService.js';
import SearchBar from '../searchBar/searchBar.js';
import MenuBlock from '../menu_block/menu_block.js';
import LoadImage from '../loadImage/loadImage';
import NoImage from '../../img/no_image.png';
import './createChat.css';

function CreateChat(props) {
  const { id } = useParams();
  const { user } = useAuth();
  const valid = {
    isValid: true,
    message: ""
  };

  const url ='http://localhost:3020/api/image/';
  const [chat, setChat]= useState();
  const [form, setForm] = useState({name:"", visibility:"public"})
  const [imageUrl, setImageUrl] = useState();
  const [nowImage, setImage] = useState();
  const [errorForm, setError] = useState(valid);
  const [users, setUsers] = useState([user]);
  const { updateChats } = useCommunityChat();
  const navigate = useNavigate();
  const fileReader = new FileReader();

  useEffect(()=>{
    if(props.update){
      getChatById(id).then((result)=>{
        setChat(result);
        setImageUrl(undefined);
        setImage(undefined);
        setError(valid);
      })
    }else{
      setChat(undefined);
      setForm({name:"", visibility:"public"});
      setImageUrl(undefined);
      setImage(undefined);
      setError(valid);
      setUsers([user]);
    }
  }, [props.update])

  useEffect(()=>{
    if(chat){
      setForm(chat);
      setUsers([]);
      chat.users.forEach(user =>getUserById(user.id).then(result=> setUsers(arr=>[...arr, result ])));
    }
  }, [chat])

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

    if(chat.name !== form.name)formdata.append("name", form.name);
    formdata.append("visibility", form.visibility);
    formdata.append("users", JSON.stringify(users));

    if(nowImage){
        formdata.append('image', nowImage);
    }

    if(props.update){
      updateChat(id, formdata).then(then).catch(error);
    }else {
      createChat(formdata).then(then).catch(error);
    }
  }

  const then = ()=>{
    updateChats().then(goBack);
 }

  const error = (err)=>{ 
    setError({
    isValid: false,
    message: err.response.data
});}

  const updateForm = (event)=>{
    setError(valid);
    setForm({...form, [event.target.name] : event.target.value})
  }

  const handleChoose = (user)=>{
    if(!users.some(u=>u.id===user.id)) setUsers(users=>[...users, user]);
  }

  const handleDelete = (user)=>{
    if(users.some(u=>u.id===user.id)){
      const index = users.indexOf(user);
      users.splice(index, 1);
      setUsers([...users]);
    }
  }

  if(props.update && !chat) return (<div>Loading</div>)

  return (
    <div className="chat-create-background">
      <Container className="chat-create-container">
        <h1>{props.update?"Update chat":"Create chat"}</h1>
        <img src={nowImage? imageUrl: chat?.image?url + chat.image: NoImage} className="chat-icon"/>
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
            value={form.name} 
            onChange = {updateForm}
          />
        </Box>
        <h4>Visibility</h4>
        <Select className='create-chat-select' name="visibility" value={form.visibility} onChange={updateForm}>
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </Select>
        <h4>Users</h4>
        <SearchBar onlyUsers={true} onChoose={handleChoose}/>
        <div className='create-chat-userList'>
          {users.length?users.map(user=> <MenuBlock key={user.id} name={user.email} image={user.image} delete={()=>{handleDelete(user)}}/>):<MenuItem>No Users</MenuItem>}
        </div>
        <Box className = "chat-create-margin">
          <Button 
            className = "mat-Button custom" 
            name = "submit" 
            disabled = {!errorForm.isValid} 
            variant = "contained" 
            onClick={onSubmit}
          >
            {props.update?"Update":"Create"}
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