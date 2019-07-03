import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
    

    render() {

        let data = this.props.data
        let messageItem = data.map(message => {
            if (message.type === "incomingMessage") {
                 return  <Message message={message} key={message.id}/>
            } else {
                return <Notification message={message} />
            }
        });

        return (
            <div>
                {messageItem}
            </div>
        );
    }
}

export default MessageList;