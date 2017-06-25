import React from 'react';
import '../assets/styles/main.css';

const Messages = ({messages}) => (
  <div className="output-messages-wrapper">
    <div id="messages" className="output-content">
      {
        messages.map((message, i) => (
          <div
            key={i}
            style={{whiteSpace: 'pre'}}
          >
            {JSON.stringify(message, undefined, 4)}
          </div>
        ))
      }
    </div>
  </div>
);

export default Messages;
