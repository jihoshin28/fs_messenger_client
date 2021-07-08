import './App.css';
import ChatWindow from './pages/ChatWindow'
import Homepage from './pages/Homepage'
import ChatRooms from './pages/ChatRooms'
import CreateChat from './pages/CreateChat'
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './containers/Navbar'
import {useEffect, useState} from 'react'
import socket from './socket'

// const newConnection = new Connection(io, 'allen', 'http://localhost:3000', '/user1', '/path1')
// let socket = socketConnection


// const newConnection2 = new Connection('allen', 'http://localhost:3000', '/user2', '/path2')
// let socket2 = newConnection2.socket()

function App() {
  
  const[username, setUsername] = useState('')

  useEffect(() => {

    let id = 1
    socket.emit('join room', id)
    
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


  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" >
            <Homepage/>
          </Route>
          <Route exact path="/chat">
            <ChatWindow/>
          </Route>
          <Route exact path ="/chat_rooms">
            <ChatRooms />
          </Route>
          <Route exact path ="/create_chat">
            <CreateChat />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
