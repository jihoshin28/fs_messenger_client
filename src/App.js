import './App.css';
import ChatWindow from './windows/ChatWindow'
import CreateChat from './windows/CreateChat'
import Sidebar from './containers/Sidebar'
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './containers/Navbar'
import {useEffect, useState} from 'react'
import socket from './socket'
import {getUsers, getUserByEmail, getChat} from './api'

// const newConnection = new Connection(io, 'allen', 'http://localhost:3000', '/user1', '/path1')
// let socket = socketConnection


// const newConnection2 = new Connection('allen', 'http://localhost:3000', '/user2', '/path2')
// let socket2 = newConnection2.socket()

function App() {
  const[users, setUsers] = useState([])
  const[user, setUser] = useState({})
  const[chats, setChats] = useState([])

  useEffect(async() => {
    let users = await getUsers() 
    setUsers(users.data)
    console.log(users)
    // get specific user based on email address at login
    // let current_user = await getUserByEmail('Edmund.OConnell13@hotmail.com')
    // setUser(current_user.data.user[0])
    let current_user = users.data[0]
    setUser(current_user)
    console.log(current_user)

    let chat_calls = current_user.chats.map((chat_id) => {
      return getChat(chat_id)
    })
    // console.log(chat_calls)
    Promise.all(chat_calls).then((chat_data) => {
      setChats(chat_data)
    })
    // when socket connects join all chats that socket belongs to

    socket.emit('join rooms', 
      { 
        user_id: user.id, 
        username: user.username,
        email: user.email, 
        chat_ids: chats
      }
    )
    
    // setConnection(socket)
    socket.on('rooms',(data) => {
      console.log(data)
    })
    

    socket.on('connect', () => {
      console.log(socket.id)
    })

    socket.on('api connect', (data) => {
      console.log(data)
    })

    // socket2.on('connect', () => {
    //   console.log(socket2.id)
    // })
    // socket.on('api connect', (data) => {
    //     console.log(data)
    // })  
    
  }, [])

  console.log(users, chats, user, 'initial data')
  return (
    <div className="App">
        <Router>
        <Sidebar/>
        <div class = 'chat-window'>
          <Navbar/>
          <Switch>
            <Route exact path="/" >
              <ChatWindow/>
            </Route>
            <Route exact path="/chat" >
              <ChatWindow/>
            </Route>
            <Route exact path ="/create_chat">
              <CreateChat users = {users} chats = {chats} setChats = {setChats}/>
            </Route>
          </Switch>
      </div>
        </Router>
    </div>
  );
}

export default App;
