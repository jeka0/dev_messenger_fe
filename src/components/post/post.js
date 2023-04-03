import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/container.js';
import Content from '../postContent/postContent.js';
import Header from '../postHeader/postHeader.js';
import Action from '../postAction/postAction.js';
import Chat from '../postChat/postChat.js';
import './post.css';

function Post(props) {
  const [postData, setPostData] = useState();

  useEffect(()=> {
    setPostData(props.data);
  }, [])

  if(!postData) return (<div>Loading</div>)

    return (
      <Container className="post-container">
        <Link to={`/user/${postData.user.id}`}>
          <Header data={postData}/>
        </Link>
        <Link to={`/post/${postData.id}`}>
          <Content className="post-content" data={postData}/>
        </Link>
        <Action data={postData} updatePost = {setPostData}/>
        <Link to={`/post/${postData.id}`}>
          <Chat data={postData}/>
        </Link>
      </Container>
    );
  }
  
  export default Post;