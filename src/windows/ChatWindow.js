import React, { useState, useEffect, useRef } from 'react';
import { getChat } from '../api'
import socket from '../socket'

const ChatWindow = ({chat_id, current_user}) => {

    let [input, setInput] = useState('')
    let ref = useRef()

    useEffect(() => {
        socket.on('chat message', (data) => {
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
                    createNewMessage({
                        text: message.text,
                        username: message.username, 
                        user_id: message.user_id,
                        day: message.day,
                        time: message.time
                        
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
        const date = new Date();
        const day = [date.getMonth(), date.getDate(), date.getFullYear()];
        const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
        let message = {
            text: input,
            roomId: chat_id,
            username: current_user.first_name, 
            day,
            time

        }
        console.log(message)
        socket.emit('chat message', message)
        setInput('')
    }

    let createNewMessage = (data) => {
        if(ref.current !== null){
            let messages = ref.current
            let item = document.createElement('div')
            let text = document.createElement('div')
            let time = document.createElement('div')
            item.classList.add('message')
            // check if it is current user to determine css
            if(data.user_id === current_user._id){
                console.log(data.user_id)
                item.classList.add('current-user')
            }
            text.textContent = `${data.username} : ${data.text}`;
            time.textContent = `${data.time[0]}:${data.time[1]}`
            item.appendChild(text)
            item.appendChild(time)
            messages.appendChild(item);
            window.scrollTo(0, ref.current.scrollHeight);
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