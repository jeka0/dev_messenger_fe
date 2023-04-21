import React, { useState, useEffect, useRef } from "react";
import { MenuItem } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useSocket } from '../../contexts/socketContext/useSocket';
import { getAllMessagesByChat } from '../../services/messageService';
import { getChatById } from "../../services/chatService";
import ActionBar from "../action_bar/action_bar";
import Modal from "../Modal/modal";
import imgSend from "../../img/send.png";
import imgClose from "../../img/close.png";
import Message from '../message/message';
import "./chat.css";

function Chat(params){
    const { id } = useParams();
    const { sendMessage, socket, updateMessage, deleteMessage, joinToChat, leaveChat } = useSocket();
    const [chat, setChat] = useState();
    const [message, setMessage] = useState({message:""});
    const [messages, setMessages] = useState({ data:[] });
    const [isConfigured, setIsConfigured] = useState(false); 
    const [isModalActive, setIsModalActive] = useState(false); 
    const [isEdit, setIsEdit] = useState(false); 
    const [isBottom, setIsBottom] = useState(false); 
    const [deleteMessageId, setDeleteMessageId] = useState();
    const bottomRef = useRef(null);
    const chatId = params.id || id;

    useEffect(()=>{
        if(chatId){
        joinToChat(chatId);
        getChatById(chatId).then(data=>setChat(data));
        setMessage({message:""});
        getAllMessagesByChat(chatId).then((data)=>{  
            setMessages({ data });
        });

        return ()=>{
            leaveChat(chatId);
        }
    }

    },[chatId]);

    useEffect(()=>{
        if(socket && !isConfigured){
            socket.on("message", update);
            socket.on("delete", deleteHandler);
            socket.on("update", updateHandler);
            setIsConfigured(true);
        }
    },[socket]);
    const update = (mess)=>{
        setMessages(prevState => ({
            data: [mess, ...prevState.data]
          }));
    }

    const deleteHandler = (id)=>{
        setMessages(prevState => {
            prevState.data.forEach((el, i) => {
                if (el.id === id) prevState.data.splice(i, 1)
            })

            return ({data: [...prevState.data]});
        });
    }

    const updateHandler = (updatedMessage)=>{
        setMessages(prevState => {
            prevState.data.forEach((el, i) => {
                if (el.id === updatedMessage.id) prevState.data[i] = updatedMessage;
            })

            return ({data: [...prevState.data]});
        });
    }

    useEffect(() => {
        if(isBottom)bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);


    useEffect(() => {
        if(bottomRef.current){
            const observer = new IntersectionObserver(([entry]) =>setIsBottom(entry.isIntersecting));
  
            observer.observe(bottomRef.current);
        }
    }, [bottomRef]);

    const editMessage = (id, message)=>{
        setIsEdit(true);
        setMessage({id, message});
    }

    const startModal = (id)=>{
        setDeleteMessageId(id);
        setIsModalActive(true);
    }

    const deleteMess = ()=>{
        deleteMessage({id:deleteMessageId, chatId});
        setIsModalActive(false);
    }

    const updateMess = (event)=>{
        setMessage({...message, [event.target.name] : event.target.value})
    }

    const onSend = ()=>{
        if(message.message === ""){
            return false;
        }
        message.chatId = chatId;
        if(isEdit){
            updateMessage(message);
            setIsEdit(false);
        }else{
            sendMessage(message);
            setIsBottom(true);
        }
        setMessage({message:""});
    }
    const renderBar = ()=>{
        if(chat){
            return (
            <div className="actionBar" >
                <ActionBar data={chat}>
                    <MenuItem>Some item</MenuItem>
                </ActionBar>
            </div>)
        } else {
            return (<div>Loading</div>);
        }
    }

    return(
        <div className="chat_content">
            {!params.hidden_action_bar && renderBar()}
            <div className="chatSpace">
                <div ref={bottomRef}/>
                {messages.data.map((mess, i)=><Message key={mess.id} data = {mess} next = {messages.data[i+1]} edit ={editMessage} deleteMessage={startModal}/>)}
            </div >
            <div className="inputPanel">
                <input className="message_text" name = "message" onInput={updateMess} value={message.message}></input>
                <input className="close" type="image" src={imgClose} alt="Кнопка «close»" onClick={()=>{setIsEdit(false);setMessage({message:""});}} hidden={!isEdit}/>
                <button onClick={onSend}><img src={imgSend} /></button>
            </div>
            <Modal active={isModalActive} setActive={setIsModalActive} text="Are you sure you want to delete the message?" 
                confirmationButtonText="Delete" confirmation = {deleteMess} />
        </div>
    );
}

export default Chat;