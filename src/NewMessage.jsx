import React, {Component} from 'react'

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage() {
    const formData = {text: document.getElementById('new-message-text').value};
    this.props.postMessage(formData);
  }

  render () {
    return (
      <div>
        <label className='label'>Message</label>
        <p className='control'>
          <textarea className='textarea' id='new-message-text' placeholder='New message'></textarea>
        </p>
        <p className="control">
          <button className="button is-primary" onClick={this.submitMessage}>Submit</button>
        </p>
      </div>
    );
  }
}

export default NewMessage;
