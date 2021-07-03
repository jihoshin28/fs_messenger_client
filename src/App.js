import './App.css';
import Chat from './windows/Chat'
import Homepage from './windows/Homepage'
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './containers/Navbar'
import {useEffect, useState} from 'react'
import socketConnection from './socket'
import { io } from 'socket.io-client'

// const newConnection = new Connection(io, 'allen', 'http://localhost:3000', '/user1', '/path1')
// let socket = socketConnection


// const newConnection2 = new Connection('allen', 'http://localhost:3000', '/user2', '/path2')
// let socket2 = newConnection2.socket()

function App() {
  
  const[username, setUsername] = useState('')
  const [connection, setConnection] = useState({})

  useEffect(() => {

    let socket = io('http://localhost:3000', {
      query: {
          key: 1,
          username: 'allen'
      }
    })

    setConnection(socket)


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
        <Navbar />
        <Switch>
          <Route exact path="/" >
            <Homepage socket = {connection}/>
          </Route>
          <Route exact path="/chat">
            <Chat socket = {connection}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
