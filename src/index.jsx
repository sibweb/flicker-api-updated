// Bring in React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Bring in semantic css
import 'semantic-ui-css/semantic.css';

// Bring in es6 promise used for fetchJsonp to work in IE browsers
import 'es6-promise/auto';

// Bring in App to main JSX file
import App from './components/app';


// Render back app into element with the id of index.
ReactDOM.render(<App />, document.getElementById('index'));
