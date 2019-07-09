import React, {Component} from 'react';

class ChatBar extends Component {

    onEnter = ev => {
        const newMessage = ev.target.value;
        const changedName = ev.target.previousSibling.value.length > 0
        const username = changedName ? 
        ev.target.previousSibling.value 
        : ev.target.previousSibling.placeholder; 
        if (ev.charCode == 13 && ev.target.value.length > 0){
            
            let newMessageObject = {
                type: "incomingMessage",
                content: newMessage,
                username,
                userID: this.props.userID,
                date: Date.now() 
            };
            this.props.addMessage(newMessageObject);
            ev.target.value = '';
        }
    };

    render() {
        return (
            <footer className="chatbar">
                <input 
                className="chatbar-username" 
                ref="username" 
                placeholder={this.props.username} 
                onKeyPress={this.props.onNameChange}/>

                <input 
                className="chatbar-message" 
                name="minput" type="text" 
                placeholder="Type a message and hit ENTER" 
                onKeyPress={this.onEnter}/>
            </footer>
        );
    }
}

export default ChatBar;