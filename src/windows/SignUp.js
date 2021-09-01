import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const SignUp = ({signUp}) => {
    const [userInfo, setUserInfo] = useState({})

    const onChange = (e) => {
        console.log(e.target.name, e.target.value)
        userInfo[e.target.name] = e.target.value
        setUserInfo(userInfo)
    }

    console.log(userInfo)

    return (
        <div className = "signup-page">
            <Link class="btn btn-primary" to = "/login">
                {`< Login`} 
            </Link>
            <br></br>
            <br></br>
            <h2 className = "login-header">Sign Up</h2>
            <div className = "container border rounded login-box">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">First Name</span>
                    <input onChange = {(e) => onChange(e)} name = "first_name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Last Name</span>
                    <input onChange = {(e) => onChange(e)} name = "last_name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
                    <input onChange = {(e) => onChange(e)} name = "username" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                    <input onChange = {(e) => onChange(e)} name = "email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>  
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                    <input onChange = {(e) => onChange(e)} type = "password" name = "password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Confirm Password</span>
                    <input onChange = {(e) => onChange(e)} type = "password" name = "password_confirm" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <button onClick = {() => signUp(userInfo)} className = "btn btn-primary">Sign Up</button>
                
            </div>
        </div> 
    );

}

export default SignUp;