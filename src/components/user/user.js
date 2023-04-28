import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import UserInfo from '../userInfo/userInfo.js';
import { getUserById } from '../../services/userService.js';
import './user.css'

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
          <UserInfo className="user-info" user = { user } edit={true}/>
          <hr/>

          </div>
      );
    }
    
    export default User;
