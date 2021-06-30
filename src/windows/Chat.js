import React, { useState, useEffect } from 'react';
import {io} from 'socket.io-client'

const socket = io('http://localhost:3000', {
    path: '/chat-server/'
})

let Chat = () => {

    let[input, setInput] = useState('')
    
    useEffect(() => {
        console.log('hi')
        socket.on('api connect', (data) => {
            console.log(data)
        })
        
        socket.on('chat message', (data) => {
            console.log(data, 'returned chat message response')
        })
    }, [])

    let onChange = (e) => {
        setInput(e.target.value)
        console.log(input, socket)
    }

    let sendMessage = (e) => {
        e.preventDefault()
        socket.emit('chat message', input)
        setInput('')
    }

    return (
        <div>
            <ul id="messages"></ul>
            <form id="form" action="" onSubmit = {(e) => sendMessage(e)}>
                <input value = {input} onChange = {(e) => onChange(e)} id="input" autoComplete="off" /><button>Send</button>
            </form>
        </div>
    );

}

export default Chat 