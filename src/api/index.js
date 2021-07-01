export const randomUserName = () => {
    let userNames = ['allen', 'jane', 'umma', 'appa']
    return userNames[Math.floor(Math.random()*4)]
}