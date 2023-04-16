import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import UserInfo from '../components/userInfo/userInfo.js';
import { getUserById } from '../services/userService.js';
import '../styles/user.css'

function User() {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(()=> {
    init();
  }, [id])

  const init = async ()=>{
    setUser(await getUserById(id));
  }

  if(!user) return (<div>Loading</div>)

      return (
          <div className="user-content">
          <UserInfo className="user-info" user = { user }/>
          <hr/>

          </div>
      );
    }
    
    export default User;
