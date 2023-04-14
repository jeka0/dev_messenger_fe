import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useAuth } from '../../auth/useAuth';
import Container from '../container/container.js';
import UserInfo from '../userInfo/userInfo';
import './navigation.css';

function Navigation(props) {
  const { logout, user  } = useAuth();  
  const [open, setOpen] = useState(false);

  const handleClick = ()=>{
    setOpen(!open)
  }

    return (
      <Container className={`navigation ${props.className}`}>
        <div className="action-bar">
          <Button onClick={handleClick}>Menu</Button>
          <Menu className='menu' open={open} onClose={handleClick}>
            <MenuItem component={Link} to="/home" onClick={handleClick}>Home</MenuItem>
            <MenuItem component={Link} to={`/user/${user.id}`} onClick={handleClick}>My account</MenuItem>
            <MenuItem component={Link} to={`/user/update`} onClick={handleClick}>Update account info</MenuItem>
            <MenuItem component={Link} to={`/post/create`} onClick={handleClick}>Create post</MenuItem>
            <MenuItem component={Link} onClick={logout}>logout</MenuItem>
          </Menu>
        </div>
        <div className='navigation-list'>

        </div>
        <UserInfo user = { user } className="user-block"/>
      </Container>
    );
  }
  
  export default Navigation;