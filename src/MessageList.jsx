import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    

    render() {

        let data = this.props.data
        let messageItem = data.map(message => {
            if (message.type === "incomingMessage") {
                 return  <Message message={message} key={message.id}/>
            }
        });

        return (
            <div>
                {messageItem}
                <div className="message system">
                    //Anonymous1 changed their name to nomnom.
                </div>
            </div>
        );
    }
}

export default MessageList;