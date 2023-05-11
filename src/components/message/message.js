import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import imgDelete from "../../img/delete.png";
import imgEdit from "../../img/edit.png";
import './message.css'

function Message(props) {
    const {user} = useAuth();
    const [datetime, setDatetime] = useState(); 
    const [hidden, setHidden] = useState(true); 

    useEffect(()=>{
        setDatetime(new Date(props.data.datetime));
    },[])

    const mouseOver = ()=>{
        if(user.id===props.data.user.id){
            setHidden(false);
        }
    }

    const mouseOut = ()=>{
        if(user.id===props.data.user.id){
            setHidden(true);
        }
    }

    const getDateString = (date)=>{
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    }

    const showDate = () =>{
        if(datetime){
            const nowString = getDateString(datetime);
            const nextDate = props.next? new Date(props.next.datetime):props.next;
            const nextString = nextDate? getDateString(nextDate):"";
            if(nextString !== nowString){
                return(<p className='date'>{nowString}</p>);
            }
        }
    }
    
    return (
        <div>
            {showDate()}
            <div className={`messageStyle ${user.id===props.data.user.id? 'me':'other'}`} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                <div className='messageHead'>
                    <Link to={`/user/${props.data.user.id}`}><p className='login'>{props.data.user.email}</p></Link>
                    <input className="delete" type="image" src={imgDelete} alt="Кнопка «delete»" onClick={()=> props.deleteMessage(props.data.id)} hidden={hidden}/>
                    <input className="edit" type="image" src={imgEdit} alt="Кнопка «edit»" onClick={()=>props.edit(props.data.id, props.data.message)} hidden={hidden}/>
                </div>
                <div className='messageBody'><p className='message'>{props.data.message}</p></div>
                <div className='messageFooter'><p className='time'>{datetime?("0" + datetime.getHours()).slice(-2) + "." + ("0" + datetime.getMinutes()).slice(-2):""}</p></div>
            </div>
        </div>
    );
  }
  
  export default Message;