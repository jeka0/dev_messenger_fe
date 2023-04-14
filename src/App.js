import React from 'react';
import { Auth } from "./auth/authContext"
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration"
import AuthorizedRoute from './security/AuthorizedRoute';
import UnauthorizedRoute from './security/UnauthorizedRoute';
import MenuWrapper from './components/menu_wrapper/menu_wrapper';

function App() {
  return (
    <Auth>
      <AuthorizedRoute>
        <Routes>
          <Route path="/*" element={ <MenuWrapper /> }/>
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
