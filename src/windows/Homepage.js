import React, { Component } from 'react';

class Homepage extends Component {
    createChatRoom = () => {
        this.props.history.push('/chat')
    }
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <div>
                    <button onClick = {() => this.createChatRoom()}>Create new chat</button>
                </div>
            </div>
        );
    }
}

export default Homepage;