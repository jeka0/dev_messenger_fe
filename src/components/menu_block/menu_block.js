import React from 'react';
import image from '../../img/no_image.png'
import './menu_block.css'

function MenuBlock(props) {
  const url ='http://localhost:3020/api/image/';
  const imageUrl = props.image? url + props.image: image;

    return (
      <div className={"menu_block " + props.className}>
        <img src={imageUrl} alt="test" />
        <div className="menu_block_content">
          <h3>{props.name}</h3>
        </div>
      </div>
    );
  }
  
  export default MenuBlock;