import React, { useState, useEffect, useRef } from 'react';
import { getChat } from '../api'
import socket from '../socket'

const ChatWindow = ({chat_id, current_user}) => {

    let [input, setInput] = useState('')
    let [messages, setMessages] = useState([])
    let ref = useRef()

    
    useEffect(() => {
        socket.on('chat message', (data) => {
            let newMessages = [...messages, data]
            setMessages(newMessages)
        })
    })

    useEffect(() => {
        loadMessages(chat_id)
        console.log(messages, 'chat room switched')
    }, [chat_id])

    // function to get the messages in a chat room everytime the user joins
    let loadMessages = async(chat_id) =>{
        let current_chat = await getChat(chat_id)
        if(current_chat !== undefined){
            if(Object.keys(current_chat).length > 0){
                let newMessages = current_chat.messages
                setMessages(newMessages)
            }
        }
    }

    let onChange = (e) => {
        setInput(e.target.value)
    }

    let sendMessage = (e) => {
        e.preventDefault()
        const date = new Date();
        const day = [date.getMonth(), date.getDate(), date.getFullYear()];
        const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
        let message = {
            user_id: current_user._id,
            text: input,
            roomId: chat_id,
            username: current_user.first_name, 
            day,
            time

        }
        socket.emit('chat message', message)
        setInput('')
        window.scrollTo(0, ref.current.scrollHeight);
    }

    let renderMessages = (messages) => {
        if(!!current_user){
            return messages.map((message) => {
                let user = message.user_id === current_user._id? 'current-user': 'other-user'
                let hours = message.time[0].toString().length === 1 ? `0${message.time[0]}`: `${message.time[0]}`
                let minutes = message.time[1].toString().length === 1 ? `0${message.time[1]}`: `${message.time[1]}`
                return (
                    <div key = {message._id} className = {`message ${user}`}>
                        <div>{message.username}: {message.text}</div>
                        <div>{hours}:{minutes}</div>
                    </div>
                )
                
            })
        }
    }

    return (
        <div class = "chat-section">
            <div ref = {ref} class = "chat-box">

                {messages.length > 0? renderMessages(messages): 
                    <div className = "container">
                        <div className = "chat-intro">
                            <h3>Start chatting!</h3>
                        </div>
                    </div>
                }
            </div>
            
            <form id="form" action="" onSubmit = {(e) => sendMessage(e)}>
                <input value = {input} onChange = {(e) => onChange(e)} id="input" autoComplete="off" /><button>Send</button>
            </form>
        </div>
    )
}

export default ChatWindow;