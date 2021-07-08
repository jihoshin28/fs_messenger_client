import React, { Component } from 'react';
import ChatWindow from './ChatWindow'

class Homepage extends Component {
    
    createChatRoom = () => {
        this.props.history.push('/chat')
    }
    render() {
        return (
            <div class = "container">
                <div class = "row">
                    <div class = "chat-box col-9">
                        <ChatWindow/>
                    </div> 
                </div>
            </div>
        );
    }
}

export default Homepage;