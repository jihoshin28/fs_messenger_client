import './App.css';
import Chat from './windows/Chat'
import Homepage from './windows/Homepage'
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './containers/Navbar'
import {useEffect} from 'react'
import socket from './socket'

// const newConnection = new Connection(io, 'allen', 'http://localhost:3000', '/user1', '/path1')
// let socket = newConnection.socket()


// const newConnection2 = new Connection('allen', 'http://localhost:3000', '/user2', '/path2')
// let socket2 = newConnection2.socket()

function App() {

  useEffect(() => {

    socket.on('connect', () => {
      console.log(socket.id)
    })

    socket.on('api connect', (data) => {
      console.log(data)
    })

    // // socket2.on('connect', () => {
    // //   console.log(socket2.id)
    // // })
    // socket.on('api connect', (data) => {
    //     console.log(data)
    // })  
    
}, [])


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Homepage/>
          </Route>
          <Route exact path="/chat">
            <Chat/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
