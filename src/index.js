import React from 'react';
import ReactDOM from 'react-dom';
import ChatContainer from './ChatContainer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<ChatContainer />, document.getElementById('root'));
registerServiceWorker();
