import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import SidebarChat from '../components/SidebarChat'

let nameList = ['Allen Shin', 'Jane Shin', 'Anna Shin', 'Joon Shin', 'Uncle', 'Aunt', 'Michael Peralez', 'Josh Chang', 'Jisung Park', 'Zack Epp', 'David Lee', 'Mark Heyder']

const Sidebar = ({chats}) => {

    let [chat_id, setChatId] = useState('')

    let onFocus = (chat_id) => {
        console.log(chat_id)
        setChatId(chat_id)
    }
    
    let renderSidebarChats = () => {
        console.log(chats)
        return chats.map((chat, index) => {
            if(chat._id === chat_id){
                return <SidebarChat key = {index} chat_id = {chat._id} users = {chat.users} messages = {chat.messages} focus = {true} onFocus = {onFocus}/>
            } else {
                return <SidebarChat key = {index} chat_id = {chat._id} users = {chat.users} messages = {chat.messages} focus = {false} onFocus = {onFocus}/>
            }
        })
    }

    return(
        <div class = "sidebar">
            <nav class="sticky-nav navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="sidebar-nav">
                        <input class="form-control me-2" type="search" placeholder="Search People" aria-label="Search"/>
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