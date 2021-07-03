
import {randomUserName} from '../api'

// this is the socket manager variable for creating emit events and listeners on client side 
const socketConnection = (io, key, username) => {
    return io('http://localhost:3000', {
        query: {
            key: key,
            username: username
        }
    })
    
}

export default socketConnection

