import React from 'react';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import { useAuth } from '../../auth/useAuth';
import Container from '../container/container.js';
import UserInfo from '../userInfo/userInfo';
import './navigation.css';

function Navigation(props) {
  const { logout, user  } = useAuth();  
    return (
      <Container className="navigation">
        <UserInfo user = { user }/>
        <Link to="/home">
          <Button>Home</Button>
        </Link>
        <Link to={`/user/${user.id}`}>
          <Button>My account</Button>
        </Link>
        <Link to={`/user/update`}>
          <Button>Update account info</Button>
        </Link>
        <Link to={`/post/create`}>
          <Button>Create post</Button>
        </Link>
        <Button onClick = { logout }>logout</Button>
      </Container>
    );
  }
  
  export default Navigation;