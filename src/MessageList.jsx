import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render () {

    const messages = this.props.messages;
    const messageArray = messages.map((message) => {
      return (
        <Message key={message.id} message={message} />
      )
    })

    return (
      <div>
        {messageArray}
      </div>
    );
  }
}

export default MessageList;
