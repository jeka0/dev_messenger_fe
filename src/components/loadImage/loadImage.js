import React from 'react';
import './loadImage.css'

function LoadImage(props) {
    return (
        <div className={props.className}>
            <label htmlFor='update-fileBut' className='load-file'><b>{props.name}</b></label>
            <input id="update-fileBut" type="file" accept="image/*,image/jpeg" hidden onChange={props.onChange}/>
        </div>
    );
  }
  
  export default LoadImage;
