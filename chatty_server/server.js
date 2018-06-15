// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


const wss = new SocketServer({
  server
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  let connectedClients = JSON.stringify(wss.clients.size);
  wss.clients.forEach(client => {
    client.send(connectedClients);
  });

  ws.on('message', message => {
    message = JSON.parse(message);
    if (message.type == 'postNotification') {
      message.type = "incomingNotification";
    }
    if (message.type == 'postMessage') {
      message.type = "incomingMessage"
    }
    message.id = uuidv1();
    message = JSON.stringify(message);
    wss.clients.forEach(client => {
      client.send(message);
    })
  })


  ws.on('close', () => {
    console.log('Client disconnected');
    let connectedClients = JSON.stringify(wss.clients.size);
    wss.clients.forEach(client => {
      client.send(connectedClients);
    });
  })
});