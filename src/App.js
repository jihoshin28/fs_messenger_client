import './App.css';
import Login from './windows/Login'
import SignUp from './windows/SignUp'
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
import {getUsers, getChat, apiLogin, apiSignUp} from './api'

const history = createBrowserHistory()

function App() {
  // const location = useLocation()
  const[users, setUsers] = useState([])
  const[current_user, setCurrentUser] = useState()
  const[chats, setChats] = useState([])
  const[chat_id, setChatId] = useState()
  const[loginError, setLoginError] = useState()
  const[signUpError, setSignUpError] = useState()

  useEffect(() => {

    // On log in: 
    let fetchData = async() => {
      let users = await getUsers() 
      window.localStorage.setItem('users', JSON.stringify(users))
      setUsers(users.data)
    }

    fetchData()
    
    // 1) When application starts, grab any local storage state items
    statePersist()

    // 2) get all Users

    // if current user exists, emit login event
  
    //set up socket listeners 
    socket.on('rooms',(data) => {
      console.log(data)
    })
    

    socket.on('connect', () => {
      console.log(socket.id)
    })

    socket.on('api connect', (data) => {
      console.log(data)
    })

    socket.on('notification', (data) => {
      console.log(data)
    })  

    // socket2.on('connect', () => {
    //   console.log(socket2.id)
    // })
    // socket.on('api connect', (data) => {
    //     console.log(data)
    // })  
    
  }, [])

  useEffect(() => {
    // 3) get all the chats with chat_ids in the user chats array, if current user exists
    console.log('current user changed')
    if(!!current_user){
     socket.emit('on login', 
       { 
         user_id: current_user._id, 
         username: current_user.username,
         email: current_user.email, 
         chat_ids: current_user.chats
       }
     )
     
     if(current_user.chats.length > 0){
       let chat_calls = current_user.chats.map((chatId) => {
         return getChat(chatId)
       })
       console.log(chat_calls)
       Promise.all(chat_calls).then((chat_data) => {
         setChats(chat_data)
         window.localStorage.setItem('chats', JSON.stringify(chat_data))
       })
     }
     // once all the promises resolve then set state
   
     // create on login emit with call after getting all api calls 
 
   }
 }, [current_user])

  

  // run this effect everytime current_user updates
  let statePersist = () => {
    setCurrentUser(JSON.parse(window.localStorage.getItem('current_user')))
    setChats(JSON.parse(window.localStorage.getItem('chats')))
    setChatId(JSON.parse(window.localStorage.getItem('chat_id')))
    setUsers(JSON.parse(window.localStorage.getItem('users')))
  }
 

  let setChat = (chat_id) => {
    window.localStorage.setItem('chat_id', JSON.stringify(chat_id))
    setChatId(chat_id)
  }

  let logOut = () => {
    window.localStorage.setItem('current_user', JSON.stringify(null))
    setCurrentUser(null)
    window.localStorage.setItem('chats', JSON.stringify(null))
    setChats(null)
    window.localStorage.setItem('chat_id', JSON.stringify(null))
    setChatId(null)
    window.localStorage.setItem('users', JSON.stringify(null))
    setUsers(null)
  }

  let redirectPaths= () => {
    // if there is no user id then redirect to login
    if(!current_user){
      return <Redirect to = {{pathname: `/login`}}/>
    } else if(!!current_user){
      if(!!chat_id){
        return <Redirect to = {{pathname: `/chat/${chat_id}`}}/>
      } else {
        return <Redirect to = {{pathname: `/create_chat`}}/>
      }
    }
  }

  let login = async(email, password) => {
    // set the current user using this function sent down to the login form
    // use the api to confirm that the password and username match
    let result = await apiLogin(email, password)
    console.log(result)
    if(result.data.success === true){
      setCurrentUser(result.data.user[0])
      window.localStorage.setItem('current_user', JSON.stringify(result.data.user[0]))
    } else {
      setLoginError(result.data.message)
      
    }

  }

  let signUp = async(userInfo) => {
    let result = await apiSignUp(userInfo)
    if(result.data.success === false){
      setSignUpError(result.data.message)
    } else {
      setCurrentUser(result.data)
      window.localStorage.setItem('current_user', JSON.stringify(result.data))
    }
  }

  // console.log(users, chats, current_user, 'initial data')
  return (
    <div className="App">
        <Router history = {history}>
        {redirectPaths()}
        <Sidebar current_user = {current_user} chats = {chats} chat_id = {chat_id} setChat = {setChat}/>
        <div class = 'chat-window'>
          <Navbar logOut = {logOut} current_user = {current_user}/>
          <Switch>
            <Route exact path="/" >
              <ChatWindow/>
            </Route>
            <Route exact path = '/login'>
              <Login error = {loginError} login = {login}/>
            </Route>
            <Route exact path = '/sign_up'>
              <SignUp error = {signUpError} signUp = {signUp}/>
            </Route>
            <Route exact path="/chat/:chat_id"  >
              <ChatWindow chat_id = {chat_id} current_user = {current_user}/>
            </Route>
            <Route exact path ="/create_chat">
              <CreateChat users = {users} chats = {chats} setChat = {setChat} setChats = {setChats} current_user = {current_user}/>
            </Route>
          </Switch>
      </div>
        </Router>
    </div>
  );
}

export default App;
