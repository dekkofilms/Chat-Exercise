import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ChatContainer from '../components/ChatContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatContainer />, div);
});
