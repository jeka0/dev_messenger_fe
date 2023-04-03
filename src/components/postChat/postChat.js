import React from 'react';
import './postChat.css';

function Chat(props) {

    return (
        <div className={'chat ' + props.className} onClick = {props.onClick}>
            <span>{props.data.message}</span>
      </div>
    );
  }
  
  export default Chat;