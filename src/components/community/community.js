import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
import List from '../postList/postList';
import image from '../../img/no_image.png';
import menuIcon from '../../img/menu.png';
import { getCommunityPosts } from '../../services/postService';
import { getCommunityById } from '../../services/communityService';
import './community.css'

function Community() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [community, setCommunity] = useState();
  const url ='http://localhost:3020/api/image/';
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event)=>{
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  const handleClose = ()=>{
    setAnchorEl(null);
    setOpen(false);
  }

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
          <div className="community-menu">
            <img src={ community.image? url + community.image: image} alt="test" />
            <div className="community-menu-content">
              <h3>{community.name}</h3>
            </div>
            <input className='community-menu-button' type="image" src={menuIcon} alt="Кнопка «menu»" onClick={handleClick}/>
            <Menu className='menu' open={open} onClose={handleClose} anchorEl={anchorEl}>
              <MenuItem component={Link} to={`/post/create/${community.id}`} onClick={handleClose}>Create post</MenuItem>
            </Menu>
          </div>
          <div className='community-content'>
            <List list={posts} getPosts={getPostsRange} total={posts.total} className='home-list'/>
          </div>
        </div>
      );
    }
    
    export default Community;