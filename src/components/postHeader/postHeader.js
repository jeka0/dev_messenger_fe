import React from 'react';
import image from '../../img/no_image.png'
import './postHeader.css';

function Header(props) {
    const url ='http://localhost:3000/api/image/';
    const imageUrl = props.data.community.image? url + props.data.community.image : image;

    return (
        <div className={'header ' + props.className}>
            <img src={imageUrl} alt="test" />
            <p>
                <strong>{props.data.community.name}</strong>
            </p>
        </div>
    );
  }
  
  export default Header;