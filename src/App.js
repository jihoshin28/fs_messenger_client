import './App.css';
import Chat from './windows/Chat'
import {
  BrowserRouter as Router
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar/> */}
        <Chat/>
      </Router>
    </div>
  );
}

export default App;
