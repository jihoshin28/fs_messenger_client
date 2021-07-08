import React,{useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

const CreateChat = () => {
    let [roomId, setRoomId] = useState('')
    useEffect(() => {
        let id = uuidv4()
        console.log(id)
        setRoomId(id)
    }, [])
    return (
        <div class = "container">
            <div class = "row">
                <h1>Create a Chat Room</h1>
            </div>
            <div class = "create-chat-div border border-2">
                <div class = "row">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default"></span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Type of Chat</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Add Friends</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>

            
        </div>
    );
};

export default CreateChat;