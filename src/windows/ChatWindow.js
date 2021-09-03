import React, { useState, useEffect, useRef } from 'react';
import { getChat } from '../api'
import socket from '../socket'

const ChatWindow = ({chat_id, current_user}) => {

    let [input, setInput] = useState('')
    let [messages, setMessages] = useState([])
    let ref = useRef()

    
    useEffect(() => {
        socket.on('chat message', (data) => {
            console.log(messages)
            // if(chat_id === data.roomId){
            //     console.log(chat_id)
            let newMessages = [...messages, data]
            setMessages(newMessages)
            console.log(messages)
            // }
        })
    })

    useEffect(() => {
        loadMessages(chat_id)
        console.log(messages, 'chat id changed')
        
    }, [chat_id])

    // function to get the messages in a chat room everytime the user joins
    let loadMessages = async(chat_id) =>{
        let current_chat = await getChat(chat_id)
        // if(ref.current !== null){
        //     if(ref.current.children.length > 0){
        //         while(ref.current.children.length > 0){
        //             ref.current.removeChild(ref.current.children[0])
        //         }
        //     }
        // }
        if(current_chat !== undefined){
            if(Object.keys(current_chat).length > 0){
                let newMessages = current_chat.messages
                setMessages(newMessages)
                // current_chat.messages.forEach((message) => {
                //     createNewMessage({
                //         text: message.text,
                //         username: message.username, 
                //         user_id: message.user_id,
                //         day: message.day,
                //         time: message.time
                        
                //     })
                // })
    
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
    }

    let renderMessages = (messages) => {
        if(!!current_user){
            return messages.map((message) => {
                let user = message.user_id === current_user._id? 'current-user': 'other-user'
                let hours = message.time[0].toString().length === 1 ? `0${message.time[0]}`: `${message.time[0]}`
                let minutes = message.time[1].toString().length === 1 ? `0${message.time[1]}`: `${message.time[1]}`
                return (
                    <div className = {`message ${user}`}>
                        <div>{message.username}: {message.text}</div>
                        <div>{hours}:{minutes}</div>
                    </div>
                )
                
            })
        }
    }

    // let createNewMessage = (data) => {
    //     if(ref.current !== null){
    //         let messages = ref.current
    //         let item = document.createElement('div')
    //         let text = document.createElement('div')
    //         let time = document.createElement('div')
    //         item.classList.add('message')
    //         // check if it is current user to determine css
    //         if(data.user_id === current_user._id){
    //             item.classList.add('current-user')
    //         } else {
    //             item.classList.add('other-user')
    //         }
    //         let hours = data.time[0].toString().length === 1 ? `0${data.time[0]}`: `${data.time[0]}`
    //         let minutes = data.time[1].toString().length === 1 ? `0${data.time[1]}`: `${data.time[1]}`
    //         text.textContent = `${data.username} : ${data.text}`;
    //         time.textContent = `${hours}:${minutes}`
    //         item.appendChild(text)
    //         item.appendChild(time)
    //         messages.appendChild(item);
    //         window.scrollTo(0, ref.current.scrollHeight);
    //     }
    // }
        return (
            <div class = "chat-section">
                <div ref = {ref} class = "chat-box">
                    {renderMessages(messages)}
                </div>
                
                <form id="form" action="" onSubmit = {(e) => sendMessage(e)}>
                    <input value = {input} onChange = {(e) => onChange(e)} id="input" autoComplete="off" /><button>Send</button>
                </form>
            </div>
        )
}

export default ChatWindow;