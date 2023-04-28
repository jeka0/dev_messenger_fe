import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../home/home';
import SinglePost from '../singlePost/singlePost';
import CreatePost from '../createPost/createPost';
import CreateChat from '../createChat/createChat';
import CreateCommunity from '../createCommunity/createCommunity';
import User from '../user/user';
import UpdateUser from '../updateUser/updateUser';
import Background from '../background/background';
import Navigation from '../navigation/navigation';
import { CommunityChat } from '../../contexts/community-chat-context/community-chat-context'
import { Socket } from '../../contexts/socketContext/socketContext';
import Community from '../community/community';
import Chat from '../chat/chat';
import './menu_wrapper.css'

function MenuWrapper() {
    return (
      <Background className="wrapper-background">
        <Socket>
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
                <Route path='/chat/create' element={ <CreateChat />}/>
                <Route path='/community/create' element={ <CreateCommunity />}/>
                <Route path="/chat/:id" element={ <div className='chat_area'><Chat /></div>} />
                <Route path="*" element={ <Navigate to="/home"/> }/>
              </Routes>
            </div>
          </CommunityChat>
        </Socket>
      </Background>
    );
  }
  
  export default MenuWrapper;