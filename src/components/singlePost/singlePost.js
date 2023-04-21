import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import Chat from '../chat/chat.js';
import Container from '../container/container.js';
import Content from '../postContent/postContent.js';
import Header from '../postHeader/postHeader.js';
import Action from '../postAction/postAction.js';
import { getPostById } from '../../services/postService.js';
import './SinglePost.css'

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
        <div className="single-post-background">
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
                  <Link to={`/community/${postData.community.id}`}>
                    <Header className="single-post-header" data={postData}/>
                  </Link>
                  <div className="single-post-chat">
                    { postData.chat?.id?<Chat id={postData.chat.id} hidden_action_bar={true}/>:<div>null</div>}
                  </div>
                  
                  <Action className="single-post-action" data={postData} updatePost = {setPostData}/>
                </div>
            </Container>
        </div>
      );
    }
    
export default SinglePost;