import React, {Component} from 'react';

class Message extends Component {
  render () {
    return (
      <div>{this.props.message.text}</div>
    );
  }
}

export default Message;
