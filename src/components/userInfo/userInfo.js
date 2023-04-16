import React from 'react';
import image from '../../img/avatar.jpg'
import './userInfo.css';

function UserInfo(props) {
  const url ='http://localhost:3020/api/image/';
  const imageUrl = props.image? props.image: props.user.image? url + props.user.image : image;

    return (
      <div className={'userInfo ' + props.className}>
        <img src={imageUrl} alt="test" />
        <div className="userText">
          <h3>
              {props.user.email}
          </h3>
          <h3>
              {`${props.user.firstName || ""} ${props.user.lastName || ""}`}
          </h3>
        </div>
      </div>
    );
  }
  
  export default UserInfo;