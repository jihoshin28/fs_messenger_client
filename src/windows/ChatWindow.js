import React, { useState, useEffect, useRef } from 'react';
import { getChat } from '../api'
import socket from '../socket'

const ChatWindow = ({chat_id, current_user}) => {

    let [input, setInput] = useState('')
    let ref = useRef()

    useEffect(() => {
        socket.on('chat message', (data) => {
            console.log(data)
            createNewMessage(data)
        })
        socket.emit('rooms')
    }, [])

    useEffect(() => {
        loadMessages()
    }, [chat_id])

    // function to get the messages in a chat room everytime the user joins
    let loadMessages = async() =>{
        let current_chat = await getChat(chat_id)
        if(ref.current !== null){
            if(ref.current.children.length > 0){
                while(ref.current.children.length > 0){
                    ref.current.removeChild(ref.current.children[0])
                }
            }
        }
        console.log(current_chat, "THERE")
        if(current_chat !== undefined){
            if(Object.keys(current_chat).length > 0){
                current_chat.messages.forEach((message) => {
                    console.log(message)
                    createNewMessage({
                        message: message.text,
                        username: current_user.first_name
                    })
                })
    
            }
        }
    }

    let onChange = (e) => {
        setInput(e.target.value)
    }

    let sendMessage = (e) => {
        e.preventDefault()
        let message = {
            text: input,
            roomId: chat_id,
            username: current_user.first_name
        }
        console.log(message)
        socket.emit('chat message', message)
        setInput('')
    }

    let createNewMessage = (data) => {
        console.log(data)
        if(ref.current !== null){
            let messages = ref.current
            console.log(ref, messages)
            let item = document.createElement('div')
            item.textContent = `${data.username} - ${data.message}`;
            messages.appendChild(item);
            window.scrollTo(0, ref.current.scrollHeight);
            console.log(ref.current.scrollHeight)
        }
    }
        return (
            <div class = "chat-section">
                <div ref = {ref} class = "chat-box">

                </div>
                
                <form id="form" action="" onSubmit = {(e) => sendMessage(e)}>
                    <input value = {input} onChange = {(e) => onChange(e)} id="input" autoComplete="off" /><button>Send</button>
                </form>
            </div>
        )
}

export default ChatWindow;