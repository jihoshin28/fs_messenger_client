import React,{useState, useEffect} from 'react'
import { createNewChat, getChat } from '../api'

const CreateChat = ({users, chats, setChats, setChat}) => {
    let [chatUserIds, setChatUserIds] = useState([])
    let [selectedUsers, setSelectedUsers] = useState([])

    useEffect(() => {
        setChat('')
        console.log(users)
    }, [])
    
    let addUser = (user) => {
        let userAdded = !!chatUserIds.find((id) => user._id === id)
        if(userAdded){
            return 
        } else {
            setChatUserIds([...chatUserIds, user._id])
            setSelectedUsers([...selectedUsers, user.first_name])
        }
        
    }

    let createChat = async() => {
        let result = await createNewChat(chatUserIds)
        let new_chat = await getChat(result.data.newChat._id)
        console.log(new_chat)
        setChats([...chats, result.data.newChat])
        setChatUserIds([])
    }

    let renderUsersList = () => {
        if(users.length > 0){
            return users.map(user => {
                return(
                    <div className = "card-body">
                        <h4>{user.first_name} {user.last_name}</h4>
                        <button className = "btn btn-primary" onClick = {() => addUser(user)}>Add User</button>
                    </div>

                ) 
            })
        }
    }

    let renderSelectedUsers = () => {
        console.log(selectedUsers)
        if(selectedUsers.length > 0){
            return selectedUsers.map(first_name => {
                return(
                    <button className = 'selected-user btn btn-primary'>
                        {first_name} <img class = 'selected-user-x' src={process.env.PUBLIC_URL + '/outline_close_black_24dp.png'} />
                    </button>
                )
            })
        }
    }

    console.log(chatUserIds, 'create chat users data')
    
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
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
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