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
                    
                </div>
            </div>
        );
    }
}

export default Homepage;