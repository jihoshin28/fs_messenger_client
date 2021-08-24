import express from './express'

// AUTH METHODS

export const apiLogin = async(email, password) => {
    const result = await express.post('/login', {email, password} )
    return result
}

export const apiSignUp = async(userInfo) => {
    const result = await express.post('/signup', userInfo)
    return result
}

// USER METHODS

// get all users
export const getUsers = async() => {
    const result = await express.get('/users')
    return result
}

// getting user by email, used on authentication
export const getUserByEmail = async(email) => {
    const result = await express.get(`/users/${email}`)
    return result
}

// update user
export const updateUser = async(id, data) => {
    const result = await express.patch(`/users/${id}`, data)
    return result
}

// add friends
export const addFriend = async(id, data) => {
    const result = await express.patch(`/users/${id}`, data)
    return result
}

// CHAT METHODS

// when app loads get all of users chat data
export const getChat = async(chat_id) => {
    console.log(chat_id)
    const result = await express.get(`/chats/${chat_id}`)
    if(!!result.data.chat){
        return result.data.chat[0]
    }
}

// create a new chat
export const createNewChat = async(user_ids) => {
    const result = await express.post('/chats', {user_ids})
    console.log(result)
    return result
}

// MESSAGE METHODS

// create a new message
export const createNewMessage = async(data) => {
    const result = await express.post(`/messages`, data)
    return result
}
//
