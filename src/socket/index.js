
import {getUsers, getHome} from '../api'
import {io} from 'socket.io-client'
import api from '../api'
// this is the socket manager variable for creating emit events and listeners on client side 

let user = getUsers()
// .then((users)=>{
//     console.log(users)
// })
// .catch((error) => {
//     console.log(error)
// })
// console.log(user,'user')

const socket = io('http://localhost:3000', {
    query: {
        key: 1,
        username: 'allen'
    }
})

export default socket

