import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import ActionBar from '../action_bar/action_bar';
import List from '../postList/postList';
import { getCommunityPosts } from '../../services/postService';
import { getCommunityById } from '../../services/communityService';
import './community.css'

function Community() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [community, setCommunity] = useState();

  useEffect(()=> {
    getCommunityInfo();
    getPostsRange();
  }, [id])

  const getPostsRange = async ()=>{
    const data = await getCommunityPosts(id);
    setPosts(data);
    
  }

  const getCommunityInfo = async ()=>{
    setCommunity(await getCommunityById(id))
  }

  if(!posts || !community) return (<div>Loading</div>)

      return (
        <div className="community-area">
          <ActionBar data={community}>
            <MenuItem component={Link} to={`/post/create/${community.id}`}>Create post</MenuItem>
          </ActionBar>
          
          <div className='community-content'>
            <List list={posts} getPosts={getPostsRange} total={posts.total} className='home-list'/>
          </div>
        </div>
      );
    }
    
    export default Community;
