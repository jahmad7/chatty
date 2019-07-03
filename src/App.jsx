import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import ChatNav from './Chats_nav.jsx';

function NavBar (){
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Speedial</a>
    </nav>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: 'Anon',
      messages: []
    };
  }

  addMessage = (newMessageObj) => {
    //send to server
    this.webSocket.send(JSON.stringify(newMessageObj));
  };

  componentDidMount() {

    console.log("componentDidMount <App />");

    this.webSocket = new WebSocket("ws://localhost:3001/");

    const ws = this.webSocket;
    ws.onopen = () => {
      ws.onmessage =  (event) => {
        console.log("INCOMING DATA: ", event.data);
        const data = JSON.parse(event.data);
        this.setState({ messages: data});
      }
    };
  }

  render() {
    return (
      <div>
        <NavBar/>
        <main className="messages">
          <MessageList data={this.state.messages} />
        </main>
        <ChatBar username={this.state.user} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
