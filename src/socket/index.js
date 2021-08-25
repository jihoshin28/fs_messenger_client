import {io} from 'socket.io-client'

// this is the socket manager variable for creating emit events and listeners on client side 

const socket = io('http://localhost:3000', {
    query: {
        key: 1,
        username: 'allen'
    }
})

export default socket

