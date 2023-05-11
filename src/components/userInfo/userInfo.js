import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../img/avatar.jpg'
import imgEdit from "../../img/edit.png";
import './userInfo.css';

function UserInfo(props) {
  const url ='http://localhost:3020/api/image/';
  const imageUrl = props.image? props.image: props.user.image? url + props.user.image : image;

    return (
      <div className={'userInfo ' + props.className}>
        <div className="imageConst">
        <img src={imageUrl} alt="test" />
        {!props.edit || <Link to={`/user/update`} className="editUser"><input className="editUserIcon" type="image" src={imgEdit} alt="Кнопка «edit»"/></Link>}
        </div>
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