import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth.js';
import UserInfo from '../userInfo/userInfo.js';
import { getUserById } from '../../services/userService.js';
import './user.css'

function User() {
  const { id } = useParams();
  const { user } = useAuth();
  const [nowUser, setUser] = useState();

  useEffect(()=> {
    init();
  }, [id])

  const init = async ()=>{
    setUser(await getUserById(id));
  }

  if(!nowUser) return (<div>Loading</div>)

      return (
          <div className="user-content">
          <UserInfo className="user-info" user = { nowUser } edit={user.id===nowUser.id}/>
          <hr/>

          </div>
      );
    }
    
    export default User;
