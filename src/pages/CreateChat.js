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
        <div>
            <h1>Create a Chat Room</h1>
            
        </div>
    );
};

export default CreateChat;