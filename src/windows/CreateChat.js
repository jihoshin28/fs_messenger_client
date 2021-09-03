import React,{useState, useEffect} from 'react'
import { createNewChat, getChat } from '../api'
import socket from '../socket';

const CreateChat = ({users, chats, setChats, setChat, current_user}) => {
    let [chatUserIds, setChatUserIds] = useState([])
    let [selectedUsers, setSelectedUsers] = useState([])
    let [userSearch, setUserSearch] = useState("")

    useEffect(() => {
        console.log(users)
    }, [])
    
    let addUser = (user) => {
        let userAdded = !!chatUserIds.find((id) => user._id === id)
        if(userAdded){
            return 
        } else {
            setChatUserIds([...chatUserIds, user._id])
            setSelectedUsers([...selectedUsers, user])
        }
        
    }

    let createChat = async() => {
        let result = await createNewChat(chatUserIds)
        
        getChat(result.data.newChat._id).then((new_chat) => {
            if(!chats){
                setChats([result.data.new_chat])
                window.localStorage.setItem('chats', JSON.stringify([new_chat]))
            } else {
                window.localStorage.setItem('chats', JSON.stringify([...chats, new_chat]))
                setChats([...chats, new_chat])
            }

        })
        socket.emit('created room', {roomId: result.data.newChat._id})
        current_user.chats = [...current_user.chats, result.data.newChat._id]
        window.localStorage.setItem('current_user', JSON.stringify(current_user))
        setChat(result.data.newChat._id)
        setChatUserIds([])

    }

    let renderUsersList = () => {
        if(!!users){
            if(users.length > 0){
                return users.map((user, key) => {
                    return(
                        <div id = {key} className = "card-body">
                            <h4>{user.first_name} {user.last_name}</h4>
                            <button className = "btn btn-primary" onClick = {() => addUser(user)}>Add User</button>
                        </div>
    
                    ) 
                })
            }
        }
    }

    let removeUser = (user) => {
        console.log(user)
        let newUserIds = chatUserIds.filter((id) => id !== user._id)
        let newUsers = selectedUsers.filter((users) => users._id !== user._id)
        setChatUserIds(newUserIds)
        setSelectedUsers(newUsers)
    }

    let renderSelectedUsers = () => {

        if(selectedUsers.length > 0){
            return selectedUsers.map(user => {
                return(
                    <button onClick = {() => removeUser(user)} className = 'selected-user btn btn-primary'>
                        {user.first_name} <img class = 'selected-user-x' src={process.env.PUBLIC_URL + '/outline_close_black_24dp.png'} />
                    </button>
                )
            })
        }
    }

    let showDropdown = () => {
        if(userSearch === ""){
            return ""
        } else {
            return "show"
        }
    }

    let renderUsers = (input) => {
        if(input.length > 0){
            let searchTerm = `${input[0].toUpperCase()}${input.slice(1, input.length).toLowerCase()}` 
            let matchingResults = users.filter((user) => {
                let name = `${user.first_name} ${user.last_name}`
                let slicedName = name.slice(undefined, input.length)
                return slicedName === searchTerm
            })
            console.log(matchingResults)
    
            return matchingResults.map((user, key) => {
                return(
                    <li id = {key}>
                        <button class="dropdown-item" type="button">
                            <div class = "user-search-result">
                                <h6>
                                    {user.first_name} {user.last_name}
                                </h6>
                                <button class= "btn btn-primary" type = "button">
                                    
                                </button>
                            </div>
                        </button>
                    </li>
                ) 
      
            })

        } else {
            return null
        }
    }

    console.log(chatUserIds, selectedUsers,  'create chat users data')
    
    return (
        <div class = "container">
            <div class = "row">
                <h1>Create a Chat Room</h1>
            </div>
            <div class = "create-chat-div border border-2">
                <div class = "row">
                    <div class="input-group mb-3">
                        <div class = "create-chat-selected card">
                            <div>
                                {renderSelectedUsers()}
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Search Users</span>
                        <div class="dropdown">
                            <input onChange = {(e) => setUserSearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search Users" aria-label="Search"/>
                            <ul class= {`dropdown-menu ${showDropdown()}`} aria-labelledby="dropdownMenu2">
                                {renderUsers(userSearch)}
                            </ul>
                        </div>
                    </div>
                    <div class = "card">
                        {renderUsersList()}
                    </div>
                    <br></br>
                    <div className = 'center-div'>
                        <button onClick = {() => createChat(chatUserIds)} className = 'btn btn-primary btn-center'>
                            Create Chat
                        </button>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default CreateChat;