import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../../pages/home';
import SinglePost from '../../pages/singlePost';
import CreatePost from '../../pages/createPost';
import User from '../../pages/user';
import UpdateUser from '../../pages/updateUser';
import Background from '../background/background';
import Navigation from '../navigation/navigation';
import { CommunityChat } from '../../contexts/community-chat-context/community-chat-context'
import Community from '../community/community';
import './menu_wrapper.css'

function MenuWrapper() {
    return (
      <Background className="wrapper-background">
        <CommunityChat>
            <Navigation />
            <div className="wrapper-content">
              <Routes>
                <Route path="/post/:id" element={ <SinglePost /> }/>
                <Route path="/post/create/:id" element={ <CreatePost /> }/>
                <Route path="/home" element={ <Home /> }/>
                <Route path="/user/:id" element={ <User /> }/>
                <Route path="/community/:id" element={ <Community />}/>
                <Route path="/user/update" element={ <UpdateUser /> }/>
                <Route path="*" element={ <Navigate to="/home"/> }/>
              </Routes>
            </div>
        </CommunityChat>
      </Background>
    );
  }
  
  export default MenuWrapper;