import React, { useState, useRef } from 'react';
import MenuBlock from '../menu_block/menu_block';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
import { searchCommunity, getCommunitys } from '../../services/communityService';
import { searchChat, getChats } from '../../services/chatService';
import { searchUser, getAllUsers } from '../../services/userService';
import searchImage from "../../img/search.png";
import "./searchBar.css"

function SearchBar(){
    const [searchName, setSearchName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const searchRef = useRef();

    const handleClick = async (event)=>{
        let resultsCommunity, resultsChat, resultsUser;
        if(searchName){
            resultsCommunity = await searchCommunity({name: searchName});
            resultsChat = await searchChat({name: searchName});
            resultsUser = await searchUser({name: searchName});
        }else{
            resultsCommunity = await getCommunitys();
            resultsChat = await getChats();
            resultsUser = await getAllUsers();
        }
        resultsCommunity.map(result=>result.type="community")
        setSearchResults(resultsCommunity);
        resultsChat.map(result=>result.type="chat")
        setSearchResults(arr=>[...arr, ...resultsChat]);
        resultsUser.map(result=>result.type="user");
        setSearchResults(arr=>[...arr, ...resultsUser]);

        setAnchorEl(searchRef.current);
        setOpen(true);
        
    }

    const handleClose = ()=>{
        setAnchorEl(null);
        setOpen(false);
    }

    const handleInput = (event)=>{
        setSearchName(event.target.value);
    }

    const choose = (data)=>{
        setSearchName(data.name || data.email);
    }

    return (
        <div className="search-area">
            <div className="search-input" ref={searchRef}>
                <input className="search-message" placeholder='Search' onInput={handleInput} value={searchName}/>
                <input className='search-button' type="image" src={searchImage} alt="Кнопка «menu»" onClick={handleClick}/>
            </div>
            <Menu className='search-result' open={open} onClose={handleClose} onClick={handleClose} anchorEl={anchorEl}>
                {searchResults.length?searchResults.map((result)=>
                <MenuItem component={Link} to={`/${result.type}/${result.id}`} key={result.id+result.type} onClick={()=>choose(result)} >
                    <MenuBlock className="search-item" name={result.name || result.email} image={result.image} message={result.type}/>
                </MenuItem>): <MenuItem>No Search Results</MenuItem>}
            </Menu>
        </div>
    )
}

export default SearchBar;
