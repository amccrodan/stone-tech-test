import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
          <div className='box'>
            <article className='media'>
              <div className='media-content'>
                <div className='content'>
                  {this.props.message.created_at}
                  <br/>
                  {this.props.message.text}
                </div>
              </div>
              <div className='media-right'>
                <div className='button is-danger'>
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </div>
              </div>
            </article>
          </div>
    );
  }
}

export default Message;
