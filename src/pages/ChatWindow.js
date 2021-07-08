import React, { useState, useEffect, useRef} from 'react';

import socket from '../socket'

let ChatWindow = () => {

    let [input, setInput] = useState('')
    let [roomId, setRoomId] = useState('')
    let ref = useRef()

    useEffect(() => {
        let id = 1
        setRoomId(id)
        socket.emit('join room', id)
        socket.on('chat message', (data) => {
            console.log(data)
            createNewMessage(data)
        })
        socket.emit('rooms')
        socket.on('notification', (data) => {
            console.log(data)
        })  
        return () => {
            socket.emit('leave room', id)
        }
    }, [])

    let onChange = (e) => {
        setInput(e.target.value)
    }

    let sendMessage = (e) => {
        e.preventDefault()
        let message = {
            text: input,
            roomId: roomId
        }
        socket.emit('chat message', message)
        setInput('')
    }

    let createNewMessage = (data) => {
        console.log(data)
        let messages = ref.current
        console.log(messages)
        let item = document.createElement('li')
        item.textContent = `${data.username} - ${data.message}`;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    }

    let checkRooms = () => {
        socket.emit('rooms')
    }

    return (
        <div>
            <button onClick = {() => checkRooms()}>Check rooms in user</button>
            <ul ref = {ref} id="messages">
                
            </ul>
            <form id="form" action="" onSubmit = {(e) => sendMessage(e)}>
                <input value = {input} onChange = {(e) => onChange(e)} id="input" autoComplete="off" /><button>Send</button>
            </form>
        </div>
    );

}

export default ChatWindow