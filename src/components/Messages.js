import React from 'react';
import '../assets/styles/main.css';

const Messages = ({messages}) => (
  <div>
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
);

export default Messages;
