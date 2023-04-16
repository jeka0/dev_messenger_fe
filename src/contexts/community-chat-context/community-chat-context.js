import React, { createContext, useState, useEffect } from "react";
import { getCommunitys } from "../../services/communityService";
import { getChats } from "../../services/chatService"; 

export const CommunityChatContext = createContext({});

export const CommunityChat = ({ children })=>{
    const [communitys, setCommunitys] = useState([]);
    const [chats, setChats] = useState([]);
    

    useEffect(()=> {
        init();
    }, [])

    const init = async ()=>{
        updateCommunitys();
        updateChats();
    }

    const updateCommunitys = async ()=>{
        setCommunitys(await getCommunitys());
    }

    const updateChats = async ()=>{
        setChats(await getChats());
    }


    return (
        <CommunityChatContext.Provider value={ {communitys, setCommunitys, updateCommunitys, chats, setChats, updateChats} }>
            {children}
        </CommunityChatContext.Provider>
    )
}
