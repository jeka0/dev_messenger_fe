import React, {useState, useEffect} from 'react';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { deleteLike, addLike } from '../../services/postService';
import { useAuth } from '../../auth/useAuth';
import './postAction.css';

function Action(props) {
    const { user } = useAuth(); 
    const [like, setLike] = useState(false);

    useEffect(()=>{
        const index = props.data.likes.findIndex(likedUser=>likedUser.id===user.id);
        setLike(index > -1);
    }, [])

    const onLike = async ()=>{
        like? props.updatePost(await deleteLike(props.data.id)):props.updatePost(await addLike(props.data.id));
        setLike(!like);
    }

    return (
        <div className={'action ' + props.className}>
            <div className='like'>
                <span>{like? <Favorite style={{ color: 'red', fontSize: 28 }} onClick={onLike} />: <FavoriteBorder style={{ fontSize: 28 }} onClick={onLike} />}</span>
                <span>{props.data.likes.length}</span>
            </div>
        </div>
    );
  }
  
  export default Action;