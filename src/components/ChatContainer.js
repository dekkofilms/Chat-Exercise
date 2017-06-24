import React, { Component } from 'react';
import '../assets/styles/main.css';

import Messages from './Messages';

class ChatContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      input: '',
      links: [],
      messageCount: 0
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);

    this.isMention = this.isMention.bind(this);
    this.isEmoticon = this.isEmoticon.bind(this);
    this.getTitle = this.getTitle.bind(this);

    this.parseInput = this.parseInput.bind(this);
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
    if (word.charAt(0) === "(" && word.charAt(word.length - 1) === ")") {
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
      'Access-Control-Allow-Origin':'*',
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
      }
    }).then((linkObj) => {
      return linkObj;
    })
  }

  handleMessageSubmit() {
    this.parseInput().then((message) => {

      let output = {};
      let links = [];

      message.forEach((content) => {
        if (content.mentions) {
          (content.mentions.length > 0) ? output.mentions = content.mentions : null;
        }

        if (content.emoticons) {
          (content.emoticons.length > 0) ? output.emoticons = content.emoticons : null;
        }

        if(content.url) {
          links.push(content);
        }

      });

      (links.length > 0) ? output.links = links : null;
      const messages = [...this.state.messages];

      messages.push(output);
      this.setState({ messages });
    });
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
      <div className="App">
        <div className="App-header">
          <h2>Chat Bot</h2>
        </div>
        <input
          type="text"
          onChange={this.handleMessageChange}
          value={this.state.input}
        />
        <button onClick={this.handleMessageSubmit}>
          Enter
        </button>

        <Messages
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default ChatContainer;
