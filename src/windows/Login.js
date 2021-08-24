import {useState} from 'react';

const Login = () => {

    return (
        <div className = "login-page">
            <div className = "container border rounded login-box">
                <h2 className = "login-header">Login</h2>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>  
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <button className = "btn btn-primary">Login</button>
            </div>
        </div> 
    );
};

export default Login;