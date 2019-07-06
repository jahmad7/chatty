import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavigationBar from './NavigationBar.jsx';
const uuidv4 = require('uuid/v4');


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: 'Anon',
      messages: [],
      numberOfUsers: 0,
      userID: null
    };
  }

  addMessage = (newMessageObj) => {
    this.webSocket.send(JSON.stringify(newMessageObj));
  };

  onNameChange = (event) => {
    if (event.charCode == 13 && event.target.value !== this.state.user) {

      let nameChangeNotification = {
        type: "incomingNotification",
        content: `${this.state.user} changed their name to ${event.target.value}`,
        message_id: uuidv4()
      };

      this.state.user =  event.target.value;

      this.webSocket.send(JSON.stringify(nameChangeNotification));
    }
  } 

  componentDidMount() {

    console.log("componentDidMount <App />");

    this.webSocket = new WebSocket("ws://localhost:3001/");
    
    this.webSocket.onopen = () => {
      this.webSocket.onmessage =  (event) => {
        const broadcastedMessage = JSON.parse(event.data);

        if (broadcastedMessage.type == 'count') {
          this.setState({numberOfUsers: broadcastedMessage.count})
        } else {
          console.log("broadcasted message from server:", broadcastedMessage);
          
          this.setState({messages: broadcastedMessage});
        }
      }
    };
  }

  render() {
    return (
      <div>
        <NavigationBar numberofUsrs={this.state.numberOfUsers}/>
        <main className="messages">
          <MessageList messageBoard={this.state.messages} />
        </main>
        <ChatBar username={this.state.user} userID={this.state.userID} addMessage={this.addMessage} onNameChange={this.onNameChange}/>
      </div>
    );
  }
}
export default App;
