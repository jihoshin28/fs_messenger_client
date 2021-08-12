import express from './express'


export const getUserByEmail = async(email) => {
    const result = await express.get(`/users/${email}`)
    return result
}

export const getUserChatMessages = async(chat_id) => {
    const result = await express.get(`/chats/${chat_id}`)
    return result.data.chat[0]
}
