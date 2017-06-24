import React from 'react';
import ReactDOM from 'react-dom';
import ChatContainer from '../components/ChatContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
