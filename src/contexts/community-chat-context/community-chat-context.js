import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../../auth/useAuth";
import { getUserCommunitys } from "../../services/communityService";
import { getUserChats } from "../../services/chatService"; 

export const CommunityChatContext = createContext({});

export const CommunityChat = ({ children })=>{
    const { user } = useAuth();
    const [communitys, setCommunitys] = useState([]);
    const [chats, setChats] = useState([]);
    

    useEffect(()=> {
        if(user?.id)init();
    }, [user])

    const init = async ()=>{
        updateCommunitys();
        updateChats();
    }

    const updateCommunitys = async ()=>{
        setCommunitys(await getUserCommunitys(user.id));
    }

    const updateChats = async ()=>{
        setChats(await getUserChats(user.id));
    }


    return (
        <CommunityChatContext.Provider value={ {communitys, setCommunitys, updateCommunitys, chats, setChats, updateChats} }>
            {children}
        </CommunityChatContext.Provider>
    )
}
