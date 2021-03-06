import React, { Component } from 'react';
import '../assets/styles/main.css';
import Messages from './Messages';

import update from 'immutability-helper';
import Textarea from 'react-textarea-autosize';

class ChatContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      input: ''
    };

    // handle change and submission
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.parseInput = this.parseInput.bind(this);

    // text area and scrolling functionality
    this.preventTextArea = this.preventTextArea.bind(this);
    this.updateScroll = this.updateScroll.bind(this);

    // helper functions
    this.isMention = this.isMention.bind(this);
    this.isEmoticon = this.isEmoticon.bind(this);
    this.getTitle = this.getTitle.bind(this);

  }

  componentDidUpdate() {
    this.updateScroll();
  }

  updateScroll() {
    const elem = document.getElementById('messages');
    elem.scrollTop = elem.scrollHeight;
  }

  handleMessageChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({input: value});
  }

  isMention(word) {
    if (word.charAt(0) === "@") {
      return true;
    }

    return false;
  }

  isEmoticon(word) {
    let whiteSpaceReg = /^\S*$/;
    if (word.charAt(0) === "(" && word.charAt(word.length - 1) === ")" && word.length <= 17 && whiteSpaceReg.test(word)) {
      return true;
    }

    return false;
  }

  isLink(word) {
    let urlReg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

    return urlReg.test(word);
  }

  getTitle(url) {
    let headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html'
    });

    return fetch('https://cors-anywhere.herokuapp.com/' + url, {
      method: 'GET',
      headers: headers
    }).then((response) => {
      return response.text();
    }).then((responseHTML) => {
      const html = new DOMParser().parseFromString(responseHTML, 'text/html');
      const title = html.querySelectorAll('title')[0].innerHTML;

      return {
        url: url,
        title: (title) ? title : ''
      };
    }).then((linkObj) => {
      return linkObj;
    })
  }

  preventTextArea(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  handleMessageSubmit(e) {
    if (e.keyCode === 13 && this.state.input !== '') {
      this.parseInput().then((message) => {

        let output = {};
        let links = [];

        message.forEach((content) => {
          if (content.mentions) {
            content.mentions.length > 0 && (output.mentions = content.mentions);
          }

          if (content.emoticons) {
            content.emoticons.length > 0 && (output.emoticons = content.emoticons);
          }

          if(content.url) {
            links.push(content);
          }

        });

        links.length > 0 && (output.links = links);

        // pushing in the new message into state
        const messages = update(this.state.messages, {$push: [output]});

        // setting state
        this.setState({ messages, input: '' });
      });
    }
  }

  parseInput() {
    let mentions = [];
    let emoticons = [];

    let input = this.state.input.split(' ');
    let promises = [];

    input.forEach((word, index, array) => {

      if (this.isMention(word)) {
        mentions.push(word.substr(1));
      }

      if (this.isEmoticon(word)) {
        emoticons.push(word.substring(1, word.length - 1));
      }

      if (this.isLink(word)) {
        promises.push(this.getTitle(word));
      }

    });

    promises.push({mentions: mentions}, {emoticons: emoticons});
    return Promise.all(promises);
  }

  render() {
    return (
      <div className="main-container">
        <div className="side-nav">
          <h2>Chat Exercise</h2>
        </div>
        <div className="chat-container">
          <Messages
            messages={this.state.messages}
          />
          <div className="input-container">
            <Textarea
              ref="input"
              id="input"
              wrap="soft"
              type="submit"
              onChange={this.handleMessageChange}
              onKeyUp={this.handleMessageSubmit}
              onKeyDown={this.preventTextArea}
              value={this.state.input}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatContainer;
