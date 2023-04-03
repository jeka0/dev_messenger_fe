import React from 'react';
import './background.css'

function Background(props) {
    return (
      <div className={"background " + props.className}>
        {props.children}
      </div>
    );
  }
  
  export default Background;