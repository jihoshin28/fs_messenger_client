import {useState} from 'react';
import { Link } from 'react-router-dom'

const Login = ({login, error}) => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const onChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if (e.target.name === 'password'){
            setPassword(e.target.value)
        }   
    }

    return (
        <div className = "login-page">
            <h2 className = "login-header">FS Messenger</h2>
            <div className = "container border rounded login-box">
                {!!error ? <h4>{error}</h4>: null}
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                    <input onChange = {(e) => onChange(e)} name = "email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>  
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                    <input onChange = {(e) => onChange(e)} type = "password" name = "password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <button onClick = {() => login(email, password)}className = "btn btn-primary">Login</button>
                <br></br>
                <br></br>
                <br></br>
                <h5>New to FS Messenger?</h5>
          
                <Link class="btn btn-primary" to = "/sign_up">
                    Sign Up
                </Link>
            </div>
        </div> 
    );
};

export default Login;