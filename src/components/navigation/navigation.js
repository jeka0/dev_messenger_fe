import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useAuth } from '../../auth/useAuth';
import { useCommunityChat } from '../../contexts/community-chat-context/useCommunityChat';
import menuIcon from '../../img/menu.png'
import Container from '../container/container.js';
import UserInfo from '../userInfo/userInfo';
import MenuBlock from '../menu_block/menu_block';
import './navigation.css';

function Navigation(props) {
  const { logout, user  } = useAuth();
  const { communitys, chats } = useCommunityChat();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event)=>{
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  const handleClose = ()=>{
    setAnchorEl(null);
    setOpen(false);
  }

    return (
      <Container className={`navigation ${props.className}`}>
        <div className="action-bar">
          <input className='menu-button' type="image" src={menuIcon} alt="Кнопка «menu»" onClick={handleClick}/>
          <Menu className='menu' open={open} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem component={Link} to="/home" onClick={handleClose}>Home</MenuItem>
            <MenuItem component={Link} to={`/user/${user.id}`} onClick={handleClose}>My account</MenuItem>
            <MenuItem component={Link} to={`/user/update`} onClick={handleClose}>Update account info</MenuItem>
            <MenuItem component={Link} onClick={logout}>logout</MenuItem>
          </Menu>
        </div>
        <div className='navigation-list'>
          {communitys.map((community)=> <Link key={community.id} to={`/community/${community.id}`}><MenuBlock name={community.name} image={community.image}/></Link>)}
            <h2>chats</h2>
          {chats.map((chat)=> <Link key={chat.id} to={`/chat/${chat.id}`}><MenuBlock name={chat.name} image={chat.image}/></Link>)}
        </div>
        <UserInfo user = { user } className="user-block"/>
      </Container>
    );
  }
  
  export default Navigation;