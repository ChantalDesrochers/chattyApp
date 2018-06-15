import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {name: "Anonymous"},
      messages: [],
      numberOfUsers: 0
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = event => {
      console.log("connected");
    };
    this.socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      if (data.type === "incomingMessage" || data.type === "incomingNotification") {
        this.setState({
          messages: [...this.state.messages, data]
        })
      } else {
        this.setState({
          numberOfUsers: data
        })
      }
    })
  }

  updateUserName = event => {
    const oldUser = this.state.currentUser.name;
    const nameObj = {
      name: event.target.value
    }
    this.setState({
      currentUser: nameObj
    });
    const newUser = event.target.value;
    if (oldUser !== newUser) {
      const UserNotification = {
        type: "postNotification",
        content: `${oldUser} has changed their name to ${newUser}`
      }
      this.socket.send(JSON.stringify(UserNotification));
    }
  }

  updateMessage = event => {
    const currentuser = this.state.currentUser.name;
    if (event.key == 'Enter') {
      const newestMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: event.target.value
      };
      this.socket.send(JSON.stringify(newestMessage));
      event.target.value = "";
    }
  }

  render() {
  return (
    <div>
    <NavBar numberOfUsers={this.state.numberOfUsers}/>
    <MessageList messages={this.state.messages}/>
    <ChatBar updateMessage={this.updateMessage} updateUserName={this.updateUserName}/>
    </div>
    );
  }
}
export default App;
