import express from './express'


// export const getUser = (id) => {
//     const result = await express.get(`/users/${id}`)
//     console.log(result)
// }

export const getUsers = async() => {
    const result = await express.get('/users')
    console.log(result)
    return result
}