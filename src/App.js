import React from 'react';
import { Auth } from "./auth/authContext"
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration"
import Home from './pages/home';
import AuthorizedRoute from './security/AuthorizedRoute';
import UnauthorizedRoute from './security/UnauthorizedRoute';
import SinglePost from './pages/singlePost';
import CreatePost from './pages/createPost';
import UpdateUser from './pages/updateUser';
import User from './pages/user';

function App() {
  return (
    <Auth>
      <AuthorizedRoute>
        <Routes>
          <Route path="/post/:id" element={ <SinglePost /> }/>
          <Route path="/post/create" element={ <CreatePost /> }/>
          <Route path="/home" element={ <Home /> }/>
          <Route path="/user/:id" element={ <User /> }/>
          <Route path="/user/update" element={ <UpdateUser /> }/>
          <Route path="*" element={ <Navigate to="/home"/> }/>
        </Routes>
      </AuthorizedRoute>
      <UnauthorizedRoute>
        <Routes>
          <Route path="/sign-In" element={ <Login /> }/>
          <Route path="/sign-Up" element={ <Registration /> }/>
          <Route path="*" element={ <Navigate to="/sign-In"/> }/>
        </Routes>
      </UnauthorizedRoute>
    </Auth>
  );
}

export default App;
