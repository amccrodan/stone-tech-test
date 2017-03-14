import React, {Component} from 'react';
import NewMessage from './NewMessage.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.postMessage = this.postMessage.bind(this);
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
    })
  }

  postMessage(formData) {
    console.log(formData);
    // fetch('https://andrew-mccrodan-test.herokuapp.com/messages', {method: 'POST', body: formData})
    // .then((response) => {
    //   return response.json();
    // }).then((data) => {
    //   console.log(data)
    // }).catch((error) => {
    //   console.log(`Error in postMessage: ${error}`);
    // })
  }

  render() {
    return (
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
        <MessageList messages={this.state.messages}/>
      </div>
    );
  }

  componentDidMount() {
    this.getMessages();
    console.log("componentDidMount <App />");
  }

}
export default App;
