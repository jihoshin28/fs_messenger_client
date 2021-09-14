import React, {useEffect, useState} from 'react'
import socket from '../socket'

const SidebarChat = ({chat_id, users, messages, focus, onFocus}) => {
    let ref = React.useRef()
    let[recentMessage, setRecentMessage] = useState()
    useEffect(() => {
        console.log(messages, 'sidebar')
        if(!!messages && messages.length > 0){

            let recent_message = messages[messages.length - 1]
            if(!!recent_message){
                setRecentMessage(messages[messages.length - 1].text)
            }
            socket.on('chat message', (data) => {
                if(data.chat_id === chat_id) {
                    setRecentMessage(data.text)
                }
            })
            
        }
    }, [])

    useEffect(() => {
        if(focus === true){
            ref.current.classList.add("sidebar-section-focus")
        } else {
            ref.current.classList.remove("sidebar-section-focus")
        }
    }, [focus])

    let focusChat = () => {
        onFocus(chat_id)
    }

    let renderUsers = (users) => {
        let user = users[0]
        if(!!users){
            if(users.length > 1){
                return (
                    <h5>{user.first_name}, ...</h5>
                )
            } else {
                return (
                    <h5>{user.first_name}</h5>
                )
            }
        }
    }

    let renderRecentMessage = (text) => {
        // console.log(text, "TEXT RENDER")
        let result
        if(text === undefined) {
            result = "No Messages"
        } else if(text.length > 15){
            result = `${text.slice(0, 15)}...`
        } else {
            result = text
        }   
        return result
    }
    return(
        <div ref = {ref} onClick = {focusChat}class = 'sidebar-section'>
            <div class = "sidebar-img-div">
                <img class = "sidebar-img" src = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"/>
            </div>
            <div class = "col-8">
                <div class = "sidebar-content">
                    {renderUsers(users)}
                    <h6>{renderRecentMessage(recentMessage)}</h6>
                </div>
            </div>
            <div class = "read-receipt-div">
                <div class = "read-receipt">
                </div>
            </div>

        </div>
    )
}

export default SidebarChat