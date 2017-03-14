import React, {Component} from 'react'

class MessageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {}
    }

    this.getMessage = this.getMessage.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getMessage(id) {
    fetch(`https://andrew-mccrodan-test.herokuapp.com/messages/${id}`)
    .then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({message: data}, () => {
        console.log(this.state.message);
      })
    }).catch((error) => {
      console.log(`Error in getMessage: ${error}`);
    });
  }

  closeModal() {
    this.props.toggleModal(0);
  }

  componentDidMount() {
    if(this.props.id !== 0) {
      this.getMessage(this.props.id);
    }
  }

  render () {
    return (
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Message Details</p>
          <button className="delete" onClick={this.closeModal}></button>
        </header>
        <section className="modal-card-body">
          <strong>Message ID: </strong>{this.state.message.id}<br/>
          <strong>In reply to: </strong>{this.state.message.in_reply_to || 'none'}<br/>
          <strong>Text: </strong>{this.state.message.text}<br/>
          <strong>Author: </strong>{this.state.message.author}<br/>
          <strong>Created at: </strong>{this.state.message.created_at}<br/>
          <strong>Updated at: </strong>{this.state.message.updated_at}<br/>
          <strong>UTC offset: </strong>{this.state.message.utc_offset}<br/>
        </section>
        <footer className="modal-card-foot">
        </footer>
      </div>
    );
  }
}

export default MessageDetail;
