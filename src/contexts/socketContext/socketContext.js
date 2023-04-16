import React, { createContext, useState, useEffect } from "react";
import { getSessionFromStorage } from '../../services/requestService';
import { reqRefresh } from '../../services/authService';
import { io } from "socket.io-client";


export const SocketContext = createContext({});

export const Socket = ({ children })=>{
    const [socket, setSocket] = useState();

    useEffect(()=> {
        const { accessToken } = getSessionFromStorage() || {};
        const nowSock = io("http://localhost:3021", {
            auth: {
              token: `Bearer ${accessToken}`
            },
            autoConnect: false
        });
        nowSock.on('connect', ()=>{
            console.log("User connected");
        });

        nowSock.on('error', err=>{
            console.log(err);
        });

        nowSock.on("connect_error", (err) => {
            if(err?.message === 'AccessToken is not valid'){
                reqRefresh().then(({accessToken})=>{
                    nowSock.auth.token = `Bearer ${accessToken}`;
                    nowSock.connect();
                });
            }
        });
        nowSock.connect();

        setSocket(nowSock);
    }, [])


    const sendMessage = (message)=>{
        socket.emit("message",message);
    };

    const updateMessage = (message)=>{
        socket.emit("update", message);
    }

    const deleteMessage = (id)=>{
        socket.emit("delete", id);
    }
     

    return (
        <SocketContext.Provider value={ {sendMessage, updateMessage, deleteMessage, socket} }>
            {children}
        </SocketContext.Provider>
    )
}