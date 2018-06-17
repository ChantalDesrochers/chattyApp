import React, {Component} from 'react';

class Notification extends Component {
  render() {
    return (
<div>
  <p><i>{this.props.content}</i></p>
</div>
    );
  }
}

export default Notification;