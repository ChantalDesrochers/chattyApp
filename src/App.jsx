import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {name: "Bob"},
      messages: [
      {
      username: "Bob",
      content: "Has anyone seen my marbles",

      },
      {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",

    }
      ]
    };
  }
  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
//connecting to websockets
      this.socket = new WebSocket("ws://localhost:3001");
//on onload, send notification of connection
      this.socket.onopen = event => {
        // this.socket.send("sending connection!");
        console.log("connected");
      };

this.socket.addEventListener('message', event => {
      let message = JSON.parse(event.data)
    });

// listen for messages
//   const onKeyPress = event => {
//     if (event.key == 'Enter') {
//       const newestMessage = {
//         username: "Bob",
//         content: event.target.value
//       };
//       this.socket.send(JSON.stringify(newestMessage));
//       console.log(newestMessage);
//       const messages = this.state.messages.concat(newestMessage);
//       this.setState({
//         messages: messages
//       });

//     }
// }
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})}, 3000);
}


  onKeyPress = event => {
    if (event.key == 'Enter') {
      const newestMessage = {
        username: "Bob",
        content: event.target.value
      };
      console.log(newestMessage);
      this.socket.send(JSON.stringify(newestMessage));

      const messages = this.state.messages.concat(newestMessage);
      this.setState({
        messages: messages
      });

    }
}



 //    this.socket.send("test");
 //    const newestMessage = {username:"Bob", content:event.target.value};
 //    const messages = this.state.messages.concat(newestMessage);
 //    this.setState({messages:messages});
 //    event.target.value = "";
 //  }
 // }



  render() {
  return (
    <div>
    <NavBar />
    <MessageList messages={this.state.messages}/>
    <ChatBar onKeyPress={this.onKeyPress} currentUser={this.state.currentUser.name} />
    </div>
    );
  }
}
export default App;
