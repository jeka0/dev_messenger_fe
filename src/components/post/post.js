import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/container.js';
import Content from '../postContent/postContent.js';
import Header from '../postHeader/postHeader.js';
import Action from '../postAction/postAction.js';
import './post.css';

function Post(props) {
  const [postData, setPostData] = useState();

  useEffect(()=> {
    setPostData(props.data);
  }, [])

  if(!postData) return (<div>Loading</div>)

    return (
      <Container className="post-container">
        <Link to={`/community/${postData.community.id}`}>
          <Header data={postData}/>
        </Link>
        <Link to={`/post/${postData.id}`}>
          <Content className="post-content" data={postData}/>
        </Link>
        <Link to={`/post/${postData.id}`}>
          <div className="post-message"><h4>{postData.message}</h4></div>
        </Link>
        <Action data={postData} updatePost = {setPostData}/>
      </Container>
    );
  }
  
  export default Post;
