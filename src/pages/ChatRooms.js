import React, {useEffect, useState} from 'react'
import socket from '../socket'

const ChatRooms = () => {
    useEffect(() => {
        console.log('entered chat rooms')
    }, [])
    return (
        <div>
            <h1>
                Chat Rooms
            </h1>

        </div>
    );
};

export default ChatRooms;