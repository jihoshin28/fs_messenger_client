import express from './express'

// on authentication get user's email
export const getUserByEmail = async(email) => {
    const result = await express.get(`/users/${email}`)
    return result
}

// when app loads get all of users chat data
export const getUserChatMessages = async(chat_id) => {
    const result = await express.get(`/chats/${chat_id}`)
    return result.data.chat[0]
}

// create a new chat
export const createNewChat = async(data) => {
    const result = await express.post(`/chats`, data)
    return result
}

// create a new message
export const createNewMessage = async(data) => {
    const result = await express.post(`/messages`, data)
    return result
}
//
