import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import SidebarChat from '../components/SidebarChat'

const Sidebar = ({chats, chat_id, current_user, setChat}) => {
    let [friendSearch, setFriendSearch] = useState("")
    let ref = useRef()


    let onFocus = (chat_id) => {
        setChat(chat_id)
    }
    
    let renderSidebarChats = () => {
        if(!!chats){
            if(chats.length > 0 && !!current_user){
                return chats.map((chat, index) => {
                    let chat_users = chat.users.filter((user) => user._id !== current_user._id)
                    if(chat._id === chat_id){
                        return <SidebarChat key = {index} chat_id = {chat._id} users = {chat_users} messages = {chat.messages} focus = {true} onFocus = {onFocus}/>
                    } else {
                        return <SidebarChat key = {index} chat_id = {chat._id} users = {chat_users} messages = {chat.messages} focus = {false} onFocus = {onFocus}/>
                    }
                })
            } else {
                return 
            }
        }
    }

    let showDropdown = () => {
        if(friendSearch === ""){
            return ""
        } else {
            return "show"
        }
    }

    let renderFriends = (input) => {
        
        return(
            <React.Fragment>
                <li><button class="dropdown-item" type="button">Action</button></li>
                <li><button class="dropdown-item" type="button">Another action</button></li>
                <li><button class="dropdown-item" type="button">Something else here</button></li>
            </React.Fragment>
        )
    }

    return(
        <div class = "sidebar">
            <nav class="sticky-nav navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="sidebar-nav">
                        <div class="dropdown">
                            <input onChange = {(e) => setFriendSearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search Friends" aria-label="Search"/>
                            <ul class= {`dropdown-menu ${showDropdown()}`} aria-labelledby="dropdownMenu2">
                                {renderFriends(friendSearch)}
                            </ul>
                        </div>
                        <Link class="btn btn-primary" to = "/create_chat">
                            +
                        </Link>
                      
                    </div>
                </div>
            </nav>
            <div class = "sidebar-chat">
                {renderSidebarChats()}

            </div>
        </div>
    )
}

export default Sidebar