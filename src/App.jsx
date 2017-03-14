import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  getMessages() {
    fetch('https://andrew-mccrodan-test.herokuapp.com/messages')
    .then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({messages: data.results}, () => {
        console.log(this.state.messages);
      })
    }).catch(() => {
      console.log('Error in getMessages!');
    })
  }

  render() {
    return (
      <div>
        <MessageList />
      </div>
    );
  }

  componentDidMount() {
    this.getMessages();
    console.log("componentDidMount <App />");
  }

}
export default App;
