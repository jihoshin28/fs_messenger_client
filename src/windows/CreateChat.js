import React,{useState, useEffect} from 'react'
import { createNewChat, getChat } from '../api'
import socket from '../socket';

const CreateChat = ({users, chats, setChats, setChat, current_user}) => {
    let [chatUserIds, setChatUserIds] = useState([])
    let [selectedUsers, setSelectedUsers] = useState([])
    let [userSearch, setUserSearch] = useState("")
    let [userCount, setUserCount] = useState(10)

    useEffect(() => {
        setChat('create')
    }, [])

    useEffect(() => {
        console.log(users, "ON USERS UPDATE")
    }, [users])

    useEffect(() => {
        if(!!current_user){
            setChatUserIds([current_user._id])
        }
    }, [current_user])
    
    let addUser = (user) => {
        let userAdded = !!chatUserIds.find((id) => user._id === id)
        if(userAdded){
            return 
        } else {
            setChatUserIds([...chatUserIds, user._id])
            setSelectedUsers([...selectedUsers, user])
            setUserSearch(' ')
        }
    }

    let createChat = async() => {
        let result = await createNewChat(chatUserIds)

        getChat(result.data.newChat._id).then((new_chat) => {
            if(!chats){
                setChats([new_chat])
                window.localStorage.setItem('chats', JSON.stringify([new_chat]))
            } else {
                window.localStorage.setItem('chats', JSON.stringify([...chats, new_chat]))
                setChats([...chats, new_chat])
            }
            socket.emit('created room', new_chat)
        })
        
        current_user.chats = [...current_user.chats, result.data.newChat._id]
        window.localStorage.setItem('current_user', JSON.stringify(current_user))
        setChat(result.data.newChat._id)
        setChatUserIds([])

    }

    let renderUsersList = () => {
        if(users !== null){
            if(users.length > 0){
                let usersList = users.filter((user) => user._id !== current_user._id)
                let slicedUsersList = usersList.slice(undefined, userCount)
                return slicedUsersList.map((user) => {
                    return(
                        <div key = {user._id} className = "card-body">
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
            return selectedUsers.map((user) => {
                return(
                    <button key = {user._id} onClick = {() => removeUser(user)} className = 'selected-user btn btn-primary'>
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

    let renderUserSearch = (input) => {
        if(input.length > 0){
            let searchTerm = `${input[0].toUpperCase()}${input.slice(1, input.length).toLowerCase()}` 
            let matchingResults = users.filter((user) => {
                let name = `${user.first_name} ${user.last_name}`
                let slicedName = name.slice(undefined, input.length)
                return slicedName === searchTerm
            })
            
            let topResults = matchingResults.filter((user) => user._id !== current_user._id).slice(0, 5)
    
            return topResults.map((user, key) => {
                return(
                    <li id = {key}>
                        <button class="dropdown-item" type="button">
                            <div class = "user-search-result">
                                <h6>
                                    {user.first_name} {user.last_name}
                                </h6>
                                <button onClick = {() => addUser(user)}class= "btn btn-primary" type = "button">
                                    Add User
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
                        <div class="dropdown" style = {{width: '75%'}}>
                            <input onChange = {(e) => setUserSearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search Users" aria-label="Search"/>
                            <ul class= {`dropdown-menu ${showDropdown()}`} aria-labelledby="dropdownMenu2">
                                {renderUserSearch(userSearch)}
                            </ul>
                        </div>
                    </div>
                    <div className = 'center-div create-chat-button'>
                        <button onClick = {() => createChat(chatUserIds)} className = 'btn btn-primary btn-center'>
                            Create Chat
                        </button>
                    </div>
                    <div class = "card">
                        {renderUsersList()}
                        {
                            userCount < users.length? 
                            <div class = "more-users-button"> 
                                <button onClick = {() => setUserCount(userCount + 10)} className = 'btn btn-primary btn-center'>
                                    More Users
                                </button>
                            </div>
                            :
                            null

                        }
                    </div>
                    <br></br>
                </div>
            </div>

            
        </div>
    );
};

export default CreateChat;