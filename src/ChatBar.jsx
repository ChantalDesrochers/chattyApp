import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
<footer className="chatbar">
  <input className="chatbar-username" placeholder="Your Name Here" defaultValue={this.props.currentUser} />
  <input onKeyPress={this.props.onKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
</footer>
    );
  }
}


export default ChatBar;

