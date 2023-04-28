import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import { useAuth } from '../../auth/useAuth';
import ActionBar from '../action_bar/action_bar';
import List from '../postList/postList';
import { getCommunityPosts } from '../../services/postService';
import { getCommunityById, joinUserToCommunity, leaveUserTheCommunity, deleteCommunity } from '../../services/communityService';
import { useCommunityChat } from '../../contexts/community-chat-context/useCommunityChat';
import './community.css'

function Community() {
  const { id } = useParams();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [community, setCommunity] = useState();
  const [isJoin, setIsJoin] = useState();
  const { updateCommunitys } = useCommunityChat();
  const navigate = useNavigate();

  useEffect(()=> {
    getCommunityInfo();
    getPostsRange();
  }, [id])

  useEffect(()=>{
    if(community)setIsJoin(community.users.some((u)=>u.id===user.id));
  }, [community])

  const getPostsRange = async ()=>{
    const data = await getCommunityPosts(id);
    setPosts(data);
    
  }

  const getCommunityInfo = async ()=>{
    setCommunity(await getCommunityById(id));
  }

  const joinLeaveUser = async ()=>{
    const community = isJoin?await leaveUserTheCommunity(id):await joinUserToCommunity(id);
    setCommunity(community);
  }

  const deleteC = ()=>{
    deleteCommunity(id).then(()=>{
      updateCommunitys()
      navigate(-1);
    })
  }

  if(!posts || !community || isJoin===undefined) return (<div>Loading</div>)

      return (
        <div className="community-area">
          <ActionBar data={community}>
            <MenuItem component={Link} to={`/post/create/${community.id}`}>Create post</MenuItem>
            <MenuItem onClick={joinLeaveUser}>{isJoin? "Leave the community": "Join to community"}</MenuItem>
            <MenuItem onClick={deleteC}>Delete community</MenuItem>
          </ActionBar>
          
          <div className='community-content'>
            <List list={posts} getPosts={getPostsRange} total={posts.total} className='home-list'/>
          </div>
        </div>
      );
    }
    
    export default Community;
