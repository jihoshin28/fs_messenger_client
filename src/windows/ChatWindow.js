import React, { useState, useEffect, useRef } from 'react';
import { getChat } from '../api'
import socket from '../socket'

const ChatWindow = ({updateMessages, chat_id, current_user}) => {

    let [input, setInput] = useState('')
    let [messageCount, setMessageCount] = useState(0)
    let ref = useRef()

    useEffect(() => {
        socket.on('chat message', (data) => {
            updateMessages(chat_id, data)
            // addMessage(data)
            // setMessageCount(messageCount + 1)
        })
        
    }, [])

    useEffect(() => {
        let getChatData = async() => {
            let chat_data = await getChat(chat_id)
            if(!!chat_data){
                let messages = chat_data.messages
                setMessageCount(messages.length)
                messages.forEach((message) => {
                    addMessage(message)
                })
            }
        }
        getChatData()

        return () => {
            clearMessages()
        }
    }, [chat_id])

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

    let clearMessages = () => {
        if(!!ref.current){
            ref.current.innerHTML = ""
        }
    }

    let addMessage = (data) => {
        if(!!current_user){
            let user = data.user_id === current_user._id ? 'current-user': 'other-user'
            let messageBox = document.createElement('div')
            let textDiv = document.createElement('div')
            let timeStampDiv = document.createElement('div')
            messageBox.classList.add(user)
            let hours = data.time[0].toString().length === 1 ? `0${data.time[0]}`: `${data.time[0]}`
            let minutes = data.time[1].toString().length === 1 ? `0${data.time[1]}`: `${data.time[1]}`
            textDiv.innerText = `${data.username}: ${data.text}`
            timeStampDiv.innerText = `${hours}:${minutes}`
            messageBox.appendChild(textDiv)
            messageBox.appendChild(timeStampDiv)
            if(!!ref.current){
                ref.current.appendChild(messageBox)
                window.scroll(0, ref.current.scrollHeight)
            }
        }
    }

    let renderChatBox = () => {
        if(messageCount > 0){
            return <div ref = {ref} class = "chat-box">
                
            </div>
        } else {
            return <div>
                <h3>No messages yet!</h3>
            </div>
        }
    }

    return (
        <div class = "chat-section">
            {renderChatBox()}
            <form id="form" action="" onSubmit = {(e) => sendMessage(e)}>
                <input value = {input} onChange = {(e) => onChange(e)} id="input" autoComplete="off" /><button>Send</button>
            </form>
        </div>
    )
}

export default ChatWindow;