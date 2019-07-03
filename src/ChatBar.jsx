import React, {Component} from 'react';

class ChatBar extends Component {

    onEnter = ev => {
        console.log(ev.target.value);
        const newMessage = ev.target.value;
        const changedName = ev.target.value.length > 0
        const username = changedName ? ev.target.previousSibling.value : ev.target.previousSibling.placeholder; // TO DO CHANGE TO VALUE 

        if (ev.charCode == 13 && ev.target.value.length > 0){
            
            let newMessageObject = {
            type: "incomingMessage",
            content: newMessage,
            username,
            id: Date.now()
            };
        
            this.props.addMessage(newMessageObject, username);
            ev.target.value = '';
        }
    };

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" name="username" placeholder={this.props.username} />
                <input className="chatbar-message" name="minput" type="text" placeholder="Type a message and hit ENTER" onKeyPress={this.onEnter}/>
            </footer>
        );
    }
}

export default ChatBar;