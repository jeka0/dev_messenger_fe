import React from 'react';
import image from '../../img/avatar.jpg'
import './postHeader.css';

function Header(props) {
    const url ='http://localhost:3000/api/image/';
    const imageUrl = props.data.user.image? url + props.data.user.image : image;

    return (
        <div className={'header ' + props.className}>
            <img src={imageUrl} alt="test" />
            <p>
                <strong>{props.data.user.email}</strong>
            </p>
        </div>
    );
  }
  
  export default Header;