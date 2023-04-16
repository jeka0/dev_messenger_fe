import React, { createContext, useState, useEffect } from "react";
import { getCommunitys } from "../../services/communityService";

export const CommunityChatContext = createContext({});

export const CommunityChat = ({ children })=>{
    const [communitys, setCommunitys] = useState([]);
    

    useEffect(()=> {
        init();
    }, [])

    const init = async ()=>{
        update();

    }

    const update = async ()=>{
        setCommunitys(await getCommunitys());
    }


    return (
        <CommunityChatContext.Provider value={ {communitys, setCommunitys, update} }>
            {children}
        </CommunityChatContext.Provider>
    )
}
