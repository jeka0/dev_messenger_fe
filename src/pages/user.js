import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Background from '../components/background/background.js';
import Navigation from '../components/navigation/navigation.js';
import UserInfo from '../components/userInfo/userInfo.js';
import List from '../components/postList/postList.js';
import { getUserById } from '../services/userService.js';
import { getUserPosts } from '../services/postService';
import '../styles/user.css'

function User() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [page, setPage] = useState();
  const limit = 5;

  useEffect(()=> {
    init();
  }, [id])

  const init = async ()=>{
    setUser(await getUserById(id));
    const { data, total } = await getUserPosts(id, 1, limit);
    setPosts({ data, total });
    setPage(2);
  }

  const getPostsRange = async ()=>{
    const { data, total } = await getUserPosts(id, page, limit);
    setPage(prevState => (prevState+1))
    setPosts(prevState => ({
      data:[...prevState.data, ...data],
      total
    }));
  }

  if(!user || !posts) return (<div>Loading</div>)

      return (
        <Background className="user-background">
          <Navigation />
          <div className="user-content">
          <UserInfo className="user-info" user = { user }/>
          <hr/>
          <List list={posts.data} getPosts={getPostsRange} total={posts.total} className='user-list'/>
          </div>
        </Background>
      );
    }
    
    export default User;