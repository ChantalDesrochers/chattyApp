import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    const message = this.props.messages.map((message, i) => {
      return ( message.type === 'incomingNotification' ? <Notification content={message.content} /> : <Message username={message.username} content={message.content} key={i}/>)
    });

    return (
      <main className="messages">
      {message}
      </main>

      );
  }
}



export default MessageList;