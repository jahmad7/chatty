// server.js
const uuidv4 = require('uuid/v4');

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//create store for messages
let chatlog = [
    {
      type: "incomingMessage",
      content: "I won't be impressed with technology until I can download food.",
      username: "Anonymous1",
      message_id: 0
    },
    {
      type: "incomingNotification",
      content: "Anonymous1 changed their name to nomnom",
      message_id: 0
    },
    {
      type: "incomingMessage",
      content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
      username: "Anonymous2",
      message_id: 1
    },
    {
      type: "incomingMessage",
      content: "...",
      username: "nomnom",
      message_id: 2
    },
    {
      type: "incomingMessage",
      content: "I'd love to download a fried egg, but I'm aframessage_id encryption would scramble it",
      username: "Anonymous2",
      message_id: 3
    },
    {
      type: "incomingMessage",
      content: "This isn't funny. You're not funny",
      username: "nomnom",
      message_id: 4
    },
    {
      type: "incomingNotification",
      content: "Anonymous2 changed their name to NotFunny",
      message_id: 1
    },
];


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  //send chat history with new user log added
  ws.send(JSON.stringify(chatlog));
  wss.clients.forEach( (client) => {
    client.send(JSON.stringify({type: 'count', count: wss.clients.size}));
  });

    //recieving and sending messages from  clients 
    ws.on('message', (incoming) => {
        const incomingData = JSON.parse(incoming);
        incomingData.id = uuidv4();

        chatlog.push(incomingData)  //add inbound message to chat log 

        //ONLY SEND last 20 entries in chatlog
        const boardcastData = chatlog.slice(Math.max(chatlog.length - 20, 1))

        //send message to all users BRODCAST
        wss.clients.forEach( (client) => {
            client.send(JSON.stringify(boardcastData)); 
        });

    })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');

    wss.clients.forEach( (client) => {
      client.send(JSON.stringify({type: 'count', count: wss.clients.size}));
    });
  });
});