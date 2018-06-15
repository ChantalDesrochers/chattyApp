import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
<footer className="chatbar">
  <input onBlur={this.props.updateUserName} className="chatbar-username" placeholder="Your Name Here" defaultValue="Anonymous" />
  <input onKeyPress={this.props.updateMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
</footer>
    );
  }
}


export default ChatBar;

