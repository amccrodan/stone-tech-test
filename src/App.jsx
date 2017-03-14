import React, {Component} from 'react';
import NewMessage from './NewMessage.jsx';
import MessageList from './MessageList.jsx';
import MessageDetail from './MessageDetail.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: '',
      modalId: 0,
      messages: []
    };

    this.getMessages = this.getMessages.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  getMessages() {
    fetch('https://andrew-mccrodan-test.herokuapp.com/messages')
    .then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({messages: data.results}, () => {
        console.log(this.state.messages);
      })
    }).catch((error) => {
      console.log(`Error in getMessages: ${error}`);
    });
  }

  postMessage(formData) {
    const postOptions = {
      method: 'POST',
      body: JSON.stringify(formData)
    }

    fetch('https://andrew-mccrodan-test.herokuapp.com/messages', postOptions)
    .then((response) => {
      console.log(response);
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(`Error in postMessage: ${error}`);
    });
  }

  deleteMessage(id) {
    console.log('Delete');
    const deleteOptions = {
      method: 'DELETE'
    }

    // fetch(`https://andrew-mccrodan-test.herokuapp.com/messages/${id}`, deleteOptions)
    // .then((response) => {
    //   console.log(response);
    // }).then((data) => {
    //   console.log(data);
    // }).catch((error) => {
    //   console.log(`Error in deleteMessage: ${error}`);
    // });
  }

  toggleModal(id) {
    const newState = (this.state.showModal === '') ? 'is-active' : '';
    this.setState({showModal: newState, modalId: id}, () => {console.log(this.state.modalId);});
  }

  componentDidMount() {
    this.getMessages();
  }

  render() {

    const messageDetail = (this.state.modalId === 0) ? '' : (
      <MessageDetail id={this.state.modalId} toggleModal={this.toggleModal}/>
    )

    return (
      <div>
        <div className='container'>
          <div className='columns'>
            <div className='column'>
              <div className='title is-2'>Messages</div>
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              <NewMessage postMessage={this.postMessage}/>
            </div>
          </div>
          <MessageList
            messages={this.state.messages}
            toggleModal={this.toggleModal}
            deleteMessage={this.deleteMessage}
          />
        </div>
        <div className={`modal ${this.state.showModal}`}>
          <div className='modal-background' onClick={() => {this.toggleModal(0)}}></div>
          {messageDetail}
        </div>
      </div>
    );
  }
}
export default App;
