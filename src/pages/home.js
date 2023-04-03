import React, { useEffect, useState } from 'react';
import Background from '../components/background/background.js';
import Navigation from '../components/navigation/navigation.js';
import List from '../components/postList/postList.js';
import { getPosts } from '../services/postService.js';
import '../styles/Home.css'

function Home() {
  const [posts, setPosts] = useState({ data:[] });
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(()=> {
    getPostsRange();
  }, [])

  const getPostsRange = async ()=>{
    const { data, total } = await getPosts(page, limit);
    setPage(prevState => (prevState+1))
    setPosts(prevState => ({
      data: [...prevState.data, ...data],
      total,
    }));
  }

  if(!posts) return (<div>Loading</div>)

      return (
        <Background className="home-background">
          <Navigation />
          <div className='home-content'>
            <List list={posts.data} getPosts={getPostsRange} total={posts.total} className='home-list'/>
          </div>
        </Background>
      );
    }
    
    export default Home;