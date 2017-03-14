import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  clickMessage(event, id) {
    this.props.toggleModal(id);
  }

  clickDelete(event, id) {
    event.stopPropagation();
    this.props.deleteMessage(id);
  }

  render () {
    return (
          <div className='box'>
            <article className='media'>
              <div className='media-content'>
                <div className='content'>
                  <em>{this.props.message.created_at.substring(0, this.props.message.created_at.indexOf('T'))}</em>
                </div>
                <p className='content'>
                  {this.props.message.text}
                </p>
              </div>
              <div className='media-right'>
                <div className='button is-info' onClick={() => {this.clickMessage(event, this.props.message.id)}}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </div><br/>
                <div className='button is-danger' onClick={() => {this.clickDelete(event, this.props.message.id)}}>
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </div>
              </div>
            </article>
          </div>
    );
  }
}

export default Message;
