import React, { useState }from 'react';
import { Menu } from '@material-ui/core';
import image from '../../img/no_image.png';
import menuIcon from '../../img/menu.png';
import './action_bar.css'

function ActionBar(props) {
    const url ='http://localhost:3020/api/image/';
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }

    const handleClose = ()=>{
        setAnchorEl(null);
        setOpen(false);
    }

    return (
        <div className="action-bar">
        <img src={ props.data.image? url + props.data.image: image} alt="test" />
        <div className="action-bar-content">
          <h3>{props.data.name}</h3>
        </div>
        <input className='action-bar-button' type="image" src={menuIcon} alt="Кнопка «menu»" onClick={handleClick}/>
        <Menu className='menu' open={open} onClose={handleClose} onClick={handleClose} anchorEl={anchorEl}>
            {props.children}
        </Menu>
      </div>
    );
  }
  
  export default ActionBar;