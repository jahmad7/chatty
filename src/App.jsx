import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messages from './sample'

function NavBar (){
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  )
}

function WebSox() {
  const webSocket = new WebSocket("ws://localhost:3001/");
  webSocket.onopen = (event) => {
    webSocket.send("Here's some text that the server is urgently awaiting!"); 
  };

  return webSocket;
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: 'Anonymous1',
      messages
    };
  }

  addMessage = (newMessage, username) => {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    this.setState({ messages: newMessages, user: username });
    
    //send to server 
    this.webSocket.onopen = (event) => {
      exampleSocket.send(newMessage); 
    };
  };

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.webSocket = WebSox();

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 5, username: "Michelle", content: "Hello there!", type: "incomingMessage"};
      const messages = this.state.messages.concat(newMessage)
      console.log("MESSAGES FAM: ", messages);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
