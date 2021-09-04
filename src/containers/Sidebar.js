import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SidebarChat from '../components/SidebarChat'

const Sidebar = ({users, chats, chat_id, current_user, setChat}) => {
    let [chatSearch, setChatSearch] = useState("")

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


    return(
        <div class = "sidebar">
            <nav class="sticky-nav navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="sidebar-nav">
                        <div class="dropdown" style = {{width: '85%', marginRight:'5%'}}>
                            <input onChange = {(e) => setChatSearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search Friends" aria-label="Search"/>
                        </div>
                        <Link class="btn btn-primary" to = "/create_chat">
                            <img className = "chat-icon" src = {process.env.PUBLIC_URL + '/outline_question_answer_black_24dp.png'}></img> 
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