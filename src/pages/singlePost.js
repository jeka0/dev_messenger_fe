import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import Background from '../components/background/background.js';
import Container from '../components/container/container.js';
import Chat from '../components/postChat/postChat.js';
import Content from '../components/postContent/postContent.js';
import Header from '../components/postHeader/postHeader.js';
import Action from '../components/postAction/postAction.js';
import { getPostById } from '../services/postService.js';
import '../styles/SinglePost.css'

function SinglePost() {
    const { id } = useParams();
    const [postData, setPostData] = useState();
    const navigate = useNavigate();

    useEffect(()=> {
      init();
    }, [])
    
    const goBack = ()=>{
      navigate(-1);
    }

    const init = async ()=>{
      setPostData(await getPostById(id));
    }

    if(!postData) return (<div>Loading</div>)

      return (
        <Background className="single-post-background">
          <div className='Close'>
              <IconButton
                size='medium'
                onClick={goBack}>
                <Clear/>
              </IconButton>
            </div>
            <Container className="single-post-container">
                <Content className="single-post-content" data={postData} />
                <div className="subcontainer">
                  <Link to={`/user/${postData.user.id}`}>
                    <Header className="single-post-header" data={postData}/>
                  </Link>
                  <Chat className="single-post-chat" data={postData} />
                  <Action className="single-post-action" data={postData} updatePost = {setPostData}/>
                </div>
            </Container>
        </Background>
      );
    }
    
export default SinglePost;