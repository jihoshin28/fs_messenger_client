import React, { Component } from 'react';
import ChatWindow from './ChatWindow'

class Homepage extends Component {
    
    createChatRoom = () => {
        this.props.history.push('/chat')
    }
    render() {
        return (
            <div>
                
                    <div class = "chat-box">
                        <ChatWindow/>
                    </div> 
                
            </div>
        );
    }
}

export default Homepage;