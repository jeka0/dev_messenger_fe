import React from 'react';
import { Button } from '@material-ui/core';
import './postList.css'
import Post from '../post/post';

function List(props) {
    return (
      <div className={props.className}>
        <div className='list'>
          {props.list.map((post)=> <Post className='post' key={post.id} data={post} /> )}
        </div>
        <div className='load-posts'>
          { props.total > props.list.length? <Button onClick={props.getPosts}>Load posts</Button> : null }
        </div>
      </div>
    );
  }
  
  export default List;