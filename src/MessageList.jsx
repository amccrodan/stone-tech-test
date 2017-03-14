import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    const messages = this.props.messages;
    const messageArray = messages.map((message) => {
      return (
        <Message
          key={message.id}
          message={message}
          toggleModal={this.props.toggleModal}
          deleteMessage={this.props.deleteMessage}
        />
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
