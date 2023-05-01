import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem } from '@material-ui/core';
import { useAuth } from '../../auth/useAuth';
import { useCommunityChat } from '../../contexts/community-chat-context/useCommunityChat';
import menuIcon from '../../img/menu.png'
import Container from '../container/container.js';
import UserInfo from '../userInfo/userInfo';
import MenuBlock from '../menu_block/menu_block';
import SearchBar from '../searchBar/searchBar';
import './navigation.css';

function Navigation(props) {
  const { logout, user  } = useAuth();
  const { communitys, chats } = useCommunityChat();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event)=>{
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  const handleClose = ()=>{
    setAnchorEl(null);
    setOpen(false);
  }

  const handleChoose = (result)=>{
    navigate(`/${result.type}/${result.id}`);
  }

    return (
      <Container className={`navigation ${props.className}`}>
        <div className="action-bar">
          <input className='menu-button' type="image" src={menuIcon} alt="Кнопка «menu»" onClick={handleClick}/>
          <Menu className='menu' open={open} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem component={Link} to="/home" onClick={handleClose}>Home</MenuItem>
            <MenuItem component={Link} to={`/user/${user.id}`} onClick={handleClose}>My account</MenuItem>
            <MenuItem component={Link} to={`/chat/create`} onClick={handleClose}>Create chat</MenuItem>
            <MenuItem component={Link} to={'/community/create'} onClick={handleClose}>Create community</MenuItem>
            <MenuItem component={Link} onClick={logout}>logout</MenuItem>
          </Menu>
          <SearchBar onChoose={handleChoose}/>
        </div>
        <div className='navigation-list'>
          <h2>Communities</h2>
          {communitys.map((community)=> <Link key={community.id} to={`/community/${community.id}`}><MenuBlock name={community.name} image={community.image}/></Link>)}
          <h2>Chats</h2>
          {chats.map((chat)=> <Link key={chat.id} to={`/chat/${chat.id}`}><MenuBlock name={chat.name} image={chat.image}/></Link>)}
        </div>
        <Link to={`/user/${user.id}`}><UserInfo user = { user } className="user-block"/></Link>
      </Container>
    );
  }
  
  export default Navigation;