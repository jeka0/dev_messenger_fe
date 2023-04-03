import React from 'react';
import image from '../../img/avatar.jpg'
import './userInfo.css';

function UserInfo(props) {
  const url ='http://localhost:3000/api/image/';
  const imageUrl = props.image? props.image: props.user.image? url + props.user.image : image;

    return (
      <div className={'userInfo ' + props.className}>
        <img src={imageUrl} alt="test" />
        <h3>
            {props.user.email}
        </h3>
        <h3>
            {`${props.user.firstName || ""} ${props.user.lastName || ""}`}
        </h3>
      </div>
    );
  }
  
  export default UserInfo;