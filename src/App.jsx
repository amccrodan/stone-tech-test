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

    this.baseURL = 'https://andrew-mccrodan-test.herokuapp.com/messages/';
    this.getMessages = this.getMessages.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  getMessages(url) {
    fetch(url)
    .then((response) => {
      return response.json();
    }).then((data) => {
      let newMessages = [];
      if (url !== this.baseURL) {
        newMessages = this.state.messages.concat(data.results);
      } else {
        newMessages = data.results;
      }
      this.setState({messages: newMessages}, () => {
        if (data.next) {
          this.getMessages(data.next);
        }
      })
    }).catch((error) => {
      console.log(`Error in getMessages: ${error}`);
    });
  }

  postMessage(formData) {
    const myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');

    fetch(this.baseURL, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(formData)
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      this.getMessages(this.baseURL);
    }).catch((error) => {
      console.log(`Error in postMessage: ${error}`);
    });
  }

  deleteMessage(id) {
    fetch(`${this.baseURL}${id}/`, {
      method: 'DELETE'
    }).then(() => {
      this.getMessages(this.baseURL);
    }).catch((error) => {
      console.log(`Error in deleteMessage: ${error}`);
    });
  }

  toggleModal(id) {
    const newState = (this.state.showModal === '') ? 'is-active' : '';
    this.setState({showModal: newState, modalId: id});
  }

  componentDidMount() {
    this.getMessages(this.baseURL);
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
