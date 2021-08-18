import './App.css';
import ChatWindow from './windows/ChatWindow'
import CreateChat from './windows/CreateChat'
import Sidebar from './containers/Sidebar'
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Navbar from './containers/Navbar'
import {useEffect, useState} from 'react'
import { createBrowserHistory } from 'history'
import socket from './socket'
import {getUsers, getUserByEmail, getChat} from './api'
import { useLocation } from 'react-router-dom'

let history = createBrowserHistory()

function App() {
  const[users, setUsers] = useState([])
  const[current_user, setCurrentUser] = useState({})
  const[chats, setChats] = useState([])
  const[chat_id, setChatId] = useState('')

  useEffect(async() => {

    // On log in: 

    // 1) get all Users
    let users = await getUsers() 
    setUsers(users.data)
    console.log(users)
    // get specific user based on email address at login
    // let current_user = await getUserByEmail('Edmund.OConnell13@hotmail.com')
    // setUser(current_user.data.user[0])
    
    // 2) get the logged in User
    let user = users.data[0]
    setCurrentUser(user)

    // 3) get all the chats with chat_ids in the user chats array
    let chat_calls = user.chats.map((chat_id) => {
      return getChat(chat_id)
    })
    // once all the promises resolve then set state
    Promise.all(chat_calls).then((chat_data) => {
      setChats(chat_data)
    })
  
    // create on login emit with call after getting all api calls 

    socket.emit('on login', 
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

  let setChat = (chat_id) => {
    setChatId(chat_id)
  }

  console.log(users, chats, current_user, 'initial data')
  return (
    <div className="App">
        <Router history = {history}>
        {chat_id !== ''? <Redirect to = {{pathname: `/chat/${chat_id}`}}/> : null}
        <Sidebar current_user = {current_user} chats = {chats} chat_id = {chat_id} setChat = {setChat}/>
        <div class = 'chat-window'>
          <Navbar/>
          <Switch>
            <Route exact path="/" >
              <ChatWindow/>
            </Route>
            <Route exact path="/chat/:chat_id"  >
              <ChatWindow chat_id = {chat_id}/>
            </Route>
            <Route exact path ="/create_chat">
              <CreateChat users = {users} chats = {chats} setChat = {setChat} setChats = {setChats}/>
            </Route>
          </Switch>
      </div>
        </Router>
    </div>
  );
}

export default App;
