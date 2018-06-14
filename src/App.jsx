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
      messages: [],
      numberOfUsers: 0
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

        console.log("Simulating incoming message");
        //connecting to websockets
        this.socket = new WebSocket("ws://localhost:3001");
        //on onload, send notification of connection
        this.socket.onopen = event => {
          // this.socket.send("sending connection!");
          console.log("connected");


        };

        this.socket.addEventListener('message', event => {
            console.log(event)
            const data = JSON.parse(event.data);
            console.log(data)
            if (data.type === "incomingMessage" || data.type === "incomingNotification") {
              this.setState({
              messages: [...this.state.messages, data]
            })
            }
            else {
               this.setState({
              numberOfUsers: data
            })
            }

        })
        // console.log(this.state)
    }





  UserName = event => {
    const oldUser = this.state.currentUser.name;
    const nameObj = {
      name: event.target.value
    }
    this.setState({
      currentUser: nameObj
    });

    const newUser = event.target.value;
    if (oldUser!==newUser) {
      const UserNotification = {
        type: "postNotification",
        content: `${oldUser} has changed their name to ${newUser}`
      }
      this.socket.send(JSON.stringify(UserNotification));
    }
  }

  onKeyPress = event => {
   const currentuser = this.state.currentUser.name;
    if (event.key == 'Enter') {
      const newestMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: event.target.value
      };
      this.socket.send(JSON.stringify(newestMessage));
    }

  }


  render() {
  return (
    <div>
    <NavBar numberOfUsers={this.state.numberOfUsers}/>
    <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
    <ChatBar onKeyPress={this.onKeyPress} onChange={this.UserName} currentUser={this.state.currentUser.name} username={this.state.currentUser.name} />
    </div>
    );
  }
}
export default App;
