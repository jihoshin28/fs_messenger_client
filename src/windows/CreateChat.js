import React,{useState, useEffect} from 'react'
import { createNewChat } from '../api'

const CreateChat = ({users, chats, setChats}) => {
    let [chatUserIds, setChatUserIds] = useState([])
    useEffect(() => {
        console.log(users)
    }, [])
    
    let addUser = (newUserId) => {
        setChatUserIds([...chatUserIds, newUserId])
    }

    let createChat = async() => {
        let result = await createNewChat(chatUserIds)
        setChats([...chats, result.data.newChat])
        setChatUserIds([])
    }

    let renderUsersList = () => {
        if(users.length > 0){
            return users.map(user => {
                return(
                    <div className = "card-body">
                        <h4>{user.first_name} {user.last_name}</h4>
                        <button className = "btn btn-primary" onClick = {() => addUser(user._id)}>Add User</button>
                    </div>

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
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
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