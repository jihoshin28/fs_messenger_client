import React from 'react';
import socket from '../socket';
import {leaveRoom} from '../api'

const Navbar = ({logOut, current_user, chat_id, chats}) => {
    
    let exitRoom = (chat_id, user_id) => {
        // api call to handle chat and user changes
        leaveRoom(chat_id, user_id)
        // socket event to handle leaving room
        socket.emit('leave room', chat_id)
    }

    let renderLogButton = () => {
        if(!current_user){
            return
        } else {
            return <button onClick = {() => logOut()}className = 'btn btn-primary'>
                Logout <img className = "logout-icon" src = {process.env.PUBLIC_URL + '/outline_logout_black_24dp.png'}></img> 
            </button>
        }
    }
    
    let renderBanner = () => {
        console.log(chats)
        let result
        if(!!chat_id && chats !== null){
            if(chats.length > 0){
                
                let chat = chats.find((chat) => chat_id === chat._id)
                if(!!chat){
                    let users = chat.users.filter((user) => user._id !== current_user._id)
                    
                    if(users.length <= 1){
                        result = <h4>{users[0].first_name}</h4>
                    } else {
                        let text = ""
                        for(let i = 0; i < users.length; i++){
                            console.log(users[i].first_name)
                            if(i < users.length - 1){
                                text += `${users[i].first_name}, ` 
                            } else {
                                text += `${users[i].first_name}` 
                            }
                        }
                        result = <h4>{text}</h4>
                    }
                }
            }
        } else {
            result = null
        }
        return result

    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className = "menu-icon" src = {process.env.PUBLIC_URL + '/outline_list_black_24dp.png'}></img> 
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a onClick = {() => exitRoom(chat_id, current_user._id)}class="dropdown-item" href="#">Leave Room</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </div>
                    <div className = "navbar-nav me-auto mb-2 mb-lg-0">
                        <div>{renderBanner()}</div>
                    </div>
                    <form class="d-flex">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li>
                                {renderLogButton()}
                            </li>
                        </ul>
                    </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar