import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
const uuidv4 = require('uuid/v4');

class MessageList extends Component {
    messageItem(messageBoard) {
        
        let list = messageBoard.map(message => {
            if (message.type === "incomingMessage") {
                 return  <Message message={message} key={message.id}/>
            }
            else {
                console.log("LOOK HERE: ",message)
                return <Notification message={message} key={uuidv4()} />
            }
        });
        return list
    }

    render() {
        let {messageBoard} = this.props;
        let messageItem = this.messageItem(messageBoard)

        return (
            <div>
                {messageItem}
            </div>
        );
    }
}

export default MessageList;